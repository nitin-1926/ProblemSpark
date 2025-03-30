import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json();

		// Validate inputs
		if (!email || !password) {
			return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json({ message: 'User already exists with this email' }, { status: 409 });
		}

		// Hash password
		const hashedPassword = await hash(password, 10);

		// Create user
		const user = await prisma.user.create({
			data: {
				name: name || null,
				email,
				password: hashedPassword,
			},
		});

		// Return user without password
		return NextResponse.json(
			{
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('Signup error:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
