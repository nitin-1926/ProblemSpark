'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Problem } from '@/lib/types';
import { dummyProblems } from '@/lib/dummyData';
import VoteButtons from '@/components/VoteButtons';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProblemDetails() {
	const params = useParams();
	const router = useRouter();
	const [problem, setProblem] = useState<Problem | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// In a real app, this would be an API call
		const id = Number(params.id);
		const foundProblem = dummyProblems.find(p => p.id === id);

		if (foundProblem) {
			setProblem(foundProblem);
		}

		setLoading(false);
	}, [params.id]);

	const handleVote = (voteType: 'upvote' | 'downvote') => {
		if (!problem) return;

		setProblem(prev => {
			if (!prev) return prev;

			if (voteType === 'upvote') {
				return { ...prev, upvotes: prev.upvotes + 1 };
			} else {
				return { ...prev, downvotes: prev.downvotes + 1 };
			}
		});
	};

	const handleAddComment = (comment: string) => {
		if (!problem) return;

		setProblem(prev => {
			if (!prev) return prev;

			return {
				...prev,
				comments: [...prev.comments, comment],
			};
		});
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (!problem) {
		return (
			<div className="text-center py-16">
				<h2 className="text-2xl font-bold mb-4">Problem not found</h2>
				<Button onClick={() => router.push('/')} className="mt-4">
					Back to Home
				</Button>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto animate-fade-in">
			<Button variant="ghost" onClick={() => router.push('/')} className="mb-6 hover:bg-gray-800">
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Problems
			</Button>

			<div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 mb-8">
				<div className="flex justify-between items-start gap-4 mb-6">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800">
								{problem.industry}
							</span>
							<span className="text-gray-400 text-sm">
								Posted on {new Date(problem.timestamp).toLocaleDateString()}
							</span>
						</div>
						<h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
					</div>

					<VoteButtons upvotes={problem.upvotes} downvotes={problem.downvotes} onVote={handleVote} vertical />
				</div>

				<div className="prose prose-invert max-w-none mb-6">
					<p className="text-gray-300 whitespace-pre-line">{problem.description}</p>
				</div>

				{problem.solutionLink && (
					<div className="mt-6 p-4 bg-gray-800 rounded-lg">
						<h3 className="text-sm font-medium text-gray-400 mb-2">Existing Solution Link:</h3>
						<a
							href={problem.solutionLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline flex items-center"
						>
							{problem.solutionLink}
							<ExternalLink className="ml-2 h-4 w-4" />
						</a>
					</div>
				)}
			</div>

			<div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
				<h2 className="text-xl font-bold mb-6">Comments & Solutions</h2>

				<CommentForm onAddComment={handleAddComment} />

				<div className="mt-8">
					<CommentList comments={problem.comments} />
				</div>
			</div>
		</div>
	);
}
