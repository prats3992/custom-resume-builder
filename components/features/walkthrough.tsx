"use client"

import { motion } from "framer-motion"
import { ClipboardList, LayoutTemplate, MessageSquareText, FileCheck, ChevronRight } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: ClipboardList,
    title: "Fill Your Details",
    description: "Input your professional information and experience",
  },
  {
    icon: LayoutTemplate,
    title: "Choose Template",
    description: "Select from our collection of professional templates",
  },
  {
    icon: MessageSquareText,
    title: "Get AI Feedback",
    description: "Receive personalized suggestions to improve your resume",
  },
  {
    icon: FileCheck,
    title: "Download & Apply",
    description: "Export your polished resume and start applying",
  },
]

export function Walkthrough() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={cn(poppins.className, "text-2xl font-bold sm:text-3xl")}>How It Works</h2>
        <p className={cn(inter.className, "mt-4 text-muted-foreground")}>
          Follow these simple steps to create your professional resume
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-100 md:hidden" />
        <div className="hidden md:block">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gray-100" />
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600">
                <step.icon className="h-6 w-6 text-white" />
                {index < steps.length - 1 && (
                  <ChevronRight className="absolute -right-8 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-gray-400 md:block" />
                )}
              </div>
              <h3 className={cn(poppins.className, "mb-2 text-lg font-semibold")}>{step.title}</h3>
              <p className={cn(inter.className, "text-sm text-muted-foreground")}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

