'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function SignUp() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
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

		// Basic validation
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			setError('Password must be at least 6 characters');
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'An error occurred during registration');
			}

			// Redirect to login
			router.push('/login?registered=true');
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An error occurred. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-16 p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800 animate-fade-in">
			<h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
				Sign Up for ProblemSpark
			</h1>

			{error && (
				<div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						type="text"
						name="name"
						placeholder="John Doe"
						value={formData.name}
						onChange={handleChange}
						className="bg-gray-800 border-gray-700"
					/>
				</div>

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

				<div className="space-y-2">
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						placeholder="••••••••"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						className="bg-gray-800 border-gray-700"
					/>
				</div>

				<Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
					{isLoading ? 'Creating account...' : 'Sign Up'}
				</Button>
			</form>

			<div className="mt-6 text-center text-sm text-gray-400">
				Already have an account?{' '}
				<Link href="/login" className="text-primary hover:underline">
					Log In
				</Link>
			</div>
		</div>
	);
}
