import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { MenuItem } from '@/data/models';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, description, price, image, featured } = await req.json();
    
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      image,
      featured
    });
    
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating menu item' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching menu items' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    
    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(menuItem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating menu item' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();
    
    const menuItem = await MenuItem.findByIdAndDelete(id);
    
    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting menu item' },
      { status: 500 }
    );
  }
}
