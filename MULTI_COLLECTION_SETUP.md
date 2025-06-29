# Multi-Collection User System Setup

This document explains the new role-based user storage system that separates users into different MongoDB collections based on their role.

## Overview

The system now uses three separate collections instead of a single "users" collection:

- **`users`** - Job Seekers / Candidates
- **`companies`** - Hiring Companies  
- **`interviewers`** - Professional Interviewers

## New Models

### User Model (`server/models/User.js`)
For job seekers/candidates with fields like:
- `firstname`, `lastname`
- `skills`, `experience`, `education`
- `resume`, `appliedJobs`

### Company Model (`server/models/Company.js`)
For hiring companies with fields like:
- `fullname`, `company`
- `industry`, `jobPostings`

### Interviewer Model (`server/models/Interviewer.js`)
For professional interviewers with fields like:
- `firstname`, `lastname`
- `jobTitle`, `department`
- `interviewsScheduled`

## Key Features

### 1. Role-Based User Creation
Users are automatically saved to the correct collection based on their selected role during signup:
- "Job Seeker / Candidate" → `users` collection
- "Hiring Company" → `companies` collection  
- "Professional Interviewer" → `interviewers` collection

### 2. Cross-Collection Authentication
The system can authenticate users across all collections using their email address.

### 3. Unified API
The frontend doesn't need to change - all authentication endpoints work the same way.

## Setup Instructions

### 1. Test the New System
```bash
cd server
npm run test-multi-collections
```

### 2. Migrate Existing Users (if any)
If you have existing users in the old single collection:
```bash
cd server
npm run migrate-users
```

### 3. Start the Server
```bash
cd server
npm run dev
```

## API Endpoints

All existing endpoints work the same way:

- `POST /api/auth/signup` - Creates user in appropriate collection
- `POST /api/auth/login` - Authenticates across all collections
- `GET /api/auth/me` - Returns user info with correct role

## Utility Functions

The system includes helper functions in `server/utils/userUtils.js`:

- `findUserByEmail(email)` - Find user across all collections
- `findUserById(id)` - Find user by ID across all collections
- `createUserByRole(userData, role)` - Create user in correct collection
- `getDisplayName(user, role)` - Get formatted display name

## Database Collections

After setup, you'll see these collections in MongoDB Atlas:
- `users` - Candidates/Job seekers
- `companies` - Hiring companies
- `interviewers` - Professional interviewers

## Benefits

1. **Better Organization** - Each user type has its own collection with relevant fields
2. **Scalability** - Easier to manage and query specific user types
3. **Flexibility** - Each collection can have different fields and validation rules
4. **Performance** - Queries can be more targeted and efficient

## Troubleshooting

### Common Issues

1. **"User already exists" error**
   - The system checks for duplicate emails across all collections
   - Each email can only exist once across all user types

2. **Authentication fails after migration**
   - Run the migration script to move existing users
   - Check that the JWT token contains the correct user ID

3. **Role not showing correctly**
   - Verify the role mapping in the frontend matches the backend
   - Check that the `getDisplayName` function is working correctly

### Testing

Use the test script to verify everything works:
```bash
npm run test-multi-collections
```

This will create test users in each collection and verify authentication works correctly. 