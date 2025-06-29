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

export default mongoose.model('User', userSchema); 