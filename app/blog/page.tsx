"use client"

import { FeedbackCards, FeedbackCard } from "@/components/blog/feedback-cards"
import { HighlightedTestimonials } from "@/components/blog/highlighted-testimonials"
import { CallToAction } from "@/components/blog/call-to-action"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Feedback {
  id: string
  title: string
  experience: string
  feature: string
  sentiment: "positive" | "negative" | "neutral"
  name: string
  role: string
  company: string
  createdAt: string
}

export default function BlogPage() {
  const [userFeedback, setUserFeedback] = useState<Feedback[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to load feedback from localStorage
  const loadLocalFeedback = () => {
    try {
      const storedFeedback = localStorage.getItem("userFeedback")
      if (storedFeedback) {
        return JSON.parse(storedFeedback)
      }
    } catch (err) {
      console.error("Error loading from localStorage:", err)
    }
    return []
  }

  // Function to save feedback to localStorage
  const saveLocalFeedback = (feedback: Feedback[]) => {
    try {
      localStorage.setItem("userFeedback", JSON.stringify(feedback))
    } catch (err) {
      console.error("Error saving to localStorage:", err)
    }
  }

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true)
      try {
        // First try to load from localStorage
        const localFeedback = loadLocalFeedback()

        if (localFeedback.length > 0) {
          setUserFeedback(localFeedback)
          // setMessage("Feedback loaded from local storage")
        } else {
          // If no local feedback, try the API
          const response = await fetch("/api/feedback")
          const data = await response.json()

          if (data.success) {
            setUserFeedback(data.feedback)

            // Save to localStorage for future use
            if (data.feedback.length > 0) {
              saveLocalFeedback(data.feedback)
            }

            if (data.message) {
              setMessage(data.message)
            }
          }
        }
      } catch (err) {
        console.error("Error fetching feedback:", err)
        setError("Failed to load feedback. Please try again later.")

        // Fallback to localStorage if API fails
        const localFeedback = loadLocalFeedback()
        if (localFeedback.length > 0) {
          setUserFeedback(localFeedback)
          setMessage("Feedback loaded from local storage (API unavailable)")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main className="container mx-auto px-4 pt-24 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className={cn(
              poppins.className,
              "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl",
            )}
          >
            Hear from Our Users
          </h1>
          <p className={cn(inter.className, "mt-4 text-lg text-muted-foreground md:text-xl")}>
            Explore feedback and experiences from professionals who&apos;ve used our services for resume improvement and
            interview preparation.
          </p>
        </div>

        {/* Status Messages */}
        {message && (
          <div className="my-6 mx-auto max-w-3xl">
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </div>
        )}

        {error && (
          <div className="my-6 mx-auto max-w-3xl">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* User Submitted Feedback */}
        {!isLoading && userFeedback.length > 0 && (
          <div className="my-16">
            <h2 className={cn(poppins.className, "text-2xl font-bold text-center mb-8")}>Recent User Feedback</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userFeedback.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={{
                    title: feedback.title,
                    description: feedback.experience,
                    feature: feedback.feature,
                    date: new Date(feedback.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    }),
                    name: feedback.name,
                    role: feedback.role,
                    company: feedback.company,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="my-16 text-center">
            <p className="text-muted-foreground">Loading feedback...</p>
          </div>
        )}

        {/* Highlighted Testimonials */}
        <div className="my-16">
          <HighlightedTestimonials />
        </div>

        {/* Feedback Cards */}
        <div className="my-16">
          <FeedbackCards />
        </div>

        {/* Call to Action */}
        <div className="my-24">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  )
}

