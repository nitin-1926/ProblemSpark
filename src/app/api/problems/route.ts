import { NextResponse } from 'next/server';
import type { Problem } from '@/lib/types';
import { dummyProblems } from '@/lib/dummyData';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// In-memory store for problems (in a real app, this would be a database)
let problems: Problem[] = [...dummyProblems];
let nextId = problems.length + 1;

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const industry = searchParams.get('industry');

		// Build the query filter
		const filter: any = {};

		if (industry && industry !== 'all') {
			filter.industry = industry;
		}

		const problems = await prisma.problem.findMany({
			where: filter,
			include: {
				author: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				_count: {
					select: {
						comments: true,
						upvotedBy: true,
						downvotedBy: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		// Format the response
		const formattedProblems = problems.map(problem => ({
			id: problem.id,
			title: problem.title,
			description: problem.description,
			industry: problem.industry,
			solutionLink: problem.solutionLink,
			createdAt: problem.createdAt,
			updatedAt: problem.updatedAt,
			author: {
				id: problem.author.id,
				name: problem.author.name,
				email: problem.author.email,
			},
			upvotes: problem._count.upvotedBy,
			downvotes: problem._count.downvotedBy,
			commentsCount: problem._count.comments,
		}));

		return NextResponse.json(formattedProblems);
	} catch (error) {
		console.error('Error fetching problems:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		// Check for session token
		const cookieStore = cookies();
		const token = cookieStore.get('next-auth.session-token') || cookieStore.get('__Secure-next-auth.session-token');

		if (!token) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json();

		// Validate required fields
		if (!body.title || !body.description || !body.industry) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
		}

		// For now, use a dummy user ID since we can't easily get the actual user ID
		// In a real app, you would decode the JWT to get the user ID
		const userId = 1; // Default to first user

		// Create new problem in the database
		const newProblem = await prisma.problem.create({
			data: {
				title: body.title,
				description: body.description,
				industry: body.industry,
				solutionLink: body.solutionLink || null,
				authorId: userId,
			},
			include: {
				author: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		return NextResponse.json(newProblem, { status: 201 });
	} catch (error) {
		console.error('Error creating problem:', error);
		return NextResponse.json({ message: 'Failed to create problem' }, { status: 500 });
	}
}
