# MongoDB Setup for SpeedyIntervue

This guide will help you set up MongoDB authentication to replace Supabase in your SpeedyIntervue project.

## Prerequisites

1. **MongoDB Installation**
   - Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud service) for easier setup

2. **Node.js** (already installed)

## Setup Instructions

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Server**
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow installation wizard
   - MongoDB will run on `mongodb://localhost:27017` by default

2. **Start MongoDB Service**
   ```bash
   # On Windows (if installed as service)
   net start MongoDB
   
   # Or start manually
   "C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
   ```

### Option 2: MongoDB Atlas (Recommended for beginners)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (free tier available)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

3. **Update Configuration**
   - Edit `server/config.env`
   - Replace `MONGODB_URI` with your Atlas connection string

## Running the Application

### 1. Start the Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies (if not done already)
npm install

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Start the Frontend

```bash
# In a new terminal, navigate to project root
cd ..

# Start the frontend
npm run dev
```

The frontend will run on `http://localhost:8080`

## API Endpoints

The backend provides these authentication endpoints:

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth token)

## Environment Variables

Update `server/config.env` with your settings:

```env
MONGODB_URI=mongodb://localhost:27017/speedy-intervue
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

## Testing the Setup

1. **Start both servers** (backend on port 5000, frontend on port 8080)
2. **Open** `http://localhost:8080` in your browser
3. **Try signing up** with a new account
4. **Try logging in** with the created account

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `config.env`
- Verify network access (for Atlas)

### Port Conflicts
- Backend runs on port 5000 by default
- Frontend runs on port 8080 by default
- Change ports in `config.env` and `vite.config.ts` if needed

### CORS Issues
- Backend is configured to allow requests from `http://localhost:8080`
- Update CORS settings in `server/server.js` if using different ports

## Security Notes

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Set up proper MongoDB authentication** for production
4. **Use environment variables** for sensitive data

## Database Schema

The MongoDB setup includes these collections:

- **users**: User accounts with authentication data
- **resumes**: Resume uploads and parsed data
- **interviews**: Interview scheduling and data

## Migration from Supabase

The frontend has been updated to use the new MongoDB API:
- Removed Supabase dependencies
- Updated AuthContext to use new API service
- Maintained same user interface and experience 