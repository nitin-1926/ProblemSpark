'use client';

import { useState, useEffect } from 'react';
import ProblemCard from '@/components/ProblemCard';
import SortingOptions from '@/components/SortingOptions';
import FilterOptions from '@/components/FilterOptions';
import type { Problem } from '@/lib/types';
import { dummyProblems } from '@/lib/dummyData';
import { Search } from 'lucide-react';

export default function Home() {
	const [problems, setProblems] = useState<Problem[]>([]);
	const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
	const [sortOption, setSortOption] = useState<string>('popular');
	const [industryFilter, setIndustryFilter] = useState<string>('all');
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		// In a real app, this would be an API call
		setProblems(dummyProblems);
		setFilteredProblems(dummyProblems);
	}, []);

	useEffect(() => {
		let result = [...problems];

		// Apply industry filter
		if (industryFilter !== 'all') {
			result = result.filter(problem => problem.industry === industryFilter);
		}

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				problem =>
					problem.title.toLowerCase().includes(query) || problem.description.toLowerCase().includes(query),
			);
		}

		// Apply sorting
		switch (sortOption) {
			case 'popular':
				result.sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes));
				break;
			case 'newest':
				result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
				break;
			case 'trending':
				// For demo purposes, trending is a mix of recency and popularity
				result.sort((a, b) => {
					const scoreA = b.upvotes - b.downvotes + new Date(b.timestamp).getTime() / 10000000000;
					const scoreB = a.upvotes - a.downvotes + new Date(a.timestamp).getTime() / 10000000000;
					return scoreA - scoreB;
				});
				break;
			default:
				break;
		}

		setFilteredProblems(result);
	}, [problems, sortOption, industryFilter, searchQuery]);

	const handleVote = (id: number, voteType: 'upvote' | 'downvote') => {
		setProblems(prevProblems =>
			prevProblems.map(problem => {
				if (problem.id === id) {
					if (voteType === 'upvote') {
						return { ...problem, upvotes: problem.upvotes + 1 };
					} else {
						return { ...problem, downvotes: problem.downvotes + 1 };
					}
				}
				return problem;
			}),
		);
	};

	return (
		<div className="space-y-8 animate-fade-in">
			<section className="text-center space-y-4 mb-12">
				<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
					Discover Problems Worth Solving
				</h1>
				<p className="text-xl text-gray-400 max-w-3xl mx-auto">
					Find inspiration for your next venture by exploring real-world problems validated by the community.
				</p>
			</section>

			<div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
				<div className="relative flex-1 max-w-md">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Search problems..."
						className="pl-10 w-full rounded-lg bg-gray-800 border-gray-700 text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<FilterOptions selectedIndustry={industryFilter} onSelectIndustry={setIndustryFilter} />
					<SortingOptions selectedOption={sortOption} onSelectOption={setSortOption} />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredProblems.map(problem => (
					<ProblemCard key={problem.id} problem={problem} onVote={handleVote} />
				))}
			</div>
		</div>
	);
}
