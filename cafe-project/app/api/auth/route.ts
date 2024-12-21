import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { Url } from 'next/dist/shared/lib/router/router';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const admin = await findAdminByUsername(username); // Replace with your DB query

  if (admin && bcrypt.compareSync(password, admin.password)) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}

export async function GET() {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db();
    
    const menuItems = await db.collection('menuItems').find().toArray();
    return NextResponse.json(menuItems);
}