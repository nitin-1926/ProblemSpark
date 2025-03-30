'use client';

import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface VoteButtonsProps {
	upvotes: number;
	downvotes: number;
	onVote: (voteType: 'upvote' | 'downvote') => void;
	vertical?: boolean;
	compact?: boolean;
}

export default function VoteButtons({
	upvotes,
	downvotes,
	onVote,
	vertical = false,
	compact = false,
}: VoteButtonsProps) {
	const voteCount = upvotes - downvotes;
	const voteColor = voteCount > 0 ? 'text-green-500' : voteCount < 0 ? 'text-red-500' : 'text-gray-400';

	const containerClass = vertical ? 'flex flex-col items-center gap-1' : 'flex items-center gap-1';

	const buttonSize = compact ? 'h-8 w-8' : 'h-9 w-9';

	return (
		<div className={containerClass}>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => onVote('upvote')}
				className={`${buttonSize} hover:bg-green-500/10 hover:text-green-500 transition-colors`}
			>
				<ChevronUp className="h-5 w-5" />
			</Button>

			<span className={`font-medium ${voteColor} ${compact ? 'text-sm' : 'text-base'}`}>{voteCount}</span>

			<Button
				variant="ghost"
				size="icon"
				onClick={() => onVote('downvote')}
				className={`${buttonSize} hover:bg-red-500/10 hover:text-red-500 transition-colors`}
			>
				<ChevronDown className="h-5 w-5" />
			</Button>
		</div>
	);
}
