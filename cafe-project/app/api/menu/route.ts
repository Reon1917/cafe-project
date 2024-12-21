import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
  const { name, description, price } = await req.json();
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db();
  
  const result = await db.collection('menuItems').insertOne({ name, description, price });
  
  client.close();
  return NextResponse.json(result, { status: 201 });
}
