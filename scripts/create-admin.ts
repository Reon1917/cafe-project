import { config } from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { User } from '@/data/models';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

async function createAdmin() {
  try {
    // Set default admin credentials (you can modify these)
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123'; // You should change this

    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: defaultUsername });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    await User.create({
      username: defaultUsername,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log('Username:', defaultUsername);
    console.log('Password:', defaultPassword);
    console.log('Please change these credentials after first login');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 