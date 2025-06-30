import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @route   POST /api/candidate/upload-resume
// @desc    Upload resume file
// @access  Private
router.post('/upload-resume', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with resume file path
    user.resume = req.file.path;
    user.resumeUploaded = true;
    user.profileCompletion = user.calculateProfileCompletion();
    
    await user.save();

    res.json({
      message: 'Resume uploaded successfully',
      resumePath: req.file.path,
      profileCompletion: user.profileCompletion
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/candidate/add-skills
// @desc    Add skills to user profile
// @access  Private
router.post('/add-skills', auth, async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add new skills (avoid duplicates)
    const existingSkills = new Set(user.skills);
    skills.forEach(skill => {
      if (!existingSkills.has(skill)) {
        user.skills.push(skill);
      }
    });

    user.profileCompletion = user.calculateProfileCompletion();
    await user.save();

    res.json({
      message: 'Skills added successfully',
      skills: user.skills,
      profileCompletion: user.profileCompletion
    });
  } catch (error) {
    console.error('Add skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/candidate/add-portfolio
// @desc    Add portfolio link
// @access  Private
router.post('/add-portfolio', auth, async (req, res) => {
  try {
    const { portfolio } = req.body;

    if (!portfolio) {
      return res.status(400).json({ message: 'Portfolio link is required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.portfolio = portfolio;
    user.profileCompletion = user.calculateProfileCompletion();
    await user.save();

    res.json({
      message: 'Portfolio added successfully',
      portfolio: user.portfolio,
      profileCompletion: user.profileCompletion
    });
  } catch (error) {
    console.error('Add portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/candidate/add-job-description
// @desc    Add job description for matching
// @access  Private
router.post('/add-job-description', auth, async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.jobDescription = jobDescription;
    user.profileCompletion = user.calculateProfileCompletion();
    await user.save();

    res.json({
      message: 'Job description added successfully',
      jobDescription: user.jobDescription,
      profileCompletion: user.profileCompletion
    });
  } catch (error) {
    console.error('Add job description error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/candidate/get-resume-score
// @desc    Get resume score using Python script
// @access  Private
router.get('/get-resume-score', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.resumeUploaded || !user.resume) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    if (!user.jobDescription) {
      return res.status(400).json({ message: 'No job description provided' });
    }

    // Create job description file for Python script
    const jobDescPath = path.join(__dirname, '..', 'uploads', 'job_description.txt');
    fs.writeFileSync(jobDescPath, user.jobDescription);

    // Run Python resume parser
    const pythonScript = path.join(__dirname, '..', 'duplicates', 'resumeParser.py');
    
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [pythonScript, user.resume]);
      
      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', async (code) => {
        if (code !== 0) {
          console.error('Python script error:', error);
          res.status(500).json({ 
            message: 'Error processing resume',
            error: error 
          });
          resolve();
        } else {
          try {
            // Parse the result (assuming it returns JSON)
            const analysis = JSON.parse(result);
            
            // Update user with resume score
            user.resumeScore = analysis.score || 0;
            user.aiScore = analysis.score || 0;
            await user.save();

            res.json({
              message: 'Resume analysis completed',
              score: analysis.score,
              analysis: analysis.matching_analysis,
              description: analysis.description,
              recommendations: analysis.recommendation
            });
          } catch (parseError) {
            console.error('Parse error:', parseError);
            res.status(500).json({ 
              message: 'Error parsing resume analysis result',
              rawResult: result 
            });
          }
          resolve();
        }
      });
    });

  } catch (error) {
    console.error('Get resume score error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/candidate/profile
// @desc    Get candidate profile data
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate profile completion
    const profileCompletion = user.calculateProfileCompletion();
    user.profileCompletion = profileCompletion;
    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: `${user.firstname} ${user.lastname}`.trim(),
        skills: user.skills,
        portfolio: user.portfolio,
        resumeUploaded: user.resumeUploaded,
        resumeScore: user.resumeScore,
        jobDescription: user.jobDescription,
        profileCompletion: user.profileCompletion,
        interviewsTaken: user.interviewsTaken,
        successRate: user.successRate,
        aiScore: user.aiScore,
        mockInterviews: user.mockInterviews
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/candidate/start-interview
// @desc    Start mock interview
// @access  Private
router.post('/start-interview', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.resumeUploaded) {
      return res.status(400).json({ message: 'Please upload your resume first' });
    }

    // Increment mock interviews count
    user.mockInterviews += 1;
    await user.save();

    res.json({
      message: 'Mock interview started',
      mockInterviews: user.mockInterviews
    });
  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 