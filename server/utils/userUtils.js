import User from '../models/User.js';
import Company from '../models/Company.js';
import Interviewer from '../models/Interviewer.js';

// Find user by email across all collections
export const findUserByEmail = async (email) => {
  // Check in User collection (candidates)
  let user = await User.findOne({ email });
  if (user) return { user, role: 'candidate', collection: 'User' };

  // Check in Company collection
  user = await Company.findOne({ email });
  if (user) return { user, role: 'company', collection: 'Company' };

  // Check in Interviewer collection
  user = await Interviewer.findOne({ email });
  if (user) return { user, role: 'interviewer', collection: 'Interviewer' };

  return null;
};

// Find user by ID across all collections
export const findUserById = async (userId) => {
  // Try User collection first
  let user = await User.findById(userId);
  if (user) return { user, role: 'candidate', collection: 'User' };

  // Try Company collection
  user = await Company.findById(userId);
  if (user) return { user, role: 'company', collection: 'Company' };

  // Try Interviewer collection
  user = await Interviewer.findById(userId);
  if (user) return { user, role: 'interviewer', collection: 'Interviewer' };

  return null;
};

// Create user based on role
export const createUserByRole = async (userData, role) => {
  // First check if email already exists in any collection
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  switch (role) {
    case 'candidate':
      const candidate = new User({
        email: userData.email,
        password: userData.password,
        firstname: userData.name.trim(),
        lastname: '' // Allow empty lastname
      });
      return await candidate.save();

    case 'company':
      const company = new Company({
        email: userData.email,
        password: userData.password,
        fullname: userData.name.trim(),
        company: userData.name.trim()
      });
      return await company.save();

    case 'interviewer':
      const interviewer = new Interviewer({
        email: userData.email,
        password: userData.password,
        firstname: userData.name.trim(),
        lastname: '' // Allow empty lastname
      });
      return await interviewer.save();

    default:
      throw new Error('Invalid role');
  }
};

// Get display name based on user type
export const getDisplayName = (user, role) => {
  switch (role) {
    case 'company':
      return user.fullname || user.company;
    case 'candidate':
    case 'interviewer':
      return `${user.firstname || ''} ${user.lastname || ''}`.trim();
    default:
      return '';
  }
}; 