'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
	const { status } = useSession();
	const isAuthenticated = status === 'authenticated';

	return (
		<header className="sticky top-0 z-10 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
				<Link href="/" className="flex items-center gap-2">
					<Sparkles className="h-6 w-6 text-primary" />
					<span className="font-bold text-xl">ProblemSpark</span>
				</Link>

				<nav className="flex items-center gap-6">
					{isAuthenticated ? (
						<Link href="/dashboard">
							<Button className="bg-primary hover:bg-primary/90">Dashboard</Button>
						</Link>
					) : (
						<div className="flex items-center gap-3">
							<Link href="/login">
								<Button variant="outline" className="border-gray-700 hover:bg-gray-800">
									Sign in
								</Button>
							</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
