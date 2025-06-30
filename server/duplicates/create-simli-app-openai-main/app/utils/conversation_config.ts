export var instructions = `System settings:
You are an upbeat, genuine AI agent with both advanced real‑time voice capabilities and a professional interviewer’s expertise in technical and HR domains. Your goal is to conduct a structured, live interview—asking concise audio questions, listening to audio responses, and adapting in real time—while also exploring conversationally when helpful.

Core Behaviors:
- Voice Output: Always respond via clear, courteous audio. Speak with energy and enthusiasm (unless the interviewee seems nervous, in which case soften your tone).
- Tool Usage: Feel free to leverage any available tools and functions to enrich the interaction.
- Engagement: Be kind, helpful, and curious. Ask follow‑up questions when needed; it’s okay to ask for clarification.
- Adaptability: Match or complement the interviewee’s accent. Adjust your speaking pace and tone to suit their comfort.

Interview Process:
1. Initialization: You will receive:
   <Job_description>{…}</Job_description>
   <IntervieweeResume>{…}</IntervieweeResume>
2. Questioning:
   - Generate your first question in audio form.
   - Questions must be no longer than three sentences, and always grounded in:
     • The Job Description
     • Details from the Interviewee’s Resume
     • Relevant Technical and Soft Skills
   - If the interviewee’s audio response is empty or unclear, do not offer praise. Instead ask:
     “Can you please clarify what you were saying about {specific topic}?”
3. Dynamic Flow:
   - After each clear response, analyze it and pose the next question—always staying on‑topic (no random tangents).
   - If the interviewee gives an expected or strong answer, use that content to inform your next question.
4. Compliments & Tone:
   - Offer encouragement sparingly and only when directly relevant to their latest response.
   - Modulate your tone—be soft‑spoken if they appear nervous, energetic if they’re confident.
5. Completion: Continue this cycle until you have covered all key areas of the job description and resume.
6. Ask more than 5 Questions each related to <Job_description>, <IntervieweeResume>.
7. End interview properly "{Something as Ending Pharse then} Please click on Stop Interaction now".
Stay focused, responsive, and courteous throughout the live interview.
`;


export var resumeTXT = `Ali Ahad Maknojia
Data Professional
I've always been interested in Mathematics and Technology. When I discovered Python programming
five years ago, I developed a passion for Data Science and Statistics. Since then, I've spent hundreds
of hours self-learning through online courses, coding programs related to web scraping and data
analysis. In October 2021, I began my Bachelor degree in Artificial Intelligence, aiming to build a
career in this field. Additionally, I volunteer at community institutions and am a member of the
Pakistan Boy Scouts.
aliahadmaknojia@gmail.com
0340 2190064
Karachi, Pakistan
linkedin.com/in/ali-ahad
SKILLS
Python SQL
Data Analysis
Web Scraping
Computer VIsion
LANGUAGES
English
Professional Working Proficiency
Urdu
Full Professional Proficiency
EDUCATION
Bachelor of Artificial Intelligence
SZABIST University
10/2021 - 10/2025,
Intermediate of Commerce
The Caspian College
02/2018 - 02/2021,
VOLUNTEER EXPERIENCE
Boy Scout
IDBSA
01/2015 - Present, Karachi, Pakistan
2nd COMMISSIONER KARACHI CITY MARATHON
CERTIFICATES
Python Fundamentals Track (03/2021 - 03/2021)
DataCamp
Python Data Science Toolbox (Part 1, 2)
DataCamp
FC1x: Fat Chance: Probability from the Ground Up (04/2021 - 04/2021) edX
Introduction to Machine Learning (06/2021 - 06/2021)
Kaggle
PROJECTS
Face Recognition using python — Semester 3
By using the face recognition library in python I have created this project
Emotion Detection using python — Semester 4
By using the Tensorflow library in python me and my teammates have created this project. Emotion
(happy, sad, angry)
Traffic Signal Optimization System — Semester 6
By using OpenCV and Yolo v4 Model me and my teammates create traffic optimization system which use Adaptive traffic control system (ATCS).
ACHIEVEMENTS
2nd Position in Zabefest — Department of Artificial Intelligence (04/2023 - 04/2023)
Emotion Detection using python
Achievements/Tasks
`;

export var JDTXT = `Company Description

Treasury Cube is a provider of best-in-class Treasury Management Systems (TMS) aimed at optimizing treasury functions for businesses of all sizes. With a suite of services including Bank Account Management, Cash Flow Forecasting, Risk Management, and Compliance Solutions, Treasury Cube is dedicated to simplifying financial operations while addressing each client's unique needs with precision.


Role Description
This is a Contract remote role for a MS SQL Database Administrator at Treasury Cube. The Database Administrator will be responsible for database administration, replication, database design, troubleshooting, and managing databases on Azure. The ideal candidate will have experience with the setting up of Azure VM Always On availability groups for high availability and disaster recovery. The ideal candidate will have extensive knowledge and hands-on experience with both standard and data center licenses. Your expertise will be critical in ensuring a robust and reliable database environment. If you're passionate about SQL and have a proven track record in Azure setups, we want to hear from you!


Qualifications
Database Administration, Replication, and Troubleshooting skills
Azure VM Always On availability groups for high availability and disaster recovery.
Database Design and Azure experience
Ability to manage databases effectively
Experience working with complex databases
Strong analytical and problem-solving skills
Excellent communication and collaboration abilities
Bachelor's degree in Computer Science or related field
`;