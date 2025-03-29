"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Plus } from "lucide-react"

export default function Header() {
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
          <Link href="/submit">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Submit Problem
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

