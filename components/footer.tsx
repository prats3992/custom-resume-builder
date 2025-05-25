import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { inter } from "@/lib/fonts"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
        <div className={cn(inter.className, "text-sm text-gray-600")}>© 2024 Resume Builder. All rights reserved.</div>
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
  )
}

