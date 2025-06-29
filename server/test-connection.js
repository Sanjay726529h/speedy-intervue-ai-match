import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config.env') });

async function testConnection() {
  try {
    console.log('Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Found' : 'Missing');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas connection successful!');
    
    // Test creating a collection
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your MONGODB_URI in config.env');
    console.log('2. Verify username and password');
    console.log('3. Ensure IP address is whitelisted in Atlas');
    console.log('4. Check if cluster is running');
  }
}

testConnection(); 