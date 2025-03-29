import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Problem } from '@/lib/types';
import VoteButtons from '@/components/VoteButtons';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface ProblemCardProps {
	problem: Problem;
	onVote: (id: number, voteType: 'upvote' | 'downvote') => void;
}

export default function ProblemCard({ problem, onVote }: ProblemCardProps) {
	const truncateDescription = (text: string, maxLength = 100) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	const handleVote = (voteType: 'upvote' | 'downvote') => {
		onVote(problem.id, voteType);
	};

	return (
		<Card className="bg-gray-900 border-gray-800 overflow-hidden hover:shadow-lg hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
			<CardContent className="p-6 flex-grow">
				<div className="flex justify-between items-start gap-4 mb-3">
					<span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800">{problem.industry}</span>
					<VoteButtons upvotes={problem.upvotes} downvotes={problem.downvotes} onVote={handleVote} compact />
				</div>

				<h3 className="text-xl font-bold mb-2 line-clamp-2">{problem.title}</h3>

				<p className="text-gray-400 mb-4">{truncateDescription(problem.description)}</p>

				<div className="flex items-center text-sm text-gray-500 mt-auto">
					<span className="flex items-center">
						<MessageSquare className="h-4 w-4 mr-1" />
						{problem.comments.length} comments
					</span>
					<span className="mx-2">•</span>
					<span>{new Date(problem.timestamp).toLocaleDateString()}</span>
				</div>
			</CardContent>

			<CardFooter className="p-6 pt-0 border-t border-gray-800">
				<Link
					href={`/problems/${problem.id}`}
					className="w-full inline-flex items-center justify-center text-primary hover:text-primary/90 font-medium transition-colors"
				>
					View Details
					<ArrowRight className="ml-2 h-4 w-4" />
				</Link>
			</CardFooter>
		</Card>
	);
}
