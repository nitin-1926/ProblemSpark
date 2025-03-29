import { NextResponse } from "next/server"
import type { Problem } from "@/lib/types"
import { dummyProblems } from "@/lib/dummyData"

// In-memory store for problems (in a real app, this would be a database)
const problems: Problem[] = [...dummyProblems]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const problem = problems.find((p) => p.id === id)

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 })
  }

  return NextResponse.json(problem)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const problemIndex = problems.findIndex((p) => p.id === id)

    if (problemIndex === -1) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 })
    }

    const body = await request.json()
    const updatedProblem = {
      ...problems[problemIndex],
      ...body,
    }

    // Update in-memory store
    problems[problemIndex] = updatedProblem

    return NextResponse.json(updatedProblem)
  } catch (error) {
    console.error("Error updating problem:", error)
    return NextResponse.json({ error: "Failed to update problem" }, { status: 500 })
  }
}

