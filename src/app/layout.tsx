import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/components/providers/AuthProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ProblemSpark | Discover Problems Worth Solving',
	description: 'A platform for entrepreneurs to discover and validate business ideas through community feedback',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
				<ErrorBoundary>
					<AuthProvider>
						<Header />
						<main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>
					</AuthProvider>
				</ErrorBoundary>
			</body>
		</html>
	);
}

import './globals.css';
