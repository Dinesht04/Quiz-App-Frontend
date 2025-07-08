import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 },
      );
    }

    // Validate username format
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      return NextResponse.json(
        { error: 'Username must be between 3 and 20 characters' },
        { status: 400 },
      );
    }

    // Check if username contains only allowed characters (letters, numbers, underscores, hyphens)
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return NextResponse.json(
        {
          error:
            'Username can only contain letters, numbers, underscores, and hyphens',
        },
        { status: 400 },
      );
    }

    // Check if username exists in database (case-insensitive)
    const existingUser = await prisma.user.findFirst({
      where: {
        name: {
          equals: trimmedUsername,
          mode: 'insensitive',
        },
      },
    });

    const available = !existingUser;

    return NextResponse.json({
      available,
      username: trimmedUsername,
    });
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
