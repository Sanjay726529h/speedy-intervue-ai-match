import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import User from './models/User.js';
import Company from './models/Company.js';
import Interviewer from './models/Interviewer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config.env') });

async function migrateUsers() {
  try {
    console.log('🔄 Starting User Migration...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if there's an existing users collection with the old schema
    const collections = await mongoose.connection.db.listCollections().toArray();
    const hasOldUsersCollection = collections.some(col => col.name === 'users');
    
    if (!hasOldUsersCollection) {
      console.log('ℹ️  No existing users collection found. Migration not needed.');
      return;
    }

    // Get the old User model (with type field) - use a different name to avoid conflicts
    const OldUserSchema = new mongoose.Schema({
      email: String,
      password: String,
      type: String,
      firstname: String,
      lastname: String,
      fullname: String,
      company: String,
      industry: [String],
      jobPostings: [String],
      jobTitle: String,
      department: String,
      interviewsScheduled: [String],
      skills: [String],
      experience: String,
      education: [{
        degree: String,
        university: String,
        yearOfGraduation: String
      }],
      resume: String,
      appliedJobs: [String],
      contactNumber: String,
      location: {
        city: String,
        country: String
      },
      createdAt: Date
    });

    // Only create the model if it doesn't exist
    let OldUser;
    try {
      OldUser = mongoose.model('OldUser');
    } catch (error) {
      OldUser = mongoose.model('OldUser', OldUserSchema, 'users'); // Use existing collection name
    }

    // Get all users from the old collection
    const oldUsers = await OldUser.find({});
    console.log(`📊 Found ${oldUsers.length} users to migrate`);

    if (oldUsers.length === 0) {
      console.log('ℹ️  No users found in old collection. Migration not needed.');
      return;
    }

    let migratedCount = 0;
    let skippedCount = 0;

    for (const oldUser of oldUsers) {
      try {
        // Check if user already exists in new collections
        const existingUser = await User.findOne({ email: oldUser.email });
        const existingCompany = await Company.findOne({ email: oldUser.email });
        const existingInterviewer = await Interviewer.findOne({ email: oldUser.email });

        if (existingUser || existingCompany || existingInterviewer) {
          console.log(`⏭️  Skipping ${oldUser.email} - already exists in new collections`);
          skippedCount++;
          continue;
        }

        // Migrate based on type
        switch (oldUser.type) {
          case 'user':
            // Migrate to User collection (candidates)
            const newUser = new User({
              email: oldUser.email,
              password: oldUser.password,
              firstname: oldUser.firstname || '',
              lastname: oldUser.lastname || '',
              skills: oldUser.skills || [],
              experience: oldUser.experience,
              education: oldUser.education || [],
              resume: oldUser.resume,
              appliedJobs: oldUser.appliedJobs || [],
              contactNumber: oldUser.contactNumber,
              location: oldUser.location,
              createdAt: oldUser.createdAt
            });
            await newUser.save();
            console.log(`✅ Migrated candidate: ${oldUser.email}`);
            break;

          case 'company':
            // Migrate to Company collection
            const newCompany = new Company({
              email: oldUser.email,
              password: oldUser.password,
              fullname: oldUser.fullname || oldUser.company || '',
              company: oldUser.company || oldUser.fullname || '',
              industry: oldUser.industry || [],
              jobPostings: oldUser.jobPostings || [],
              contactNumber: oldUser.contactNumber,
              location: oldUser.location,
              createdAt: oldUser.createdAt
            });
            await newCompany.save();
            console.log(`✅ Migrated company: ${oldUser.email}`);
            break;

          case 'interviewer':
            // Migrate to Interviewer collection
            const newInterviewer = new Interviewer({
              email: oldUser.email,
              password: oldUser.password,
              firstname: oldUser.firstname || '',
              lastname: oldUser.lastname || '',
              jobTitle: oldUser.jobTitle,
              department: oldUser.department,
              interviewsScheduled: oldUser.interviewsScheduled || [],
              contactNumber: oldUser.contactNumber,
              location: oldUser.location,
              createdAt: oldUser.createdAt
            });
            await newInterviewer.save();
            console.log(`✅ Migrated interviewer: ${oldUser.email}`);
            break;

          default:
            console.log(`⚠️  Unknown user type for ${oldUser.email}: ${oldUser.type}`);
            skippedCount++;
        }

        migratedCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate ${oldUser.email}:`, error.message);
        skippedCount++;
      }
    }

    console.log('\n📈 Migration Summary:');
    console.log(`✅ Successfully migrated: ${migratedCount} users`);
    console.log(`⏭️  Skipped: ${skippedCount} users`);
    console.log(`📊 Total processed: ${oldUsers.length} users`);

    console.log('\n🎉 Migration completed!');
    console.log('⚠️  Note: Old users collection still exists. You can delete it after verifying the migration.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

migrateUsers(); 