import Link from "next/link"
import { Button } from "@/components/ui/button"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export function CallToAction() {
  return (
    <div className="rounded-lg bg-gray-50 px-6 py-12 text-center">
      <h2 className={cn(poppins.className, "text-2xl font-bold sm:text-3xl")}>Want to Share Your Experience?</h2>
      <p className={cn(inter.className, "mx-auto mt-4 max-w-2xl text-muted-foreground")}>
        Your feedback helps us improve and inspires others on their professional journey. Share your success story with
        our community.
      </p>
      <Button asChild className="mt-8 bg-teal-600 hover:bg-teal-700">
        <Link href="/feedback">Share Your Story</Link>
      </Button>
    </div>
  )
}

