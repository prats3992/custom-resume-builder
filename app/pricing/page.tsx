import { PricingCards } from "@/components/pricing/pricing-cards"
import { Features } from "@/components/pricing/features"
import { FAQ } from "@/components/pricing/faq"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
// Import the StickyFooter component
import { StickyFooter } from "@/components/sticky-footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main className="container mx-auto px-4 pt-24 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className={cn(
              poppins.className,
              "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl",
            )}
          >
            Choose the Right Plan for You
          </h1>
          <p className={cn(inter.className, "mt-4 text-lg text-muted-foreground md:text-xl")}>
            Flexible pricing to meet your needs for interview preparation and resume improvement.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="my-16">
          <PricingCards />
        </div>

        {/* Features */}
        <div className="my-24">
          <Features />
        </div>

        {/* FAQ */}
        <div className="my-24">
          <FAQ />
        </div>
      </main>
      <Footer />
      <StickyFooter />
    </div>
  )
}

