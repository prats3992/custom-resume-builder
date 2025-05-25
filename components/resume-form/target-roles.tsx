"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeFormValues } from "@/lib/schemas"

export function TargetRolesSection() {
  const form = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({
    name: "targetRoles",
    control: form.control,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Target Roles</h2>
          <p className="text-sm text-muted-foreground">Specify up to three roles you're targeting</p>
        </div>
        {fields.length < 3 && (
          <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`targetRoles.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="e.g., Senior Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

