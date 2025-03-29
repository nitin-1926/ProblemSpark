'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquarePlus } from 'lucide-react';

interface CommentFormProps {
	onAddComment: (comment: string) => void;
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
	const [comment, setComment] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!comment.trim()) return;

		setIsSubmitting(true);

		try {
			// In a real app, this would be an API call
			await new Promise(resolve => setTimeout(resolve, 500));

			onAddComment(comment);
			setComment('');
		} catch (error) {
			console.error('Error adding comment:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Textarea
				placeholder="Share a comment or solution..."
				value={comment}
				onChange={e => setComment(e.target.value)}
				className="min-h-24 bg-gray-800 border-gray-700 focus:border-primary"
			/>

			<Button type="submit" disabled={!comment.trim() || isSubmitting} className="bg-primary hover:bg-primary/90">
				<MessageSquarePlus className="mr-2 h-4 w-4" />
				{isSubmitting ? 'Posting...' : 'Post Comment'}
			</Button>
		</form>
	);
}
