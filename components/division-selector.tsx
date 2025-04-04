"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample divisions data - now representing student divisions
const divisions = [
  { value: "A", label: "Division A" },
  { value: "B", label: "Division B" },
  { value: "C", label: "Division C" },
]

interface DivisionSelectorProps {
  onSelect?: (value: string) => void
}

export function DivisionSelector({ onSelect }: DivisionSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("A")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between md:w-[200px]">
          {value ? divisions.find((division) => division.value === value)?.label : "Select division..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandInput placeholder="Search division..." />
          <CommandList>
            <CommandEmpty>No division found.</CommandEmpty>
            <CommandGroup>
              {divisions.map((division) => (
                <CommandItem
                  key={division.value}
                  value={division.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    setValue(newValue || "A")
                    if (onSelect) onSelect(newValue || "A")
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === division.value ? "opacity-100" : "opacity-0")} />
                  {division.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

