"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Basic",
    price: "$19",
    period: "per month",
    description: "Perfect for beginners",
    features: [
      { name: "Access to AI Resume Improver", included: true },
      { name: "10 Interview Questions per week", included: true },
      { name: "Basic Resume Templates", included: true },
      { name: "Personalized Chat LLM", included: false },
      { name: "Priority Support", included: false },
      { name: "Advanced Analytics", included: false },
    ],
  },
  {
    name: "Professional",
    price: "$49",
    period: "per month",
    description: "Most popular choice",
    features: [
      { name: "Access to AI Resume Improver", included: true },
      { name: "Unlimited Interview Questions", included: true },
      { name: "All Resume Templates", included: true },
      { name: "Personalized Chat LLM", included: true },
      { name: "Priority Support", included: false },
      { name: "Advanced Analytics", included: false },
    ],
  },
  {
    name: "Premium",
    price: "$99",
    period: "per month",
    description: "Best for advanced preparation",
    features: [
      { name: "Access to AI Resume Improver", included: true },
      { name: "Unlimited Interview Questions", included: true },
      { name: "All Resume Templates", included: true },
      { name: "Personalized Chat LLM", included: true },
      { name: "Priority Support", included: true },
      { name: "Advanced Analytics", included: true },
    ],
  },
]

export function PricingCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "relative flex flex-col transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer",
            plan.name === "Professional" && "border-teal-600 shadow-md",
          )}
          onClick={() => {
            // You can add analytics here
            window.location.href = "/builder"
          }}
        >
          {plan.name === "Professional" && (
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-teal-600 px-3 py-1 text-sm font-medium text-white">
              Popular
            </div>
          )}
          <CardHeader>
            <CardTitle className={cn(poppins.className, "text-center text-2xl")}>{plan.name}</CardTitle>
            <div className="text-center">
              <div className={cn(poppins.className, "text-4xl font-bold")}>{plan.price}</div>
              <div className={cn(inter.className, "text-sm text-muted-foreground")}>{plan.period}</div>
            </div>
            <p className={cn(inter.className, "text-center text-sm text-muted-foreground")}>{plan.description}</p>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-4">
              {plan.features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-2">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-teal-600" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span
                    className={cn(
                      inter.className,
                      "text-sm",
                      feature.included ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={cn(
                "w-full transition-all",
                plan.name === "Professional"
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-white text-teal-600 hover:bg-teal-50",
              )}
              variant={plan.name === "Professional" ? "default" : "outline"}
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = "/builder"
              }}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

