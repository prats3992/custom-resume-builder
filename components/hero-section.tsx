"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { playfair, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-[#f8f6f3]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="container relative mx-auto px-4 pt-16">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 pt-20 pb-16">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={cn(
                playfair.className,
                "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900",
              )}
            >
              Craft Your Perfect
              <br />
              Professional Story
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(inter.className, "text-lg md:text-xl text-gray-600 max-w-xl")}
            >
              Build stunning, ATS-friendly resumes that capture your professional journey with our intelligent resume
              builder.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/builder"
                className="inline-flex h-12 items-center justify-center rounded-md border-2 border-teal-600 bg-teal-600 px-8 text-base font-medium text-white transition-colors hover:bg-teal-700 hover:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              >
                Get Started
              </Link>
              <Link
                href="/templates/preview"
                className="inline-flex h-12 items-center justify-center rounded-md border-2 border-gray-400 bg-transparent px-8 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                View Templates
              </Link>
            </motion.div>
          </div>

          {/* Right column - Visual content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-lg bg-white p-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="mt-4 space-y-4">
                <div className="h-4 w-3/4 rounded bg-gray-100" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
                <div className="h-32 rounded bg-gray-100" />
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 rounded-lg bg-gray-900 p-6 shadow-xl">
              <pre className="text-sm text-gray-300">
                <code>{`{
  "template": "modern",
  "sections": {
    "skills": true,
    "experience": true
  }
}`}</code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className={cn(inter.className, "text-sm text-gray-600")}>
              © 2024 Resume Builder. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

