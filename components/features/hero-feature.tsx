"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export function HeroFeature() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-16 text-white sm:px-12">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(poppins.className, "text-3xl font-bold sm:text-4xl")}
        >
          Transform Your Career Journey with AI-Powered Tools
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(inter.className, "mx-auto mt-6 max-w-2xl text-lg text-gray-300")}
        >
          Our platform combines cutting-edge AI technology with professional expertise to help you create standout
          resumes, ace interviews, and advance your career. Get personalized suggestions, practice with AI-driven
          interview simulations, and receive real-time feedback to improve your chances of success.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
            <Link href="/builder">Get Started</Link>
          </Button>
        </motion.div>
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.1) 30%, transparent 31%), radial-gradient(circle at 80% -50%, rgba(255, 255, 255, 0.1) 20%, transparent 21%)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  )
}

