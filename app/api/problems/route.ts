import { NextResponse } from "next/server"
import type { Problem } from "@/lib/types"
import { dummyProblems } from "@/lib/dummyData"

// In-memory store for problems (in a real app, this would be a database)
let problems: Problem[] = [...dummyProblems]
let nextId = problems.length + 1

export async function GET() {
  return NextResponse.json(problems)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.industry) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new problem
    const newProblem: Problem = {
      id: nextId++,
      title: body.title,
      description: body.description,
      industry: body.industry,
      upvotes: 0,
      downvotes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
      solutionLink: body.solutionLink || null,
    }

    // Add to in-memory store
    problems = [...problems, newProblem]

    return NextResponse.json(newProblem, { status: 201 })
  } catch (error) {
    console.error("Error creating problem:", error)
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 })
  }
}

