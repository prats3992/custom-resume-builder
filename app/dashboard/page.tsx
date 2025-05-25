"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, LogOut, Eye, Upload, Download } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const [credentials, setCredentials] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is logged in
      const storedCredentials = localStorage.getItem("userCredentials")

      if (!storedCredentials) {
        router.push("/login")
        return
      }

      try {
        const parsedCredentials = JSON.parse(storedCredentials)
        setCredentials(parsedCredentials)

        // Fetch user data from API
        const response = await fetch(`/api/user/${parsedCredentials.username}`)

        if (!response.ok) {
          const errorData = await response.json() // Get error message from Next.js API
          throw new Error(errorData.message || "Failed to fetch user data")
        }

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch user data")
        }

        // Store the data in localStorage for other components to use
        localStorage.setItem("resumeData", JSON.stringify(result.data.resumeData))
        localStorage.setItem(
          "userData",
          JSON.stringify({
            targetRole: result.data.targetRole,
            pricing: result.data.pricing,
          }),
        )

        // Set state
        setUserData({
          targetRole: result.data.targetRole,
          pricing: result.data.pricing,
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch your data. Please try logging in again.",
          variant: "destructive",
        })

        // Clear credentials and redirect to login
        localStorage.removeItem("userCredentials")
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router, toast])

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userCredentials")
    localStorage.removeItem("userData")
    localStorage.removeItem("resumeData")

    // Show success message
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })

    // Redirect to login page
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent mx-auto"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details and subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Username</p>
                    <p className="font-mono">{credentials?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Subscription Plan</p>
                    <Badge className="mt-1">
                      {userData?.pricing === "free"
                        ? "Free Plan"
                        : userData?.pricing === "basic"
                          ? "Basic Plan"
                          : "Premium Plan"}
                    </Badge>
                  </div>
                  {userData?.targetRole && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Target Role</p>
                      <p>{userData.targetRole}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/pricing">Upgrade Plan</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Resume</CardTitle>
                <CardDescription>View and manage your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="rounded-md bg-primary/10 p-2">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Professional Resume</h3>
                    <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button asChild className="flex-1">
                  <Link href="/resume/preview?hideCredentials=true">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/builder">
                    <Upload className="mr-2 h-4 w-4" />
                    Update
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" asChild className="h-auto flex-col items-center justify-center p-6">
                  <Link href="/resume/preview?hideCredentials=true">
                    <Eye className="mb-2 h-6 w-6" />
                    <span>View Resume</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex-col items-center justify-center p-6">
                  <Link href="/builder">
                    <Upload className="mb-2 h-6 w-6" />
                    <span>Update Resume</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex-col items-center justify-center p-6">
                  <Link href="/resume/preview?action=download&hideCredentials=true">
                    <Download className="mb-2 h-6 w-6" />
                    <span>Download PDF</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

