import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const interviewerSchema = new mongoose.Schema({
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
  jobTitle: {
    type: String,
    default: null
  },
  department: {
    type: String,
    default: null
  },
  interviewsScheduled: {
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
interviewerSchema.pre('save', async function(next) {
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
interviewerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get interviewer without password
interviewerSchema.methods.toJSON = function() {
  const interviewer = this.toObject();
  delete interviewer.password;
  return interviewer;
};

export default mongoose.model('Interviewer', interviewerSchema); 