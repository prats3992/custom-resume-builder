"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import type { ResumeFormValues } from "@/lib/schemas"

export function EducationSection() {
  const form = useFormContext<ResumeFormValues>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Educational Details</h2>
        <p className="text-sm text-muted-foreground">Enter your academic qualifications</p>
      </div>

      <div className="space-y-8">
        {/* 10th Grade */}
        <div className="space-y-4">
          <h3 className="font-medium">10th Grade</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="education.tenth.institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.tenth.grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade/Percentage</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.tenth.board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* 12th Grade */}
        <div className="space-y-4">
          <h3 className="font-medium">12th Grade</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="education.twelfth.institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.twelfth.grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade/Percentage</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.twelfth.board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Bachelor's */}
        <div className="space-y-4">
          <h3 className="font-medium">Bachelor's Degree (Optional)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="education.bachelors.institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.bachelors.grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade/CGPA</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.bachelors.course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Master's */}
        <div className="space-y-4">
          <h3 className="font-medium">Master's Degree (Optional)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="education.masters.institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.masters.grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade/CGPA</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.masters.course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* PhD */}
        <div className="space-y-4">
          <h3 className="font-medium">PhD (Optional)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="education.phd.institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.phd.field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education.phd.thesis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thesis Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

