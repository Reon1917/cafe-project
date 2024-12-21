import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import { User } from '@/data/models';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }           
    );  
  }
}

export async function GET() {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db();
    
    const menuItems = await db.collection('menuItems').find().toArray();
    return NextResponse.json(menuItems);
}