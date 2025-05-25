"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ResumeFormValues } from "@/lib/schemas"
import { Check } from "lucide-react"

export const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focusing on content",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "glass",
    name: "Glass",
    description: "Modern and elegant with frosted glass effects",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium and sophisticated design",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Chronological layout with visual timeline",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "infographic",
    name: "Infographic",
    description: "Visual representation with infographic elements",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "polished",
    name: "Polished",
    description: "Professional and refined appearance",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "geometric",
    name: "Geometric",
    description: "Modern design with geometric elements",
    preview: "/placeholder.svg?height=200&width=150",
  },
]

export function TemplateSelection() {
  const form = useFormContext<ResumeFormValues>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose a Template</h2>
        <p className="text-sm text-muted-foreground">Select a design that best represents your professional style</p>
      </div>

      <FormField
        control={form.control}
        name="template"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    "hover:border-primary hover:shadow-md",
                    field.value === template.id && "border-primary ring-2 ring-primary ring-offset-2",
                  )}
                  onClick={() => {
                    field.onChange(template.id)
                    form.setValue("selectedTemplate", template)
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Template Preview Image */}
                      <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                        <img
                          src={template.preview || "/placeholder.svg"}
                          alt={`${template.name} template preview`}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Selection Indicator */}
                      {field.value === template.id && (
                        <div className="absolute right-2 top-2 rounded-full bg-primary p-1 text-white shadow-sm">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="space-y-1.5 p-3">
                      <h3 className="font-semibold leading-none">{template.name}</h3>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

