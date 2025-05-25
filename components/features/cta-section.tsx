"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export function CtaSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h2 className={cn(poppins.className, "text-2xl font-bold sm:text-3xl")}>Ready to Take the Next Step?</h2>
      <p className={cn(inter.className, "mx-auto mt-4 max-w-2xl text-muted-foreground")}>
        Join thousands of professionals who have already transformed their career journey with our platform.
      </p>
      <Button asChild size="lg" className="mt-8 bg-teal-600 hover:bg-teal-700">
        <Link href="/builder">Start Now</Link>
      </Button>
    </motion.div>
  )
}

