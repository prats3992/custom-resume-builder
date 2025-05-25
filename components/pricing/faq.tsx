"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle. Any unused portion of your current plan will be prorated.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial on our Professional plan. You can test all features and decide if it's right for you. No credit card required during the trial period.",
  },
  {
    question: "What happens after I subscribe?",
    answer:
      "After subscribing, you'll get immediate access to all features included in your chosen plan. You'll receive a welcome email with getting started guides and our support team is available to help you make the most of your subscription.",
  },
]

export function FAQ() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className={cn(poppins.className, "text-3xl font-bold")}>Frequently Asked Questions</h2>
        <p className={cn(inter.className, "mt-4 text-lg text-muted-foreground")}>
          Have a question? Find quick answers here
        </p>
      </div>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className={cn(poppins.className, "text-left")}>{faq.question}</AccordionTrigger>
              <AccordionContent className={cn(inter.className, "text-muted-foreground")}>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

