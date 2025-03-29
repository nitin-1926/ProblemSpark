import type { Problem } from "./types"

export const industries = [
  "Tech",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Transportation",
  "Food",
  "Entertainment",
  "Environment",
  "Other",
]

export const dummyProblems: Problem[] = [
  {
    id: 1,
    title: "Lack of affordable healthcare for freelancers and gig workers",
    description:
      "Millions of freelancers and gig economy workers lack access to affordable healthcare options. Traditional insurance is too expensive, and many don't qualify for subsidies. This creates financial insecurity and prevents many from pursuing independent work.",
    industry: "Healthcare",
    upvotes: 42,
    downvotes: 3,
    comments: [
      "Check out Stride Health, they specialize in healthcare for independent workers.",
      "This is a huge problem. I pay over $800/month for basic coverage as a freelancer.",
    ],
    timestamp: "2025-03-15T14:30:00Z",
    solutionLink: "https://www.stridehealth.com",
  },
  {
    id: 2,
    title: "Inefficient remote work collaboration tools",
    description:
      "Current remote work tools are fragmented and don't integrate well with each other. Teams waste time switching between different apps for communication, project management, and file sharing. This reduces productivity and creates information silos.",
    industry: "Tech",
    upvotes: 38,
    downvotes: 5,
    comments: [],
    timestamp: "2025-03-20T09:15:00Z",
    solutionLink: null,
  },
  {
    id: 3,
    title: "Food waste in restaurants and grocery stores",
    description:
      "Restaurants and grocery stores throw away tons of edible food every day due to cosmetic imperfections, overstocking, or approaching expiration dates. This waste occurs while many people struggle with food insecurity.",
    industry: "Food",
    upvotes: 29,
    downvotes: 2,
    comments: [
      "Too Good To Go app is trying to solve this by connecting consumers with discounted food that would otherwise be thrown away.",
      "We need better logistics and distribution systems for food banks to collect this excess food.",
    ],
    timestamp: "2025-03-18T16:45:00Z",
    solutionLink: "https://toogoodtogo.com",
  },
  {
    id: 4,
    title: "Difficulty finding affordable mental health services",
    description:
      "Mental health services are expensive and often not covered adequately by insurance. Many people who need therapy or counseling can't afford it, leading to untreated mental health issues and reduced quality of life.",
    industry: "Healthcare",
    upvotes: 56,
    downvotes: 1,
    comments: [
      "BetterHelp and similar online therapy platforms are making therapy more accessible, but they're still too expensive for many people.",
    ],
    timestamp: "2025-03-22T11:20:00Z",
    solutionLink: null,
  },
  {
    id: 5,
    title: "Lack of affordable childcare options for working parents",
    description:
      "Childcare costs are prohibitively expensive for many families, often consuming a significant portion of household income. This forces some parents to leave the workforce, reducing family earnings and career advancement opportunities.",
    industry: "Education",
    upvotes: 47,
    downvotes: 3,
    comments: [],
    timestamp: "2025-03-17T13:10:00Z",
    solutionLink: null,
  },
  {
    id: 6,
    title: "Inefficient public transportation in mid-sized cities",
    description:
      "Mid-sized cities often have inadequate public transportation systems, forcing residents to rely on cars. This increases traffic congestion, pollution, and transportation costs, while limiting mobility for those who can't drive or afford vehicles.",
    industry: "Transportation",
    upvotes: 31,
    downvotes: 7,
    comments: [
      "Micro-mobility solutions like e-bikes and scooters are helping in some cities, but we need better infrastructure to support them.",
    ],
    timestamp: "2025-03-19T10:05:00Z",
    solutionLink: null,
  },
  {
    id: 7,
    title: "Difficulty tracking and managing personal finances",
    description:
      "Many people struggle to track their spending, save money, and plan for financial goals. Existing financial apps are often too complex, don't provide actionable insights, or don't address the emotional aspects of financial decisions.",
    industry: "Finance",
    upvotes: 35,
    downvotes: 4,
    comments: [],
    timestamp: "2025-03-21T15:30:00Z",
    solutionLink: null,
  },
  {
    id: 8,
    title: "Limited access to affordable housing in urban areas",
    description:
      "Housing costs in major cities have skyrocketed, making it difficult for middle and low-income residents to find affordable places to live. This leads to long commutes, financial strain, and community displacement.",
    industry: "Other",
    upvotes: 62,
    downvotes: 2,
    comments: [
      "Co-living spaces like Common and Starcity are addressing this for young professionals, but we need solutions for families too.",
    ],
    timestamp: "2025-03-16T09:45:00Z",
    solutionLink: "https://www.common.com",
  },
  {
    id: 9,
    title: "Plastic waste in product packaging",
    description:
      "Excessive plastic packaging contributes to environmental pollution and waste. Consumers want sustainable alternatives, but eco-friendly packaging options are limited and often more expensive for businesses to implement.",
    industry: "Environment",
    upvotes: 41,
    downvotes: 3,
    comments: [
      "Loop is trying to bring back reusable packaging systems, but it's still very limited in scope.",
      "We need policy changes to incentivize companies to use sustainable packaging.",
    ],
    timestamp: "2025-03-23T14:15:00Z",
    solutionLink: "https://loopstore.com",
  },
  {
    id: 10,
    title: "Difficulty finding reliable home service providers",
    description:
      "Finding trustworthy and skilled contractors, plumbers, electricians, and other home service providers is challenging. Reviews can be manipulated, and there's little transparency about pricing and quality of work.",
    industry: "Other",
    upvotes: 33,
    downvotes: 5,
    comments: [],
    timestamp: "2025-03-24T11:50:00Z",
    solutionLink: null,
  },
]

