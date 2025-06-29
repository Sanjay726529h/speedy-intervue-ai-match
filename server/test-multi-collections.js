import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { findUserByEmail, createUserByRole, findUserById } from './utils/userUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config.env') });

async function testMultiCollections() {
  try {
    console.log('Testing Multi-Collection User System...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create users in different collections
    console.log('\n📝 Creating test users...');
    
    const testUsers = [
      { email: 'candidate@test.com', password: 'password123', name: 'John Doe', role: 'candidate' },
      { email: 'company@test.com', password: 'password123', name: 'Tech Corp', role: 'company' },
      { email: 'interviewer@test.com', password: 'password123', name: 'Jane Smith', role: 'interviewer' }
    ];

    for (const userData of testUsers) {
      try {
        const user = await createUserByRole(userData, userData.role);
        console.log(`✅ Created ${userData.role}: ${userData.email}`);
      } catch (error) {
        console.log(`❌ Failed to create ${userData.role}: ${error.message}`);
      }
    }

    // Test 2: Find users by email across collections
    console.log('\n🔍 Testing findUserByEmail...');
    
    for (const userData of testUsers) {
      const result = await findUserByEmail(userData.email);
      if (result) {
        console.log(`✅ Found ${result.role} user: ${result.user.email} in ${result.collection} collection`);
      } else {
        console.log(`❌ User not found: ${userData.email}`);
      }
    }

    // Test 3: Test duplicate email prevention
    console.log('\n🚫 Testing duplicate email prevention...');
    try {
      await createUserByRole(testUsers[0], 'company'); // Try to create company with same email as candidate
      console.log('❌ Should have failed - duplicate email allowed');
    } catch (error) {
      console.log('✅ Duplicate email correctly prevented');
    }

    // Test 4: Find users by ID
    console.log('\n🆔 Testing findUserById...');
    for (const userData of testUsers) {
      const emailResult = await findUserByEmail(userData.email);
      if (emailResult) {
        const idResult = await findUserById(emailResult.user._id);
        if (idResult) {
          console.log(`✅ Found user by ID: ${idResult.role} in ${idResult.collection} collection`);
        } else {
          console.log(`❌ User not found by ID: ${userData.email}`);
        }
      }
    }

    console.log('\n🎉 Multi-collection tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

testMultiCollections(); 