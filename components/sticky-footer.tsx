"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { poppins } from "@/lib/fonts"
import { ArrowRight } from "lucide-react"

export function StickyFooter() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t shadow-lg py-3"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="hidden md:block">
          <p className={cn(poppins.className, "font-medium")}>Ready to create your professional resume?</p>
          <p className="text-sm text-muted-foreground">Join thousands of professionals who've already succeeded</p>
        </div>
        <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 gap-2">
          <Link href="/builder">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

