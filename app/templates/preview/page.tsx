"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  X,
  ChevronRight,
  Layout,
  Layers,
  Diamond,
  Clock,
  PieChart,
  Briefcase,
  Palette,
} from "lucide-react"
import { MinimalTemplate } from "@/components/resume-templates/minimal"
import { GlassTemplate } from "@/components/resume-templates/glass"
import { LuxuryTemplate } from "@/components/resume-templates/luxury"
import { TimelineTemplate } from "@/components/resume-templates/timeline"
import { InfographicTemplate } from "@/components/resume-templates/infographic"
import { PolishedTemplate } from "@/components/resume-templates/polished"
import { GeometricTemplate } from "@/components/resume-templates/geometric"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { poppins, inter } from "@/lib/fonts"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type TemplateType = "minimal" | "glass" | "luxury" | "timeline" | "infographic" | "polished" | "geometric"

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

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focusing on content",
    color: "bg-gray-100",
  },
  {
    id: "glass",
    name: "Glass",
    description: "Modern and elegant with frosted glass effects",
    color: "bg-blue-100",
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium and sophisticated design",
    color: "bg-amber-100",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Chronological layout with visual timeline",
    color: "bg-teal-100",
  },
  {
    id: "infographic",
    name: "Infographic",
    description: "Visual representation with infographic elements",
    color: "bg-orange-100",
  },
  {
    id: "polished",
    name: "Polished",
    description: "Professional and refined appearance",
    color: "bg-violet-100",
  },
  {
    id: "geometric",
    name: "Geometric",
    description: "Modern design with geometric elements",
    color: "bg-yellow-100",
  },
]

export default function PreviewPage() {
  const [template, setTemplate] = useState<TemplateType>("minimal")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const templateListRef = useRef<HTMLDivElement>(null)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Scroll to the selected template in the sidebar
  useEffect(() => {
    if (templateListRef.current && !isMobile) {
      const selectedElement = templateListRef.current.querySelector(`[data-template="${template}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }, [template, isMobile])

  const getTemplateComponent = () => {
    switch (template) {
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Side Navigation - Desktop */}
      <div className="hidden lg:flex lg:w-72 fixed left-0 top-0 h-full border-r bg-white z-40 flex-col">
        <div className="p-4 border-b">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="p-4">
          <h1 className={cn(poppins.className, "text-xl font-semibold mb-2")}>Resume Templates</h1>
          <p className="text-sm text-muted-foreground mb-4">Select a template to preview</p>
        </div>

        {/* Scrollable Template List */}
        <div
          ref={templateListRef}
          className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          <div className="space-y-2">
            {templates.map((t) => {
              const Icon = templateIcons[t.id] || Layout

              return (
                <button
                  key={t.id}
                  data-template={t.id}
                  onClick={() => setTemplate(t.id as TemplateType)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors flex items-start gap-3",
                    template === t.id ? "bg-teal-50 text-teal-700 font-medium" : "hover:bg-gray-100 text-gray-700",
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center", t.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className={cn(inter.className, "font-medium")}>{t.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{t.description}</div>
                  </div>
                  {template === t.id && (
                    <Badge variant="outline" className="ml-auto bg-teal-50 text-teal-700 border-teal-200">
                      Active
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t">
          <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
            <Link href={`/builder?template=${template}`}>Use This Template</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center">
              {/* Use icon instead of color block */}
              <div
                className={cn(
                  "w-6 h-6 rounded-md mr-2 flex items-center justify-center",
                  templates.find((t) => t.id === template)?.color || "bg-gray-100",
                )}
              >
                {React.createElement(templateIcons[template] || Layout, { className: "h-4 w-4" })}
              </div>
              <h1 className="text-lg font-semibold">{templates.find((t) => t.id === template)?.name} Template</h1>
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileNavOpen(true)}
            className="flex items-center gap-2 border-dashed"
          >
            <Layout className="h-4 w-4" />
            <span className="text-sm">Templates</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Template Indicator */}
        <div className="flex overflow-x-auto py-2 px-4 gap-2 bg-gray-50 border-b scrollbar-hide">
          {templates.map((t) => {
            const Icon = templateIcons[t.id] || Layout

            return (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id as TemplateType)}
                className={cn(
                  "flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1",
                  template === t.id
                    ? "bg-teal-100 text-teal-800 border border-teal-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                <Icon className="h-3 w-3 mr-1" />
                {t.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <motion.div
        className="fixed inset-y-0 right-0 z-50 w-80 border-l bg-white shadow-lg lg:hidden"
        initial={{ x: "100%" }}
        animate={{ x: isMobileNavOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className={cn(poppins.className, "text-lg font-semibold")}>Choose Template</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid gap-3">
              {templates.map((t) => {
                const Icon = templateIcons[t.id] || Layout

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTemplate(t.id as TemplateType)
                      setIsMobileNavOpen(false)
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-lg transition-colors border",
                      template === t.id
                        ? "bg-teal-50 text-teal-700 font-medium border-teal-200"
                        : "hover:bg-gray-50 text-gray-700 border-gray-100",
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", t.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={cn(inter.className, "font-medium")}>{t.name}</div>
                      {template === t.id && (
                        <Badge variant="outline" className="ml-auto bg-teal-50 text-teal-700 border-teal-200">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-4 border-t">
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href={`/builder?template=${template}`}>Use This Template</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={cn("flex-1", isMobile ? "mt-28" : "ml-72")}>
        <div className={cn("p-4 md:p-8", template === "luxury" ? "bg-navy-950" : "bg-gray-50")}>
          {getTemplateComponent()}
        </div>
      </div>
    </div>
  )
}

