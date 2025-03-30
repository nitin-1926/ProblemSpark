import { MessageSquare } from 'lucide-react';

interface CommentListProps {
	comments: string[];
}

export default function CommentList({ comments }: CommentListProps) {
	if (comments.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500">
				<MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
				<p>No comments yet. Be the first to share your thoughts!</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{comments.map((comment, index) => (
				<div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
							<span className="text-xs font-medium">U{index + 1}</span>
						</div>
						<span className="font-medium">User {index + 1}</span>
						<span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
					</div>
					<p className="text-gray-300">{comment}</p>
				</div>
			))}
		</div>
	);
}
