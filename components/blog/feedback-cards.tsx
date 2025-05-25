import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

interface FeedbackItem {
  title: string
  description: string
  feature: string
  date: string
  name: string
  role?: string
  company?: string
}

const feedbackData: FeedbackItem[] = [
  {
    title: "Exceeded My Expectations!",
    description:
      "The AI-powered resume analysis provided insights I never would have thought of. The suggestions were specific to my industry and helped me highlight my achievements more effectively. Within weeks of updating my resume, I started getting more interview calls.",
    feature: "AI Resume Analysis",
    date: "January 2025",
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
  },
  {
    title: "Game-Changing Interview Prep",
    description:
      "The interview preparation feature is incredible. Being able to practice with AI that provides real-time feedback helped me feel much more confident. The questions were relevant to my field and the feedback was constructive.",
    feature: "Interview Practice",
    date: "January 2025",
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovation Labs",
  },
  {
    title: "Worth Every Penny",
    description:
      "I was skeptical at first, but the results speak for themselves. The resume templates are modern and professional, and the AI suggestions helped me tailor my experience perfectly. I landed my dream job within a month!",
    feature: "Resume Templates",
    date: "December 2024",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Creative Solutions",
  },
  {
    title: "Incredible Support System",
    description:
      "The combination of AI assistance and professional templates made the job application process so much smoother. The platform is intuitive, and the 24/7 AI support meant I could work on my resume whenever inspiration struck.",
    feature: "24/7 AI Support",
    date: "December 2024",
    name: "David Smith",
    role: "Business Analyst",
    company: "Data Insights",
  },
  {
    title: "Professional and Modern",
    description:
      "The templates are not just beautiful - they're ATS-friendly too! I appreciate how easy it was to customize them while maintaining a professional look. The AI suggestions for each section were particularly helpful.",
    feature: "ATS Optimization",
    date: "December 2024",
    name: "Lisa Park",
    role: "HR Manager",
    company: "Talent Solutions",
  },
  {
    title: "Fantastic Learning Experience",
    description:
      "Beyond just creating a great resume, I learned so much about how to present my professional experience effectively. The AI feedback helped me understand what recruiters look for and how to stand out.",
    feature: "Personalized Learning",
    date: "November 2024",
    name: "James Wilson",
    role: "Senior Developer",
    company: "Code Masters",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export function FeedbackCard({ feedback }: { feedback: FeedbackItem }) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <CardTitle className={cn(poppins.className, "text-xl")}>{feedback.title}</CardTitle>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">{getInitials(feedback.name)}</AvatarFallback>
          </Avatar>
        </div>
        <Badge variant="secondary" className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
          {feedback.feature}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1">
        <p className={cn(inter.className, "text-muted-foreground")}>{feedback.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-1">
        <div className={cn(inter.className, "font-medium")}>{feedback.name}</div>
        {feedback.role && feedback.company && (
          <div className={cn(inter.className, "text-sm text-muted-foreground")}>
            {feedback.role} at {feedback.company}
          </div>
        )}
        <div className={cn(inter.className, "text-sm text-muted-foreground")}>{feedback.date}</div>
      </CardFooter>
    </Card>
  )
}

export function FeedbackCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {feedbackData.map((feedback, index) => (
        <FeedbackCard key={index} feedback={feedback} />
      ))}
    </div>
  )
}

