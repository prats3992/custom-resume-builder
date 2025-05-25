"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "The AI suggestions were incredibly helpful. They helped me highlight achievements I wouldn't have thought to include. Within two weeks of updating my resume, I landed three interviews!",
    author: "Alex Thompson",
    role: "Software Engineer",
  },
  {
    quote:
      "The interview practice feature is a game-changer. Being able to practice with AI that provides real-time feedback helped me feel much more confident in my actual interviews.",
    author: "Maria Rodriguez",
    role: "Product Manager",
  },
]

export function Testimonials() {
  return (
    <div className="rounded-lg bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className={cn(poppins.className, "text-2xl font-bold sm:text-3xl")}>What Our Users Say</h2>
          <p className={cn(inter.className, "mt-4 text-muted-foreground")}>
            Real experiences from professionals who've used our platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-lg bg-white p-6 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-gray-100" />
              <div className="relative">
                <p className={cn(inter.className, "mb-4 text-muted-foreground")}>{testimonial.quote}</p>
                <div className="border-t pt-4">
                  <div className={cn(poppins.className, "font-medium")}>{testimonial.author}</div>
                  <div className={cn(inter.className, "text-sm text-muted-foreground")}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

