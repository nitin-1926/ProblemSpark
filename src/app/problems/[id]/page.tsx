'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import VoteButtons from '@/components/VoteButtons';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Author {
	id: number;
	name: string | null;
	email: string;
}

interface Comment {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	author: Author;
	replies: Comment[];
}

interface ProblemDetail {
	id: number;
	title: string;
	description: string;
	industry: string;
	solutionLink: string | null;
	createdAt: string;
	updatedAt: string;
	author: Author;
	upvotes: number;
	downvotes: number;
	comments: Comment[];
}

export default function ProblemDetails() {
	const params = useParams();
	const router = useRouter();
	const { data: session, status } = useSession();
	const [problem, setProblem] = useState<ProblemDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchProblem = async () => {
			try {
				const response = await fetch(`/api/problems/${params.id}`);

				if (!response.ok) {
					if (response.status === 404) {
						setError('Problem not found');
					} else {
						setError('An error occurred while fetching the problem');
					}
					return;
				}

				const data = await response.json();
				setProblem(data);
			} catch (err) {
				setError('Failed to load problem details');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProblem();
	}, [params.id]);

	const handleVote = async (voteType: 'upvote' | 'downvote') => {
		if (!problem || !session) return;

		try {
			// In a complete implementation, we would make an API call to record the vote
			// For now, we'll just update the UI optimistically
			setProblem(prev => {
				if (!prev) return prev;

				return {
					...prev,
					upvotes: voteType === 'upvote' ? prev.upvotes + 1 : prev.upvotes,
					downvotes: voteType === 'downvote' ? prev.downvotes + 1 : prev.downvotes,
				};
			});
		} catch (error) {
			console.error('Error voting:', error);
		}
	};

	const handleAddComment = async (content: string) => {
		if (!problem || !session) return;

		try {
			// In a complete implementation, we would make an API call to add the comment
			// For now, we'll simulate adding a comment locally
			const newComment: Comment = {
				id: Math.floor(Math.random() * 1000), // Temporary ID for demo
				content,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				author: {
					id: parseInt(session.user.id),
					name: session.user.name || null,
					email: session.user.email || '',
				},
				replies: [],
			};

			setProblem(prev => {
				if (!prev) return prev;

				return {
					...prev,
					comments: [newComment, ...prev.comments],
				};
			});
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error || !problem) {
		return (
			<div className="text-center py-16">
				<h2 className="text-2xl font-bold mb-4">{error || 'Problem not found'}</h2>
				<Button onClick={() => router.push('/explore')} className="mt-4">
					Back to Explore
				</Button>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto animate-fade-in">
			<Button variant="ghost" onClick={() => router.push('/explore')} className="mb-6 hover:bg-gray-800">
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
								Posted on {new Date(problem.createdAt).toLocaleDateString()}
							</span>
						</div>
						<h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
						<div className="text-gray-400 text-sm mb-4">Posted by {problem.author.name || 'Anonymous'}</div>
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

				{session ? (
					<CommentForm onAddComment={handleAddComment} />
				) : (
					<div className="p-4 bg-gray-800 rounded-lg mb-6">
						<p className="text-gray-400">
							Please{' '}
							<Button variant="link" onClick={() => router.push('/login')} className="p-0 h-auto">
								log in
							</Button>{' '}
							to add a comment.
						</p>
					</div>
				)}

				<div className="mt-8">
					{problem.comments.length > 0 ? (
						<CommentList comments={problem.comments.map(comment => comment.content)} />
					) : (
						<p className="text-gray-400 text-center py-4">
							No comments yet. Be the first to share your thoughts!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
