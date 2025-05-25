"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { poppins } from "@/lib/fonts"
import { MainNav } from "@/components/main-nav"
import { templates } from "@/components/resume-templates/template-data"
import {
  Check,
  FileText,
  Upload,
  Layout,
  Layers,
  Diamond,
  Clock,
  PieChart,
  Briefcase,
  Palette,
  CreditCard,
  CheckCircle2,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define the form schema
const formSchema = z.object({
  file: z.custom<FileList>((value) => typeof FileList !== "undefined" && value instanceof FileList).refine((files) => files.length > 0, {
    message: "Please upload a resume file.",
  }),
  template: z.string({
    required_error: "Please select a template.",
  }),
  targetRole: z.string({
    required_error: "Please enter your target role.",
  }),
  pricing: z.enum(["free", "basic", "premium"], {
    required_error: "Please select a pricing plan.",
  }),
})

// Map template IDs to icons
const templateIcons: Record<string, React.ElementType> = {
  minimal: Layout,
  glass: Layers,
  luxury: Diamond,
  timeline: Clock,
  infographic: PieChart,
  polished: Briefcase,
  geometric: Palette,
}

// Map template IDs to colors
const templateColors: Record<string, string> = {
  minimal: "bg-gray-100 text-gray-800",
  glass: "bg-blue-100 text-blue-800",
  luxury: "bg-amber-100 text-amber-800",
  timeline: "bg-teal-100 text-teal-800",
  infographic: "bg-orange-100 text-orange-800",
  polished: "bg-violet-100 text-violet-800",
  geometric: "bg-yellow-100 text-yellow-800",
}

type FormValues = z.infer<typeof formSchema>

export default function BuilderPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showPaymentAnimation, setShowPaymentAnimation] = React.useState(false)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: "",
      targetRole: "",
      pricing: "free",
    },
  })

  const searchParams = useSearchParams()
  const templateParam = searchParams.get("template")

  // Check if user is logged in
  React.useEffect(() => {
    const storedCredentials = localStorage.getItem("userCredentials")
    const storedUserData = localStorage.getItem("userData")

    if (storedCredentials && storedUserData) {
      setIsUpdating(true)

      // Pre-fill form with stored data
      const userData = JSON.parse(storedUserData)
      const resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}")

      if (userData && resumeData) {
        form.setValue("targetRole", userData.targetRole || "")
        form.setValue("pricing", userData.pricing || "free")
        form.setValue("template", resumeData.template || templateParam || "")
      }
    }
  }, [form, templateParam])

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true)

      // Create FormData to send the file
      const formData = new FormData()
      formData.append("file", data.file[0])
      formData.append("template", data.template)
      formData.append("target_role", data.targetRole)
      formData.append("pricing", data.pricing)

      // Get existing credentials if updating
      const existingCredentials = isUpdating ? JSON.parse(localStorage.getItem("userCredentials") || "{}") : null

      // If updating, add username to formData
      if (isUpdating && existingCredentials?.username) {
        formData.append("username", existingCredentials.username)
      }

      // Send to Next.js API endpoint
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        // Try to parse error message from Next.js API response
        let errorMessage = `Server responded with ${response.status}: ${response.statusText}`
        try {
          const errorResult = await response.json()
          if (errorResult && errorResult.message) {
            errorMessage = errorResult.message
          }
        } catch (e) {
          // Ignore if response is not JSON or error parsing JSON
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to process resume")
      }

      // Store the parsed resume data and credentials in localStorage
      localStorage.setItem("resumeData", JSON.stringify(result.data))

      // If updating, keep existing credentials, otherwise use new ones
      if (!isUpdating) {
        localStorage.setItem("userCredentials", JSON.stringify(result.credentials))
      }

      localStorage.setItem(
        "userData",
        JSON.stringify({
          targetRole: data.targetRole,
          pricing: data.pricing,
        }),
      )

      // Show payment animation only for new users
      if (!isUpdating) {
        setShowPaymentAnimation(true)

        // Wait 3 seconds for animation, then navigate
        setTimeout(() => {
          // Show success message
          toast({
            title: "Resume uploaded successfully",
            description: "Your resume has been processed and is ready to preview.",
          })

          // Navigate to the preview page
          router.push("/resume/preview")
        }, 3000)
      } else {
        // For existing users, just show a success message and redirect
        toast({
          title: "Resume updated successfully",
          description: "Your resume has been updated and is ready to view.",
        })

        // Navigate to the dashboard
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error uploading resume:", error)
      toast({
        title: isUpdating ? "Error updating resume" : "Error uploading resume",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (showPaymentAnimation) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center">
            <div className="mb-4 relative">
              <CreditCard className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute -right-2 -top-2 bg-green-500 rounded-full p-1 animate-bounce">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Processing Payment</h2>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-progress"></div>
              </div>
              <p className="text-sm text-gray-500">Please wait while we process your payment...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <h1 className={cn(poppins.className, "text-3xl font-semibold tracking-tight")}>
              {isUpdating ? "Update Your Resume" : "Build Your Perfect Resume"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isUpdating
                ? "Upload a new resume to update your existing profile"
                : "Upload your existing resume and we'll transform it into a professional design"}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* File Upload */}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Upload Resume</FormLabel>
                      <FormControl>
                        <div className="grid w-full gap-2">
                          <label
                            htmlFor="resume-upload"
                            className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary/50 bg-gray-50 px-4 py-5 text-center transition-colors hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-primary/70" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-primary">Upload your resume</p>
                                <p className="text-xs text-muted-foreground">
                                  Drag and drop or click to upload (PDF, DOCX, TXT)
                                </p>
                              </div>
                            </div>
                            <Input
                              id="resume-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.docx,.doc,.txt"
                              onChange={(e) => {
                                onChange(e.target.files)
                              }}
                              {...rest}
                            />
                          </label>
                          {value && value.length > 0 && (
                            <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2 text-sm">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="flex-1 truncate">{value[0].name}</span>
                              <span className="text-xs text-muted-foreground">
                                {(value[0].size / 1024).toFixed(0)} KB
                              </span>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>We currently support PDF and TXT files up to 5MB. (Support for DOCX coming soon)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Target Role */}
                <FormField
                  control={form.control}
                  name="targetRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Frontend Developer, Product Manager" {...field} />
                      </FormControl>
                      <FormDescription>Enter the job title you're targeting with this resume</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pricing Plan */}
                <FormField
                  control={form.control}
                  name="pricing"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Pricing Plan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                            <RadioGroupItem value="free" id="free" />
                            <label htmlFor="free" className="flex flex-1 cursor-pointer justify-between">
                              <div>
                                <p className="font-medium">Free</p>
                                <p className="text-sm text-muted-foreground">Basic resume features</p>
                              </div>
                              <p className="font-medium">$0</p>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                            <RadioGroupItem value="basic" id="basic" />
                            <label htmlFor="basic" className="flex flex-1 cursor-pointer justify-between">
                              <div>
                                <p className="font-medium">Basic</p>
                                <p className="text-sm text-muted-foreground">Advanced templates and features</p>
                              </div>
                              <p className="font-medium">$9.99</p>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                            <RadioGroupItem value="premium" id="premium" />
                            <label htmlFor="premium" className="flex flex-1 cursor-pointer justify-between">
                              <div>
                                <p className="font-medium">Premium</p>
                                <p className="text-sm text-muted-foreground">All features + AI optimization</p>
                              </div>
                              <p className="font-medium">$19.99</p>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Template Selection - Redesigned */}
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>Choose a Template</FormLabel>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {templates.map((template) => {
                          const Icon = templateIcons[template.id] || Layout
                          const colorClasses = templateColors[template.id] || "bg-gray-100 text-gray-800"

                          return (
                            <div
                              key={template.id}
                              className={cn(
                                "cursor-pointer rounded-lg border p-4 transition-all",
                                "hover:border-primary hover:shadow-md",
                                field.value === template.id
                                  ? "border-primary ring-2 ring-primary ring-offset-2"
                                  : "border-gray-200",
                              )}
                              onClick={() => field.onChange(template.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={cn("rounded-full p-2", colorClasses)}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium">{template.name}</h3>
                                  <p className="text-xs text-muted-foreground">{template.description}</p>
                                </div>
                                {field.value === template.id && (
                                  <div className="rounded-full bg-primary p-1 text-white">
                                    <Check className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : isUpdating ? "Update Resume" : "Generate Resume"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

