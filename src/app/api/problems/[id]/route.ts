import { NextResponse } from 'next/server';
import type { Problem } from '@/lib/types';
import { dummyProblems } from '@/lib/dummyData';
import prisma from '@/lib/prisma';

// In-memory store for problems (in a real app, this would be a database)
const problems: Problem[] = [...dummyProblems];

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
		}

		const problem = await prisma.problem.findUnique({
			where: { id },
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
						upvotedBy: true,
						downvotedBy: true,
					},
				},
				comments: {
					include: {
						author: {
							select: {
								id: true,
								name: true,
								email: true,
							},
						},
						replies: {
							include: {
								author: {
									select: {
										id: true,
										name: true,
										email: true,
									},
								},
							},
						},
					},
					where: {
						parentId: null, // Only fetch top-level comments
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (!problem) {
			return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
		}

		// Format the response
		const formattedProblem = {
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
			comments: problem.comments.map(formatComment),
		};

		return NextResponse.json(formattedProblem);
	} catch (error) {
		console.error('Error fetching problem:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}

// Helper function to format comments recursively
function formatComment(comment: any) {
	return {
		id: comment.id,
		content: comment.content,
		createdAt: comment.createdAt,
		updatedAt: comment.updatedAt,
		author: {
			id: comment.author.id,
			name: comment.author.name,
			email: comment.author.email,
		},
		replies: comment.replies.map(formatComment),
	};
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const problemIndex = problems.findIndex(p => p.id === id);

		if (problemIndex === -1) {
			return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
		}

		const body = await request.json();
		const updatedProblem = {
			...problems[problemIndex],
			...body,
		};

		// Update in-memory store
		problems[problemIndex] = updatedProblem;

		return NextResponse.json(updatedProblem);
	} catch (error) {
		console.error('Error updating problem:', error);
		return NextResponse.json({ error: 'Failed to update problem' }, { status: 500 });
	}
}
