import { NextResponse } from 'next/server';
import type { Problem } from '@/lib/types';
import { dummyProblems } from '@/lib/dummyData';

// In-memory store for problems (in a real app, this would be a database)
const problems: Problem[] = [...dummyProblems];

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id);
	const problem = problems.find(p => p.id === id);

	if (!problem) {
		return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
	}

	return NextResponse.json(problem.comments);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const problemIndex = problems.findIndex(p => p.id === id);

		if (problemIndex === -1) {
			return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
		}

		const body = await request.json();

		if (!body.comment || typeof body.comment !== 'string') {
			return NextResponse.json({ error: 'Comment is required' }, { status: 400 });
		}

		// Add comment to problem
		problems[problemIndex].comments.push(body.comment);

		return NextResponse.json({ success: true, comments: problems[problemIndex].comments }, { status: 201 });
	} catch (error) {
		console.error('Error adding comment:', error);
		return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
	}
}
