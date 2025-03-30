'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Check, DollarSign, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="animate-fade-in space-y-32 my-8">
			{/* Hero Section */}
			<section className="text-center space-y-6 py-12">
				<h1 className="text-4xl md:text-6xl !leading-[1.2] font-bold max-w-4xl mx-auto bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
					Discover Problems Worth Solving
					{/* <ContainerTextFlip className="mx-4" words={['problems', 'ideas']} /> */}
				</h1>
				<p className="text-xl text-gray-400 max-w-2xl mx-auto">
					Find inspiration for your next venture by exploring real-world problems validated by the community.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
					<Link href="/explore">
						<Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
							Explore Problems
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</Link>
				</div>
			</section>

			{/* Features */}
			<section className="grid md:grid-cols-3 gap-8 px-4">
				<div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
					<div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
						<Sparkles className="h-6 w-6 text-primary" />
					</div>
					<h3 className="text-xl font-bold mb-2">Discover Opportunities</h3>
					<p className="text-gray-400">
						Browse through a curated collection of real problems in various industries that are waiting to
						be solved.
					</p>
				</div>

				<div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
					<div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
						<Check className="h-6 w-6 text-primary" />
					</div>
					<h3 className="text-xl font-bold mb-2">Validate Ideas</h3>
					<p className="text-gray-400">
						Use community feedback and voting to identify which problems are worth solving before investing
						your time.
					</p>
				</div>

				<div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
					<div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
						<DollarSign className="h-6 w-6 text-primary" />
					</div>
					<h3 className="text-xl font-bold mb-2">Market Solutions</h3>
					<p className="text-gray-400">
						Have a solution in mind? Market your idea to the community and get feedback or users.
					</p>
				</div>
			</section>

			{/* How It Works */}
			<section className="text-center space-y-12">
				<div>
					<h2 className="text-3xl font-bold mb-4">How It Works</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						ProblemSpark helps you find and validate business ideas through a simple process:
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="space-y-4">
						<div className="text-3xl font-bold text-primary">01</div>
						<h3 className="text-xl font-bold">Discover Problems</h3>
						<p className="text-gray-400">
							Browse through problems submitted by the community or share your own observations.
						</p>
					</div>

					<div className="space-y-4">
						<div className="text-3xl font-bold text-primary">02</div>
						<h3 className="text-xl font-bold">Vote & Discuss</h3>
						<p className="text-gray-400">
							Upvote significant problems and participate in discussions to refine understanding.
						</p>
					</div>

					<div className="space-y-4">
						<div className="text-3xl font-bold text-primary">03</div>
						<h3 className="text-xl font-bold">Build Solutions</h3>
						<p className="text-gray-400">
							Find inspiration for your next venture based on validated problem statements.
						</p>
					</div>
				</div>

				<div className="pt-8">
					<Link href="/explore">
						<Button className="bg-primary hover:bg-primary/90">
							Start Exploring
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-12 rounded-2xl border border-gray-800 text-center space-y-6">
				<h2 className="text-3xl font-bold">Ready to find your next big idea?</h2>
				<p className="text-xl text-gray-300 max-w-2xl mx-auto">
					Join our community of problem-solvers and entrepreneurs today.
				</p>
				<div className="pt-4">
					<Link href="/signup">
						<Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
							Get Started for Free
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
