# SpeedyIntervue AI Match - Complete Setup and Execution Guide

This guide will help you set up and run the complete application with frontend, backend, and Python components.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Python** (v3.8 or higher)
3. **MongoDB Atlas** account (or local MongoDB)
4. **Git** (for cloning the repository)

## Project Structure

```
speedy-intervue-ai-match-main/
├── src/                    # Frontend (React + Vite)
├── server/                 # Backend (Node.js + Express)
│   ├── duplicates/         # Python scripts
│   │   ├── resumeParser.py
│   │   └── Tesseract-OCR/  # OCR tools
│   └── routes/            # API routes
└── package.json           # Frontend dependencies
```

## Step 1: Install Frontend Dependencies

```bash
# Navigate to the root directory
cd speedy-intervue-ai-match-main

# Install frontend dependencies
npm install
```

## Step 2: Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install
```

## Step 3: Install Python Dependencies

```bash
# Make sure you're in the server directory
cd server

# Install Python dependencies
pip install -r requirements.txt
```

## Step 4: Configure Environment Variables

The backend configuration is already set up in `server/config.env`:

```env
MONGODB_URI=mongodb+srv://bsai21108125:tDIZNgyMrEebMAHv@cluster0.g8nyqaz.mongodb.net/SpeedyIntervue?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

## Step 5: Set Up Tesseract OCR

The application includes Tesseract OCR binaries in `server/duplicates/Tesseract-OCR/`. The Python script is configured to use these binaries automatically.

## Step 6: Run the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
# Navigate to server directory
cd server

# Start the backend server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# Navigate to root directory
cd speedy-intervue-ai-match-main

# Start the frontend development server
npm run dev
```

### Option 2: Run Both with Concurrently (Recommended)

First, install concurrently in the root directory:
```bash
npm install --save-dev concurrently
```

Then add this script to the root `package.json`:
```json
{
  "scripts": {
    "dev:full": "concurrently \"npm run dev\" \"cd server && npm run dev\"",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Now you can run both servers with one command:
```bash
npm run dev:full
```

## Step 7: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Candidate Features
- `POST /api/candidate/upload-resume` - Upload resume file
- `POST /api/candidate/add-skills` - Add skills to profile
- `POST /api/candidate/add-portfolio` - Add portfolio link
- `POST /api/candidate/add-job-description` - Add job description
- `GET /api/candidate/get-resume-score` - Get AI resume analysis
- `GET /api/candidate/profile` - Get candidate profile
- `POST /api/candidate/start-interview` - Start mock interview

## Features

### 1. Resume Upload and Analysis
- Upload PDF/DOC/DOCX resumes
- AI-powered resume parsing using Groq API
- OCR support for scanned documents
- Resume-to-job matching analysis

### 2. Profile Management
- Skills management
- Portfolio links
- Job description input
- Profile completion tracking

### 3. AI Interview System
- Mock interview functionality
- AI-generated interview questions
- Resume scoring and recommendations

## Troubleshooting

### Common Issues

1. **Python Dependencies Not Found**
   ```bash
   pip install -r server/requirements.txt
   ```

2. **MongoDB Connection Error**
   - Check your internet connection
   - Verify MongoDB Atlas credentials in `server/config.env`

3. **Tesseract OCR Issues**
   - The application includes Tesseract binaries
   - Make sure the path in `resumeParser.py` is correct

4. **Port Already in Use**
   - Change the port in `server/config.env`
   - Or kill the process using the port

### API Keys Required

The Python script uses these APIs (already configured):
- **Groq API**: For AI text processing
- **OpenAI API**: For audio generation

## Development Notes

- The frontend uses React with TypeScript and Vite
- The backend uses Express.js with MongoDB
- Python scripts handle resume parsing and AI analysis
- All components are configured to work together seamlessly

## Production Deployment

For production deployment:
1. Set proper environment variables
2. Use a production MongoDB instance
3. Configure proper CORS settings
4. Set up proper file upload limits
5. Use HTTPS for security

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is accessible
4. Check API key configurations 