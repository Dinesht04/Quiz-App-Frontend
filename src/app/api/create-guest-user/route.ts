import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function generateGuestEmail(username: string): string {
  // Generate a unique email for guest users
  const timestamp = Date.now();
  return `${username.toLowerCase()}.guest.${timestamp}@quizverse.local`;
}

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 },
      );
    }

    const trimmedUsername = username.trim();

    // Validate username format
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      return NextResponse.json(
        { error: 'Username must be between 3 and 20 characters' },
        { status: 400 },
      );
    }

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

    // Double-check username availability
    const existingUser = await prisma.user.findFirst({
      where: {
        name: {
          equals: trimmedUsername,
          mode: 'insensitive',
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 },
      );
    }

    // Generate guest email and initials
    const guestEmail = generateGuestEmail(trimmedUsername);
    const initials = generateInitials(trimmedUsername);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name: trimmedUsername,
        email: guestEmail,
        image: initials, // Store initials as the image field
        emailVerified: null, // Guest users don't have verified emails
      },
    });

    // Return user data (excluding sensitive information)
    const userData = {
      id: newUser.id,
      name: newUser.name,
      image: newUser.image,
      initials: initials,
      isGuest: true,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json({
      success: true,
      user: userData,
      message: 'Guest user created successfully',
    });
  } catch (error) {
    console.error('Error creating guest user:', error);

    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
