import { Clock4, Zap, MessageSquare, BarChart3, Shield, Laptop } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Clock4,
    title: "24/7 AI Assistance",
    description: "Get help with your resume and interview preparation any time, day or night.",
  },
  {
    icon: Zap,
    title: "Tailored Resume Insights",
    description: "Receive personalized suggestions to improve your resume based on your industry and experience.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat with LLM",
    description: "Practice interviews and get instant feedback from our advanced language model.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your improvement and track your interview performance over time.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your data is encrypted and protected with enterprise-grade security.",
  },
  {
    icon: Laptop,
    title: "Cross-Platform Access",
    description: "Access your resume and practice interviews from any device, anywhere.",
  },
]

export function Features() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <h2 className={cn(poppins.className, "text-3xl font-bold")}>Everything You Need to Succeed</h2>
        <p className={cn(inter.className, "mt-4 text-lg text-muted-foreground")}>
          Comprehensive tools and features to help you land your dream job
        </p>
      </div>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="group relative rounded-lg border p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 inline-block rounded-lg bg-teal-100 p-3 text-teal-600">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className={cn(poppins.className, "mb-2 text-lg font-semibold")}>{feature.title}</h3>
            <p className={cn(inter.className, "text-sm text-muted-foreground")}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

