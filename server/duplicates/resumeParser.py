from groq import Groq
import fitz, json, base64
import sounddevice as sd
from pydub import AudioSegment
from PIL import Image
import pytesseract
from io import BytesIO
from openai import OpenAI
import numpy as np
import time
import sys
import os


class Resume:
    def __init__(self, path, GroqApi="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", GPTapi="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"):
        self.co = Groq(api_key=GroqApi)
        self.client = OpenAI(api_key=GPTapi)
        self.path = path
        self.tesseractpath = r"C:\Users\Sanjay.Kumar\OneDrive\Documents\SpeedyInt\speedy-intervue-ai-match-main (1)\speedy-intervue-ai-match-main\server\duplicates\Tesseract-OCR\tesseract.exe"
    def getResumeText(self):
        """
        This function attempts to extract text from a PDF file.
        If the PDF contains text, it will extract it directly.
        If the PDF contains images (scanned), it will perform OCR to extract text.
        """
        # Try extracting text using Fitz (for text-based PDFs)
        pytesseract.pytesseract.tesseract_cmd = self.tesseractpath
        doc = fitz.open(self.path)
        text = ""
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            page_text = page.get_text()
            # If page contains text, add it to the text variable
            if page_text.strip():  # Only append text if it's not empty
                text += page_text
            else:
                # If no text is found, use OCR (in case it's a scanned image-based page)
                images = page.get_images(full=True)  # Get all images on the page
                for img_index, img in enumerate(images):
                    xref = img[0]  # Image reference
                    image = doc.extract_image(xref)  # Extract image
                    image_data = image["image"]  # Image data (binary)
                    pil_image = Image.open(BytesIO(image_data))  # Convert to PIL image
                    # Perform OCR on the image to extract text
                    text += pytesseract.image_to_string(pil_image)
        return text
    
    def getResumeTextOCR(self):
        """
        It uses tesseract OCR to convert image into text. It is inaccurate but useful.
        tesseractpath: str : variable contain tesseract OCR exe path
        """
        pytesseract.pytesseract.tesseract_cmd = self.tesseractpath
        pil_image = Image.open(self.path)
        text = pytesseract.image_to_string(pil_image)
        return text
    
    def parseResume(self, ResumeText):
        """
        It is use to convert raw text into specific format using cohere API
        Resumetext : str : raw text of resume
        return formatted text
        """
        history = [
            {
                "role": "system",
                "content": "You are a Resume Parsing Assistant. You will receive raw resume text and a specific format request. Your task is to extract the relevant sections of the resume in the specified order and return them in a formatted manner. Please focus on extracting the following fields from the resume, with the most generic possible labels:\n\n- Name\n- Email\n- Phone\n- Links (for example: LinkedIn or personal website)\n- Location (where the person is based)\n- Description (a brief personal statement or career summary)\n- Skills (key competencies, tools, or technologies known by the individual)\n- Education (list of degrees and institutions attended, with dates (MM/YYYY))\n- Projects (name, description, and related date or phase of the project if available)\n- Certifications (title, dates, and provider)\n- Experience (job titles, company names, dates, and locations)\n- Type (the type of job or field the person is seeking, such as Data Science, Engineering, etc.)\n\nAvoid using specific terms like 'semester' or 'session'. If dates or phases are mentioned, label them as 'timeline' or 'phase' rather than using specific words tied to academic terminology. Always keep labels generic and applicable to various resume formats.\n\nIf any section of the text does not fit the typical content of a resume, label it as 'NOT RESUME' in the 'Type' field.",
            },
            {
                "role": "user",
                "content": "```RESUME TEXT\nAli Ahad\\nData Professional \\nI've always been interested in Mathematics and Technology. When I discovered Python programming\\nﬁve years ago, I developed a passion for Data Science and Statistics. Since then, I've spent hundreds\\nof hours self-learning through online courses, coding programs related to web scraping and data\\nanalysis. In October 2021, I began my Bachelor degree in Artiﬁcial Intelligence, aiming to build a\\ncareer in this ﬁeld. Additionally, I volunteer at community institutions and am a member of the\\nPakistan Boy Scouts. \\naliahad@yahoo.com \\n0345 2123565 \\nKarachi, Pakistan \\nlinkedin.com/in/ali-ahad \\nSKILLS \\nPython \\nSQL \\nData Analysis \\nWeb Scraping \\nComputer VIsion \\nLANGUAGES \\nEnglish \\nProfessional Working Proﬁciency \\nUrdu \\nFull Professional Proﬁciency \\nEDUCATION \\nBachelor of Artiﬁcial Intelligence \\nSZABIST University \\n10/2021 - 10/2025,  \\nIntermediate of Commerce \\nThe Caspian College \\n02/2018 - 02/2021,  \\nVOLUNTEER EXPERIENCE \\nBoy Scout \\nIDBSA \\n01/2015 - Present,  \\nKarachi, Pakistan \\n2nd COMMISSIONER KARACHI CITY MARATHON \\nCERTIFICATES \\nPython Fundamentals Track (03/2021 - 03/2021) \\nDataCamp \\nPython Data Science Toolbox (Part 1, 2) \\nDataCamp \\nFC1x: Fat Chance: Probability from the Ground Up (04/2021 - 04/2021) \\nedX \\nIntroduction to Machine Learning (06/2021 - 06/2021) \\nKaggle \\nPROJECTS \\nFace Recognition using python — Semester 3 \\nBy using the face recognition library in python I have created this project \\nEmotion Detection using python — Semester 4 \\nBy using the Tensorﬂow library in python me and my teammates have created this project. Emotion\\n(happy, sad, angry) \\nTraﬃc Signal Optimization System — Semester 6 \\nBy using OpenCV and Yolo v4 Model me and my teammates create traﬃc optimization system which use\\nAdaptive traﬃc control system (ATCS). \\nACHIEVEMENTS \\n2nd  Position in Zabefest — Department pf Artiﬁcial Intelligence (04/2023 - 04/2023) \\nEmotion Detection using python \\nAchievements/Tasks \\n```\n\n\n```FORMAT\nName:\nEmail:\nPhone:\nLinks:\nLocation:\nDescription:\nSkills:\nEducations:\nProject:\nCertification:\nExperience:\nType: #Related to which kind of job, if text is not related to Resume content change type to 'NOT RESUME'\n```",
            },
            {
                "role": "assistant",
                "content": "**Name:** Ali Ahad\n\n**Email:** aliahad@yahoo.com\n\n**Phone:** 0345 2123565\n\n**Links:** linkedin.com/in/ali-ahad\n\n**Location:** Karachi, Pakistan\n\n**Description:** A dedicated Data Professional with a passion for Mathematics, Technology, and Data Science. Pursuing a Bachelor's degree in Artificial Intelligence, with a strong foundation in Python, SQL, and Data Analysis.\n\n**Skills:** Python, SQL, Data Analysis, Web Scraping, Computer Vision\n\n**Educations:**\n- Bachelor of Artificial Intelligence, SZABIST University (10/2021 - 10/2025)\n- Intermediate of Commerce, The Caspian College (02/2018 - 02/2021)\n\n**Projects:**\n- Face Recognition using Python\n- Emotion Detection using Python\n- Traffic Signal Optimization System using OpenCV and YOLO v4 Model\n\n**Certifications:**\n- Python Fundamentals Track (DataCamp)\n- Python Data Science Toolbox (Part 1, 2) (DataCamp)\n- FC1x: Fat Chance: Probability from the Ground Up (edX)\n- Introduction to Machine Learning (Kaggle)\n\n**Experience:**\n- Boy Scout, IDBSA (01/2015 - Present)\n- 2nd Commissioner Karachi City Marathon (Volunteer experience)\n\n**Type:** Data Science and Artificial Intelligence",
            },
        ]
        message = f"```RESUME TEXT\n{ResumeText}```\n\n```FORMAT\nName:\nEmail:\nPhone:\nLinks:\nLocation:\nDescription:\nSkills:\nEducations:\nProject:\nCertification:\nExperience:\nType: #Related to which kind of job, if text is not related to Resume content change type to 'NOT RESUME'\n```"
        history.append({"role":"user", "content":message})
        completion = self.co.chat.completions.create(model="meta-llama/llama-4-scout-17b-16e-instruct", 
                                                    messages=history,
                                                    temperature=1, max_completion_tokens=1024,
                                                    top_p=1, stream=False, stop=None)
        return completion.choices[0].message.content
    
    def parseResumeJson(self, ResumeText):
        """
        It is use to convert raw text into specific format using cohere API
        Resumetext : str : raw text of resume
        return Json data
        """
        history = [
            {
                "role": "system",
                "content": "You are a Resume Parsing Assistant. You will receive formatted resume text and a specific format request. Your task is to extract the relevant sections of the resume in the specified order and return them in JSON format. \nAvoid using specific terms such as 'session' or 'semester' in your output, and instead, use general labels such as 'date', 'phase', or 'timeline' where applicable. If the content does not contain standard resume-related sections, mark it as 'NOT RESUME' in the 'Type' field then set all field to **N/A**, and set 'Type' field to **NOT RESUME**:.\n\nFocus entirely on the content provided in the current resume and **do not** reference or use any past history. Extract the relevant information in a structured, logical order without unnecessary repetitions. Ensure that each section is clearly labeled and returned in valid JSON format.",
            },
            {
                "role": "assistant",
                "content": '```json\n{\n"Name": "Ali Ahad",\n"Email": "aliahad@yahoo.com",\n"Phone": "0345 2123565",\n"Links": "linkedin.com/in/ali-ahad",\n"Location": "Karachi, Pakistan",\n"Description": "Data Professional with a passion for Data Science and Statistics. I have extensive experience in Python programming and have completed numerous online courses and projects. Currently pursuing a Bachelor\'s degree in Artificial Intelligence and actively involved in volunteer work. Skilled in web scraping, data analysis, and computer vision.",\n"Skills": [\n"Python",\n"SQL",\n"Data Analysis",\n"Web Scraping",\n"Computer Vision"\n],\n"Educations": [\n{\n"Degree": "Bachelor of Artificial Intelligence",\n"Institution": "SZABIST University", \n"Start Date": "10/2021",\n"End Date": "10/2025"\n},\n{\n"Degree": "Intermediate of Commerce",\n"Institution": "The Caspian College",\n"Start Date": "02/2018",\n"End Date": "02/2021"\n}\n],\n"Project": [\n{\n"Name": "Face Recognition using python",\n"Description": "Developed a face recognition system using Python libraries.",\n"Semester": "3"\n},\n{\n"Name": "Emotion Detection using python",\n"Description": "Collaborated with teammates to create an emotion detection project using TensorFlow. Detected emotions: happy, sad, angry.",\n"Semester": "4"\n},\n{\n"Name": "Traffic Signal Optimization System",\n"Description": "Built a traffic optimization system with OpenCV and Yolo v4, incorporating an Adaptive Traffic Control System (ATCS).",\n"Semester": "6"\n}\n],\n"Certification": [\n"Python Fundamentals Track (03/2021 - 03/2021) - DataCamp",\n"Python Data Science Toolbox (Part 1, 2) - DataCamp",\n"FC1x: Fat Chance: Probability from the Ground Up (04/2021 - 04/2021) - edX",\n"Introduction to Machine Learning (06/2021 - 06/2021) - Kaggle"\n],\n"Experience": [\n{\n"Position": "Boy Scout",\n"Organization": "IDBSA",\n"Date": "01/2015 - Present",\n"Location": "Karachi, Pakistan"\n},\n{\n"Position": "2nd COMMISSIONER KARACHI CITY MARATHON",\n"Organization": "N/A",\n"Date": "N/A",\n"Location": "N/A"\n}\n],\n"Type": "Data Science, Artificial Intelligence"\n}\n```',
            },
        ]
        message = f"```RESUME TEXT\n{ResumeText}```\n\n```FORMAT\nName:\nEmail:\nPhone:\nLinks:\nLocation:\nDescription:\nSkills:\nEducations:\nProject:\nCertification:\nExperience:\nType: #Related to which kind of job\n```"
        history.append({"role":"user", "content":message})
        completion = self.co.chat.completions.create(model="meta-llama/llama-4-scout-17b-16e-instruct", 
                                                    messages=history,
                                                    temperature=1, max_completion_tokens=1024,
                                                    top_p=1, stream=False, stop=None)
        
        parsed_text = completion.choices[0].message.content
        parsed_text = parsed_text.strip("``` \n json")
        try:
            parsed_json = json.loads(parsed_text)
        except:
            parsed_json = self.Jsonformattor(parsed_text)
        return parsed_json
    
    def analysis(self, cv, job_description):
        history = [
            {
                "role": "system",
                "content": 'You are an advanced AI model designed to analyze the compatibility between a CV and a job description. You will receive a CV and a job description. Your task is to output a structured JSON format that includes the following:\n\n1. matching_analysis: Analyze the CV against the job description to identify key strengths and gaps.\n2. description: Summarize the relevance of the CV to the job description in a few concise sentences.\n3. score: Provide a numerical compatibility score (0-100) based on qualifications, skills, and experience and if relevant information is not provided rate 0. IF CV is not related with Job Description give **low score**.\n4. recommendation: Suggest actions for the candidate to improve their match or readiness for the role.\n\nYour output must be in JSON format as follows:\n{\n"matching_analysis": "Your precise short analysis here.",\n"description": "A short precise summary here use 2nd person grammer like "You","Your".",\n"score": 0-100,\n"recommendation": "Your short suggestions here use 2nd person grammer here like "You","Your"."\n}\n',
            }
        ]
        message = f"<CV> {cv} </CV>\n<job_description> {job_description} </job_description>"
        history.append({"role":"user", "content":message})
        completion = self.co.chat.completions.create(model="meta-llama/llama-4-scout-17b-16e-instruct", 
                                                    messages=history,
                                                    temperature=1, max_completion_tokens=1024,
                                                    top_p=1, stream=False, stop=None)
        
        parsed_text = completion.choices[0].message.content
        parsed_text = parsed_text.strip("``` \n json")
        try:
            parsed_json = json.loads(parsed_text)
        except:
            parsed_json = self.Jsonformattor(parsed_text)
        return parsed_json
    
    def interviewQuestions(self, cv, job_description):
        history = [
            {
                "role": "system",
                "content": 'You are a seasoned hiring manager with extensive experience in evaluating candidates for [specific job role, e.g., Software Engineer, Marketing Specialist]. Your goal is to create thoughtful, job-relevant **interview questions** that assess a candidates skills, experience, and potential. Based on the job description below, generate a list of interview questions that delve into both technical competencies and soft skills while also assessing cultural fit and problem-solving abilities. The **questions** should be open-ended and tailored to extract meaningful insights from the candidate. Give output in **json format**. You will get Job description and Interviewee Resume text like:\n Input:\n<job_description>{job description}</job_description> <Interviewee_Resume_text>{Interviewee_Resume_text}</Interviewee_Resume_text>\n\nOutput:\n{"Questions based on job description":[list of question],\n "Questions based on interviewee Mentioned details":[list of question],\n "Questions based on interviewee softskills":[list of question]\n}',
            }
        ]
        message = f"<job_description> {job_description} </job_description><Interviewee_Resume_text>{cv}</Interviewee_Resume_text>"
        history.append({"role":"user", "content":message})
        completion = self.co.chat.completions.create(model="meta-llama/llama-4-scout-17b-16e-instruct", 
                                                    messages=history,
                                                    temperature=1, max_completion_tokens=1024,
                                                    top_p=1, stream=False, stop=None)
        
        parsed_text = completion.choices[0].message.content
        parsed_text = parsed_text.strip("``` \n json")
        try:
            parsed_json = json.loads(parsed_text)
        except:
            parsed_text = self.Jsonformattor(parsed_text)
            parsed_json = json.loads(parsed_text)
        return parsed_json
    
    def interviewQuestions1(self, cv, job_description):
        history = [
            {
                "role": "system",
                "content": 'You are a seasoned hiring manager with extensive experience in evaluating candidates for [specific job role, e.g., Software Engineer, Marketing Specialist]. Your goal is to create thoughtful, job-relevant **interview questions** that assess a candidates skills, experience, and potential. Based on the job description below, generate a list of interview questions that delve into both technical competencies and soft skills while also assessing cultural fit and problem-solving abilities. The **questions** should be open-ended and tailored to extract meaningful insights from the candidate. Give output in **json format**. You will get Job description and Interviewee Resume text like:\n Input:\n<job_description>{job description}</job_description> <Interviewee_Resume_text>{Interviewee_Resume_text}</Interviewee_Resume_text>\n\nOutput:\n{"Questions based on job description":[list of question],\n "Questions based on interviewee Mentioned details":[list of question],\n "Questions based on interviewee softskills":[list of question]\n}',
            }
        ]
        message = f"<job_description> {job_description} </job_description><Interviewee_Resume_text>{cv}</Interviewee_Resume_text>"
        history.append({"role":"user", "content": message})
        completion = self.co.chat.completions.create(model="meta-llama/llama-4-scout-17b-16e-instruct", 
                                                    messages=history,
                                                    temperature=1, max_completion_tokens=1024,
                                                    top_p=1, stream=False, stop=None)
        
        parsed_text = completion.choices[0].message.content
        history.append({"role": "assistant", "content": parsed_text})
        history.append(
            {
                "role": "system",
                "content": "You are professional interviewer at a company, job description and questions are provided in chat history. Do not use i am happy to help you. You will generate audio of question and then after that interviewee audio will be shared .",
            }
        )
        while True:
            response = self.co.chat.completions.create(
                modalities=["text", "audio"],
                audio={"voice": "ember", "format": "wav"},
                model="gpt-4o-audio-preview",
                messages=history,
            )
            wav_bytes = base64.b64decode(response.choices[0].message.audio.data)
            audio = AudioSegment.from_file(BytesIO(wav_bytes), format="wav")
            samples = np.array(audio.get_array_of_samples(), dtype=np.float32)
            if audio.channels == 2:
                samples = samples.reshape((-1, 2))
            sd.play(samples, samplerate=audio.frame_rate)
            sd.wait()
            break
        return
    
    def Jsonformattor(self, text):
        history = [
            {
                "role": "system",
                "content": "You are a JSON formatter designed to:\n1. Correct incorrect JSON format by fixing syntax errors such as missing commas, incorrect brackets, or improper nesting.\n2. Complete incomplete JSON structures by identifying missing key-value pairs, closing brackets, or incomplete data structures.\n3. Extract valid JSON from raw text, which may contain both JSON and additional text, ensuring the extracted JSON is properly formatted.\n\nRules for JSON correction and formatting:\n- Always use double quotes (\") for keys and string values; never use single quotes.\n- Ensure all keys and string values are properly enclosed in double quotes.\n- Maintain proper indentation and structure for readability.\n- Remove any trailing commas that may cause syntax errors.\n- Ensure lists and objects are correctly opened `{` and closed `}`.\n- Convert incorrectly formatted numbers (e.g., '01' should be '1').\n- Boolean values must be lowercase (`true`, `false`).\n- Null values must be explicitly written as `null`.\n\nOutput:\nReturn only the corrected or extracted JSON without additional explanations or text.",
            }
        ]
        message = f"{text}"
        history.append({"role": "user", "content": message})
        completion = self.co.chat.completions.create(model="meta-llama/llama-4-scout-17b-16e-instruct", messages=history, temperature=1, max_completion_tokens=1024,
                                                     top_p=1, stream=False, stop=None)
        
        parsed_text = completion.choices[0].message.content
        parsed_text = parsed_text.strip("``` \n json")
        return parsed_text
    
    def main(self):
        text = ""
        # Check for PDF file
        if self.path.lower().endswith(".pdf"):
            text = self.getResumeText()
        # Check for image file types (e.g., jpg, png)
        elif self.path.lower().endswith(
            (".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".tif", ".webp")
        ):
            text = self.getResumeTextOCR()
        else:
            print("Unsupported file format. Please provide a valid PDF or image file.")
            return
        
        # Check if job description file exists
        job_desc_path = os.path.join(os.path.dirname(self.path), "job_description.txt")
        if not os.path.exists(job_desc_path):
            print("Job description file not found. Creating default analysis.")
            job_description = "Software Engineer position requiring programming skills and experience."
        else:
            job_description = open(job_desc_path, "r").read()
        
        # Parse the raw text and format it
        parsed_text = self.parseResume(text)
        #parsed_json = self.parseResumeJson(parsed_text)
        #print(f"{parsed_text}\n\n{json.dumps(parsed_json, indent=4)}")
        analysis_json = self.analysis(parsed_text, job_description)
        #print(f"{json.dumps(analysis_json, indent=4)}")
        #interviewQuestions = self.interviewQuestions(parsed_text, job_description)
        #print(f"{json.dumps(interviewQuestions, indent=4)}")
        print(analysis_json)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python resumeParser.py <resume_file_path>")
        sys.exit(1)
    
    path = sys.argv[1]
    resume = Resume(path)
    resume.main()
