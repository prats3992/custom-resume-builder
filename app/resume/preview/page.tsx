"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MinimalTemplate } from "@/components/resume-templates/minimal"
import { GlassTemplate } from "@/components/resume-templates/glass"
import { LuxuryTemplate } from "@/components/resume-templates/luxury"
import { TimelineTemplate } from "@/components/resume-templates/timeline"
import { InfographicTemplate } from "@/components/resume-templates/infographic"
import { PolishedTemplate } from "@/components/resume-templates/polished"
import { GeometricTemplate } from "@/components/resume-templates/geometric"
import { Button } from "@/components/ui/button"
import { Download, Share2, ArrowLeft, Copy, Check, Home } from "lucide-react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Add print styles
const printStyles = `
  @media print {
    nav, button, .no-print {
      display: none !important;
    }
    
    body {
      background: white !important;
    }
    
    .resume-container {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      box-shadow: none !important;
    }
    
    @page {
      margin: 0.5cm;
    }
  }
`

// Add animation for progress bar
const animationStyles = `
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  
  .animate-progress {
    animation: progress 2.5s ease-in-out forwards;
  }
`

export default function ResumePreviewPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [resumeData, setResumeData] = useState<any>(null)
  const [credentials, setCredentials] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get the resume data from localStorage
    const storedData = localStorage.getItem("resumeData")
    const storedCredentials = localStorage.getItem("userCredentials")
    const storedUserData = localStorage.getItem("userData")

    if (storedData) {
      setResumeData(JSON.parse(storedData))
    } else {
      // If no resume data, redirect to builder
      router.push("/builder")
    }

    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials))
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    setIsLoading(false)

    // Check if we should automatically download
    const action = searchParams.get("action")
    if (action === "download") {
      // Wait for the component to render
      setTimeout(() => {
        handleDownloadPdf()
      }, 1000)
    }
  }, [router, searchParams])

  const getTemplateComponent = () => {
    if (!resumeData) return null

    switch (resumeData.template) {
      case "minimal":
        return <MinimalTemplate />
      case "glass":
        return <GlassTemplate />
      case "luxury":
        return <LuxuryTemplate />
      case "timeline":
        return <TimelineTemplate />
      case "infographic":
        return <InfographicTemplate />
      case "polished":
        return <PolishedTemplate />
      case "geometric":
        return <GeometricTemplate />
      default:
        return <MinimalTemplate />
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return

    try {
      setIsGeneratingPdf(true)

      // Create a canvas from the resume element
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      // Calculate dimensions to maintain aspect ratio
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
        format: "a4",
      })

      // Add the image to the PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight)

      // Save the PDF
      const fileName = `resume_${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Resume",
          text: "Check out my professional resume!",
          url: window.location.href,
        })
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent mx-auto"></div>
          <p>Loading your resume...</p>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Resume Not Found</h1>
          <p className="mb-6">We couldn't find your resume data. Please try generating your resume again.</p>
          <Button asChild>
            <Link href="/builder">Return to Builder</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Add styles */}
      <style jsx global>
        {printStyles}
      </style>
      <style jsx global>
        {animationStyles}
      </style>

      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Credentials Card */}
          {credentials && !searchParams.get("hideCredentials") && (
            <div className="mb-8 no-print">
              <Card className="border-green-100 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-600" />
                    Resume Created Successfully!
                  </CardTitle>
                  <CardDescription>
                    Your resume has been created and saved. Use the credentials below to access it later.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Username</div>
                      <div className="flex items-center justify-between rounded-md bg-white p-2 shadow-sm">
                        <code className="text-sm">{credentials.username}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(credentials.username, "username")}
                        >
                          {copied === "username" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Password</div>
                      <div className="flex items-center justify-between rounded-md bg-white p-2 shadow-sm">
                        <code className="text-sm">{credentials.password}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(credentials.password, "password")}
                        >
                          {copied === "password" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-green-50/50 px-6 py-4">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 border-green-200 bg-green-100 text-green-800">
                      {userData?.pricing === "free"
                        ? "Free Plan"
                        : userData?.pricing === "basic"
                          ? "Basic Plan"
                          : "Premium Plan"}
                    </Badge>
                    {userData?.targetRole && (
                      <span className="text-sm text-muted-foreground">Target Role: {userData.targetRole}</span>
                    )}
                  </div>
                  <Alert className="hidden">
                    <AlertTitle>Important!</AlertTitle>
                    <AlertDescription>
                      Please save these credentials. You'll need them to access your resume later.
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Action Bar */}
          <div className="mb-6 flex items-center justify-between no-print">
            <div className="flex gap-2">
              {credentials ? (
                <Button variant="outline" asChild>
                  <Link href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/builder">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Editor
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}>
                <Download className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
                {isGeneratingPdf ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Resume Preview */}
          <div
            ref={resumeRef}
            className={cn("mx-auto max-w-5xl rounded-lg bg-white p-8 shadow-lg print:shadow-none resume-container")}
          >
            {getTemplateComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

