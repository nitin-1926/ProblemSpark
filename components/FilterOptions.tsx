"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import { industries } from "@/lib/dummyData"

interface FilterOptionsProps {
  selectedIndustry: string
  onSelectIndustry: (industry: string) => void
}

export default function FilterOptions({ selectedIndustry, onSelectIndustry }: FilterOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-gray-400" />
      <Select value={selectedIndustry} onValueChange={onSelectIndustry}>
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Filter by industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Industries</SelectItem>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

