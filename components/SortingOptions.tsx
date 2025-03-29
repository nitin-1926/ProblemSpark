"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

interface SortingOptionsProps {
  selectedOption: string
  onSelectOption: (option: string) => void
}

export default function SortingOptions({ selectedOption, onSelectOption }: SortingOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-gray-400" />
      <Select value={selectedOption} onValueChange={onSelectOption}>
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

