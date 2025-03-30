'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthError() {
	const searchParams = useSearchParams();
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		const error = searchParams.get('error');
		let message = 'An authentication error occurred';

		// Handle specific error types
		if (error === 'CredentialsSignin') {
			message = 'Invalid email or password';
		} else if (error === 'SessionRequired') {
			message = 'You must be signed in to access this page';
		} else if (error) {
			message = `Authentication error: ${error}`;
		}

		setErrorMessage(message);
	}, [searchParams]);

	return (
		<div className="max-w-md mx-auto mt-16 p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
			<h1 className="text-2xl font-bold mb-6 text-center text-red-400">Authentication Error</h1>

			<div className="mb-8 p-4 bg-red-900/50 border border-red-800 rounded-lg text-red-200">{errorMessage}</div>

			<div className="flex justify-center space-x-4">
				<Button asChild variant="outline">
					<Link href="/login">Back to Login</Link>
				</Button>

				<Button asChild>
					<Link href="/">Go to Home</Link>
				</Button>
			</div>
		</div>
	);
}
