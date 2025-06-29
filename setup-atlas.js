import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MongoDB Atlas Setup for SpeedyIntervue\n');

console.log('📋 Follow these steps:');
console.log('1. Go to https://mongodb.com/atlas');
console.log('2. Create a free account');
console.log('3. Create a new cluster (FREE tier)');
console.log('4. Set up database access (create username/password)');
console.log('5. Set up network access (allow from anywhere for development)');
console.log('6. Get your connection string\n');

rl.question('Enter your MongoDB Atlas connection string: ', (connectionString) => {
  if (!connectionString.includes('mongodb+srv://')) {
    console.log('❌ Invalid connection string. It should start with mongodb+srv://');
    rl.close();
    return;
  }

  // Add database name to connection string if not present
  if (!connectionString.includes('/speedy-intervue')) {
    connectionString = connectionString.replace('?', '/speedy-intervue?');
  }

  const configContent = `MONGODB_URI=${connectionString}
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000`;

  const configPath = path.join(__dirname, 'server', 'config.env');
  
  try {
    fs.writeFileSync(configPath, configContent);
    console.log('✅ Configuration saved to server/config.env');
    console.log('\n🔧 Next steps:');
    console.log('1. cd server');
    console.log('2. npm run test-connection');
    console.log('3. If successful, start the server with: npm run dev');
  } catch (error) {
    console.error('❌ Error saving configuration:', error.message);
  }
  
  rl.close();
}); 