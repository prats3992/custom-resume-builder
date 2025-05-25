import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "After 6 months of job searching with no success, I decided to try this platform. The AI-powered resume optimization and interview practice completely transformed my approach. I'm now working at my dream company as a Senior Software Engineer.",
    author: "Michael Chen",
    role: "Senior Software Engineer",
    company: "Tech Giant Corp",
    image: "/placeholder.svg",
  },
  {
    quote:
      "The personalized feedback and industry-specific suggestions made all the difference. The platform helped me transition from academia to industry by highlighting my transferable skills effectively. I received multiple offers within weeks!",
    author: "Sarah Johnson",
    role: "Data Scientist",
    company: "AI Solutions Inc",
    image: "/placeholder.svg",
  },
]

export function HighlightedTestimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="relative overflow-hidden">
          <div className="absolute right-4 top-4 text-teal-100">
            <Quote className="h-12 w-12 rotate-180" />
          </div>
          <CardContent className="relative z-10 p-8">
            <blockquote className="space-y-6">
              <p className={cn(inter.className, "text-lg text-muted-foreground")}>{testimonial.quote}</p>
              <footer className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className={cn(poppins.className, "font-semibold")}>{testimonial.author}</div>
                  <div className={cn(inter.className, "text-sm text-muted-foreground")}>
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

