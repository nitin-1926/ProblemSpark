'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Plus, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
	const { data: session, status } = useSession();
	const isAuthenticated = status === 'authenticated';

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/' });
	};

	return (
		<header className="sticky top-0 z-10 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
				<Link href="/" className="flex items-center gap-2">
					<Sparkles className="h-6 w-6 text-primary" />
					<span className="font-bold text-xl">ProblemSpark</span>
				</Link>

				<nav className="flex items-center gap-6">
					<Link href="/" className="text-gray-300 hover:text-white transition-colors hidden md:block">
						Explore
					</Link>
					<Link href="#" className="text-gray-300 hover:text-white transition-colors hidden md:block">
						About
					</Link>

					{isAuthenticated ? (
						<>
							<Link href="/submit">
								<Button className="bg-primary hover:bg-primary/90">
									<Plus className="mr-2 h-4 w-4" />
									Submit Problem
								</Button>
							</Link>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon" className="rounded-full">
										<User className="h-5 w-5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Link href="/profile" className="w-full">
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleSignOut}>
										<LogOut className="mr-2 h-4 w-4" />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<div className="flex items-center gap-3">
							<Link href="/login">
								<Button variant="outline" className="border-gray-700 hover:bg-gray-800">
									Log in
								</Button>
							</Link>
							<Link href="/signup">
								<Button className="bg-primary hover:bg-primary/90">Sign up</Button>
							</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
