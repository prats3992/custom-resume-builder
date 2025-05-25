"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import type { ResumeFormValues } from "@/lib/schemas"

const skillOptions = [
  // Technical Skills
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "Cloud Computing",
  "DevOps",
  "Database Management",
  "System Design",
  "UI/UX Design",
  "Testing & QA",
  "Security",

  // Administrative Skills
  "Project Management",
  "Team Leadership",
  "Strategic Planning",
  "Budget Management",
  "Risk Assessment",
  "Process Improvement",

  // Managerial Skills
  "Team Building",
  "Decision Making",
  "Conflict Resolution",
  "Performance Management",
  "Change Management",
  "Stakeholder Communication",
]

export function SkillsSection() {
  const form = useFormContext<ResumeFormValues>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Skills and Frameworks</h2>
        <p className="text-sm text-muted-foreground">Select your technical, administrative, and managerial skills</p>
      </div>

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <MultiSelect
                selected={field.value || []} // Provide default empty array if value is undefined
                onChange={field.onChange}
                options={skillOptions}
                placeholder="Select your skills..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

