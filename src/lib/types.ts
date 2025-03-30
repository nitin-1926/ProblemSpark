export interface Problem {
	id: number;
	title: string;
	description: string;
	industry: string;
	upvotes: number;
	downvotes: number;
	comments: string[];
	timestamp: string;
	solutionLink: string | null;
}
