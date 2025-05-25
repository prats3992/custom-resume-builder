"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeFormValues } from "@/lib/schemas"

export function WorkExperienceSection() {
  const form = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({
    name: "workExperience",
    control: form.control,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <p className="text-sm text-muted-foreground">Add your professional experience</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ role: "", company: "", startDate: "", endDate: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
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

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name={`workExperience.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`workExperience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`workExperience.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`workExperience.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY or Present" {...field} />
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

