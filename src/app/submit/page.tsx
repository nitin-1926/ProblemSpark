'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { industries } from '@/lib/dummyData';
import { useSession } from 'next-auth/react';

export default function SubmitProblem() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		industry: '',
		solutionLink: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');

	// Redirect to login if not authenticated
	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login?callbackUrl=/submit');
		}
	}, [status, router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleIndustryChange = (value: string) => {
		setFormData(prev => ({ ...prev, industry: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			// Submit to the API
			const response = await fetch('/api/problems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: formData.title,
					description: formData.description,
					industry: formData.industry,
					solutionLink: formData.solutionLink || null,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to submit problem');
			}

			// Redirect to the explore page
			router.push('/explore');
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An error occurred. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	if (status === 'loading') {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		return null; // Will redirect in useEffect
	}

	return (
		<div className="max-w-2xl mx-auto animate-fade-in">
			<h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
				Submit a Problem
			</h1>

			{error && (
				<div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded-lg text-red-200">{error}</div>
			)}

			<div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="title">Problem Title</Label>
						<Input
							id="title"
							name="title"
							placeholder="E.g., Lack of affordable healthcare"
							value={formData.title}
							onChange={handleChange}
							required
							className="bg-gray-800 border-gray-700"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="description"
							placeholder="Describe the problem in detail. Who does it affect? Why is it important?"
							value={formData.description}
							onChange={handleChange}
							required
							className="min-h-32 bg-gray-800 border-gray-700"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="industry">Industry</Label>
						<Select value={formData.industry} onValueChange={handleIndustryChange} required>
							<SelectTrigger className="bg-gray-800 border-gray-700">
								<SelectValue placeholder="Select an industry" />
							</SelectTrigger>
							<SelectContent>
								{industries.map(industry => (
									<SelectItem key={industry} value={industry}>
										{industry}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="solutionLink">Existing Solution Link (Optional)</Label>
						<Input
							id="solutionLink"
							name="solutionLink"
							placeholder="E.g., https://example.com"
							value={formData.solutionLink}
							onChange={handleChange}
							className="bg-gray-800 border-gray-700"
						/>
					</div>

					<div className="flex justify-end gap-4 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push('/explore')}
							className="border-gray-700 hover:bg-gray-800"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
							{isSubmitting ? 'Submitting...' : 'Submit Problem'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
