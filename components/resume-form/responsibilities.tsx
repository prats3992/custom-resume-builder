"use client"

import { useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import type { ResumeFormValues } from "@/lib/schemas"

export function ResponsibilitiesSection() {
  const form = useFormContext<ResumeFormValues>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Positions of Responsibility & Volunteer Work</h2>
        <p className="text-sm text-muted-foreground">Share your leadership roles and community contributions</p>
      </div>

      <FormField
        control={form.control}
        name="responsibilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Positions of Responsibility</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your leadership roles and responsibilities..."
                className="min-h-[150px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="volunteerWork"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Volunteer Work</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your volunteer work and community contributions..."
                className="min-h-[150px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

