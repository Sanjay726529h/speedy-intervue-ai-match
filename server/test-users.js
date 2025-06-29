import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config.env') });

async function testUsers() {
  try {
    console.log('Testing MongoDB Atlas connection and existing users...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas connection successful!');
    
    // Test finding existing users
    const db = mongoose.connection.db;
    
    // Check for existing collections
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    // Test finding users from each collection
    for (const collection of collections) {
      const users = await db.collection(collection.name).find({}).limit(3).toArray();
      console.log(`\n👥 Users in ${collection.name}:`, users.length);
      if (users.length > 0) {
        console.log('Sample user:', {
          id: users[0]._id,
          email: users[0].email,
          type: users[0].type,
          name: users[0].fullname || `${users[0].firstname} ${users[0].lastname}`.trim()
        });
      }
    }
    
    await mongoose.disconnect();
    console.log('\n✅ User test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testUsers(); 