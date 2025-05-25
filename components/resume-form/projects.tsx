"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeFormValues } from "@/lib/schemas"

const techOptions = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "AWS",
  "Docker",
  "Kubernetes",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "REST",
]

export function ProjectsSection() {
  const form = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control: form.control,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground">Add your notable projects</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", description: "", techStack: [] })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="relative space-y-4 rounded-lg border p-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of your project..."
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`projects.${index}.techStack`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tech Stack</FormLabel>
                    <FormControl>
                      <MultiSelect
                        selected={field.value || []} // Provide default empty array if value is undefined
                        onChange={field.onChange}
                        options={techOptions}
                        placeholder="Select technologies..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

