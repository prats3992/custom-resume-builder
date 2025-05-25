"use client"

import { motion } from "framer-motion"
import { FileText, MessageSquare, LineChart, History, Layout, LayoutDashboard, Sparkles } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: FileText,
    title: "AI Resume Improver",
    description:
      "Receive actionable AI suggestions to optimize your resume for targeted roles. Our system analyzes your content and provides specific improvements.",
  },
  {
    icon: MessageSquare,
    title: "Interview Practice",
    description:
      "Practice both technical and behavioral interviews with our AI-powered simulator. Get instant feedback and improve your responses.",
  },
  {
    icon: LineChart,
    title: "Personalized Career Insights",
    description:
      "Gain valuable insights about your career trajectory and potential opportunities based on your experience and skills.",
  },
  {
    icon: History,
    title: "Real-Time Chat LLM",
    description:
      "Engage with our advanced language model for immediate assistance. Your chat history is retained for continuous improvement.",
  },
  {
    icon: Layout,
    title: "Multiple Resume Templates",
    description:
      "Choose from a variety of professionally designed templates. Each template is optimized for ATS and human readability.",
  },
  {
    icon: LayoutDashboard,
    title: "User-Friendly Dashboard",
    description:
      "Track your progress, manage multiple resumes, and access all features from our intuitive, centralized dashboard.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function KeyFeatures() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          variants={item}
          className="group relative rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg"
        >
          <div className="mb-4 inline-flex rounded-lg bg-teal-50 p-3 text-teal-600">
            <feature.icon className="h-6 w-6" />
          </div>
          <h3 className={cn(poppins.className, "mb-2 text-lg font-semibold")}>{feature.title}</h3>
          <p className={cn(inter.className, "text-muted-foreground")}>{feature.description}</p>
          <div className="absolute right-6 top-6">
            <Sparkles className="h-4 w-4 text-teal-200 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

