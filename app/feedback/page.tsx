"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  experience: z.string().min(20, {
    message: "Please provide more details about your experience.",
  }),
  feature: z.string({
    required_error: "Please select a feature.",
  }),
  sentiment: z.enum(["positive", "negative", "neutral"], {
    required_error: "Please select your sentiment.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
})

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      experience: "",
      feature: "",
      sentiment: "positive",
      name: "",
      role: "",
      company: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // First try to submit to API
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to submit feedback")
      }

      // If API submission successful, also save to localStorage
      try {
        // Get existing feedback
        const existingFeedbackStr = localStorage.getItem("userFeedback")
        const existingFeedback = existingFeedbackStr ? JSON.parse(existingFeedbackStr) : []

        // Add new feedback with ID and timestamp
        const newFeedback = {
          ...values,
          id: data.feedback.id || crypto.randomUUID(),
          createdAt: data.feedback.createdAt || new Date().toISOString(),
        }

        // Save updated feedback
        localStorage.setItem("userFeedback", JSON.stringify([...existingFeedback, newFeedback]))
      } catch (err) {
        console.error("Error saving to localStorage:", err)
        // Continue even if localStorage fails
      }

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! It helps us improve our service.",
      })

      // Redirect to blog page to see the feedback
      router.push("/blog")
    } catch (error) {
      console.error("Error submitting feedback:", error)

      // Fallback to localStorage only if API fails
      try {
        const newFeedback = {
          ...values,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }

        const existingFeedbackStr = localStorage.getItem("userFeedback")
        const existingFeedback = existingFeedbackStr ? JSON.parse(existingFeedbackStr) : []

        localStorage.setItem("userFeedback", JSON.stringify([...existingFeedback, newFeedback]))

        toast({
          title: "Feedback Saved Locally",
          description: "Your feedback was saved to your browser. API connection failed.",
        })

        router.push("/blog")
      } catch (localError) {
        toast({
          title: "Error Submitting Feedback",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center">
            <h1 className={cn(poppins.className, "text-3xl font-semibold tracking-tight")}>Share Your Feedback</h1>
            <p className={cn(inter.className, "mt-2 text-muted-foreground")}>
              We value your input to help us improve our resume building service
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Great Resume Templates!" {...field} />
                      </FormControl>
                      <FormDescription>A brief title for your feedback.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share your experience with our service..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Tell us about your experience using our service.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a feature" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Resume Templates">Resume Templates</SelectItem>
                          <SelectItem value="AI Resume Analysis">AI Resume Analysis</SelectItem>
                          <SelectItem value="Interview Practice">Interview Practice</SelectItem>
                          <SelectItem value="ATS Optimization">ATS Optimization</SelectItem>
                          <SelectItem value="24/7 AI Support">24/7 AI Support</SelectItem>
                          <SelectItem value="Personalized Learning">Personalized Learning</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Which feature are you providing feedback on?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sentiment"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Overall Sentiment</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="positive" />
                            </FormControl>
                            <FormLabel className="font-normal">Positive</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="neutral" />
                            </FormControl>
                            <FormLabel className="font-normal">Neutral</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="negative" />
                            </FormControl>
                            <FormLabel className="font-normal">Negative</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <h3 className="text-sm font-medium">About You (Optional)</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Your job title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

