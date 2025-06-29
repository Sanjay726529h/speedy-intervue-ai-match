import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { createUserByRole, findUserByEmail } from './utils/userUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config.env') });

async function testSingleNames() {
  try {
    console.log('Testing Single Name Signup...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test users with single names
    const testUsers = [
      { email: 'john@test.com', password: 'password123', name: 'John', role: 'candidate' },
      { email: 'techcorp@test.com', password: 'password123', name: 'TechCorp', role: 'company' },
      { email: 'jane@test.com', password: 'password123', name: 'Jane', role: 'interviewer' }
    ];

    console.log('\n📝 Creating users with single names...');
    
    for (const userData of testUsers) {
      try {
        const user = await createUserByRole(userData, userData.role);
        console.log(`✅ Created ${userData.role} with single name: ${userData.name}`);
        
        // Verify the user was created correctly
        const foundUser = await findUserByEmail(userData.email);
        if (foundUser) {
          console.log(`   - Email: ${foundUser.user.email}`);
          console.log(`   - Name: ${foundUser.user.firstname || foundUser.user.fullname}`);
          console.log(`   - Lastname: "${foundUser.user.lastname || 'empty'}"`);
        }
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⏭️  User ${userData.email} already exists, skipping...`);
        } else {
          console.log(`❌ Failed to create ${userData.role}: ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Single name test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

testSingleNames(); 