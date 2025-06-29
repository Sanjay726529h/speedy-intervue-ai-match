import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const companySchema = new mongoose.Schema({
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
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: [String],
    default: []
  },
  jobPostings: {
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
companySchema.pre('save', async function(next) {
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
companySchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get company without password
companySchema.methods.toJSON = function() {
  const company = this.toObject();
  delete company.password;
  return company;
};

export default mongoose.model('Company', companySchema); 