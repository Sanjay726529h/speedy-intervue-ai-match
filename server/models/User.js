import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    trim: true,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: String,
    default: null
  },
  education: [{
    degree: { type: String, default: null },
    university: { type: String, default: null },
    yearOfGraduation: { type: String, default: null }
  }],
  resume: {
    type: String,
    default: null
  },
  resumeScore: {
    type: Number,
    default: 0
  },
  resumeUploaded: {
    type: Boolean,
    default: false
  },
  portfolio: {
    type: String,
    default: ""
  },
  profileCompletion: {
    type: Number,
    default: 0
  },
  jobDescription: {
    type: String,
    default: null
  },
  appliedJobs: {
    type: [String],
    default: []
  },
  contactNumber: {
    type: String,
    default: null
  },
  location: {
    city: { type: String, default: null },
    country: { type: String, default: null }
  },
  interviewsTaken: {
    type: Number,
    default: 0
  },
  successRate: {
    type: Number,
    default: 0
  },
  aiScore: {
    type: Number,
    default: 0
  },
  mockInterviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get user without password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Method to calculate profile completion percentage
userSchema.methods.calculateProfileCompletion = function() {
  let completion = 0;
  let totalFields = 0;

  // Basic info (20%)
  totalFields += 4;
  if (this.firstname) completion += 1;
  if (this.lastname) completion += 1;
  if (this.email) completion += 1;
  if (this.contactNumber) completion += 1;

  // Resume (30%)
  totalFields += 1;
  if (this.resumeUploaded) completion += 1;

  // Skills (20%)
  totalFields += 1;
  if (this.skills && this.skills.length > 0) completion += 1;

  // Portfolio (15%)
  totalFields += 1;
  if (this.portfolio && this.portfolio.trim() !== "") completion += 1;

  // Job Description (15%)
  totalFields += 1;
  if (this.jobDescription) completion += 1;

  return Math.round((completion / totalFields) * 100);
};

export default mongoose.model('User', userSchema); 