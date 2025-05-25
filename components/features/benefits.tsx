"use client"

import { motion } from "framer-motion"
import { Clock, Target, Star } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: Clock,
    title: "Save Time with Tailored Templates",
    description: "Create professional resumes in minutes, not hours, with our pre-designed templates.",
    align: "left",
  },
  {
    icon: Target,
    title: "Practice for Real-World Interviews",
    description: "Prepare effectively with AI-powered mock interviews tailored to your industry.",
    align: "right",
  },
  {
    icon: Star,
    title: "Stand Out with a Polished Resume",
    description: "Make a lasting impression with professionally crafted and ATS-optimized resumes.",
    align: "left",
  },
]

export function Benefits() {
  return (
    <div className="space-y-16">
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "flex flex-col items-center gap-8 md:flex-row",
            benefit.align === "right" ? "md:flex-row-reverse" : "",
          )}
        >
          <div className="flex-1">
            <div
              className={cn(
                "space-y-4",
                benefit.align === "right" ? "text-right" : "text-left",
                "text-center md:text-left",
              )}
            >
              <div
                className={cn(
                  "mx-auto inline-flex rounded-lg bg-teal-50 p-3 text-teal-600",
                  benefit.align === "right" ? "md:ml-auto" : "",
                )}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className={cn(poppins.className, "text-2xl font-bold")}>{benefit.title}</h3>
              <p className={cn(inter.className, "text-lg text-muted-foreground")}>{benefit.description}</p>
            </div>
          </div>
          <div className="h-px w-full bg-gray-100 md:h-48 md:w-px" />
          <div className="flex-1" />
        </motion.div>
      ))}
    </div>
  )
}

