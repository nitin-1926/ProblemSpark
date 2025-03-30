'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
	const [hasError, setHasError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			console.error('ErrorBoundary caught an error:', event.error);
			setHasError(true);

			// Handle NextAuth specific errors
			if (event.error?.toString().includes('JSON input')) {
				console.log('NextAuth JSON error detected, will refresh page');
				// Clear session storage & cookies for auth
				localStorage.removeItem('nextauth.message');

				// Wait a moment and then refresh
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}
		};

		window.addEventListener('error', handleError);

		return () => {
			window.removeEventListener('error', handleError);
		};
	}, []);

	if (hasError) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
				<h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
				<p className="text-gray-400 mb-6">We're sorry, but there was an error loading this page.</p>
				<div className="flex space-x-4">
					<Button
						onClick={() => {
							setHasError(false);
							router.refresh();
						}}
					>
						Try again
					</Button>
					<Button variant="outline" onClick={() => router.push('/')}>
						Go home
					</Button>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
