"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true)

      // Send login request to Next.js API route
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed") // Changed errorData.detail to errorData.message
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Login failed")
      }

      // Store user data and credentials in localStorage
      localStorage.setItem("resumeData", JSON.stringify(result.data.resumeData))
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      )
      localStorage.setItem(
        "userData",
        JSON.stringify({
          targetRole: result.data.targetRole,
          pricing: result.data.pricing,
        }),
      )

      // Show success message
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>Enter your credentials to access your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                Don't have an account yet?{" "}
                <Link href="/builder" className="text-primary hover:underline">
                  Create a resume
                </Link>{" "}
                to get your credentials.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

