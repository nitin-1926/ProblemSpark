'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import ProblemCard from '@/components/ProblemCard';
import { ArrowLeft } from 'lucide-react';
import { Problem } from '@/lib/types';

export default function ProfilePage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [userProblems, setUserProblems] = useState<Problem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Redirect if not logged in
	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login?callbackUrl=/profile');
		}
	}, [status, router]);

	// Fetch user's problems
	useEffect(() => {
		const fetchUserProblems = async () => {
			if (status !== 'authenticated' || !session?.user?.id) return;

			try {
				setIsLoading(true);
				const response = await fetch(`/api/users/${session.user.id}/problems`);

				if (response.ok) {
					const data = await response.json();
					// Transform data to match Problem type if necessary
					setUserProblems(data);
				}
			} catch (error) {
				console.error('Error fetching user problems:', error);
			} finally {
				setIsLoading(false);
			}
		};

		// For now we'll simulate this with empty problems
		// In a real implementation, you'd fetch from the API
		setIsLoading(false);
		setUserProblems([]);

		// Uncomment when API endpoint is ready
		// fetchUserProblems();
	}, [session, status]);

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
		<div className="space-y-8 animate-fade-in">
			<div className="mb-6">
				<Button variant="ghost" onClick={() => router.push('/explore')} className="hover:bg-gray-800">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Explore
				</Button>
			</div>

			<div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 mb-12">
				<h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
					My Profile
				</h1>

				<div className="mt-6 space-y-2">
					<div className="flex items-center gap-2">
						<span className="text-gray-400">Email:</span>
						<span>{session?.user?.email}</span>
					</div>

					<div className="flex items-center gap-2">
						<span className="text-gray-400">Name:</span>
						<span>{session?.user?.name || 'Not provided'}</span>
					</div>
				</div>
			</div>

			<h2 className="text-2xl font-bold mt-12 mb-6">My Submitted Problems</h2>

			{isLoading ? (
				<div className="flex justify-center items-center min-h-[200px]">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				</div>
			) : userProblems.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{userProblems.map(problem => (
						<ProblemCard
							key={problem.id}
							problem={problem}
							onVote={() => {}} // No voting on own problems
						/>
					))}
				</div>
			) : (
				<div className="text-center py-16 border border-gray-800 rounded-lg bg-gray-900">
					<h3 className="text-xl font-medium mb-4">You haven't submitted any problems yet.</h3>
					<p className="text-gray-400 mb-8">
						Share a challenge you've identified and get feedback from the community.
					</p>
					<Button onClick={() => router.push('/submit')} className="bg-primary hover:bg-primary/90">
						Submit Your First Problem
					</Button>
				</div>
			)}
		</div>
	);
}
