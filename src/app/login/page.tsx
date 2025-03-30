'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Login() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const res = await signIn('credentials', {
				email: formData.email,
				password: formData.password,
				redirect: true,
				callbackUrl,
			});

			// Note: This code will only run if redirect: false is set above
			if (res?.error) {
				setError('Invalid email or password');
			} else {
				router.push(callbackUrl);
				router.refresh();
			}
		} catch (error) {
			setError('An error occurred. Please try again.');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-16 p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800 animate-fade-in">
			<h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
				Log In to ProblemSpark
			</h1>

			{error && (
				<div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="you@example.com"
						value={formData.email}
						onChange={handleChange}
						required
						className="bg-gray-800 border-gray-700"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder="••••••••"
						value={formData.password}
						onChange={handleChange}
						required
						className="bg-gray-800 border-gray-700"
					/>
				</div>

				<Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
					{isLoading ? 'Logging in...' : 'Log In'}
				</Button>
			</form>

			<div className="mt-6 text-center text-sm text-gray-400">
				Don't have an account?{' '}
				<Link href="/signup" className="text-primary hover:underline">
					Sign Up
				</Link>
			</div>
		</div>
	);
}
