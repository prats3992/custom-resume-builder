"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MultiSelectProps {
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  options: string[]
  className?: string
}

export function MultiSelect({
  selected = [], // Provide default empty array
  onChange,
  placeholder = "Select items...",
  options,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleSelect = (item: string) => {
    const currentSelected = selected || [] // Handle undefined case
    if (currentSelected.includes(item)) {
      onChange(currentSelected.filter((i) => i !== item))
    } else {
      onChange([...currentSelected, item])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={`flex min-h-[40px] w-full flex-wrap items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className}`}
        >
          <div className="flex flex-wrap gap-1">
            {selected &&
              selected.map((item) => (
                <Badge key={item} variant="secondary" className="mr-1">
                  {item}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
            {(!selected || selected.length === 0) && <span className="text-muted-foreground">{placeholder}</span>}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    handleSelect(option)
                    setOpen(true)
                  }}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

