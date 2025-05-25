import { HeroFeature } from "@/components/features/hero-feature"
import { KeyFeatures } from "@/components/features/key-features"
import { Benefits } from "@/components/features/benefits"
import { Walkthrough } from "@/components/features/walkthrough"
import { Testimonials } from "@/components/features/testimonials"
import { CtaSection } from "@/components/features/cta-section"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { StickyFooter } from "@/components/sticky-footer"

export default function FeaturesPage() {
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
            Our Features
          </h1>
          <p className={cn(inter.className, "mt-4 text-lg text-muted-foreground md:text-xl")}>
            Explore how our platform can help you create impactful resumes and prepare for interviews.
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto" />
        </div>

        {/* Hero Feature */}
        <div className="my-16">
          <HeroFeature />
        </div>

        {/* Key Features Grid */}
        <div className="my-24">
          <KeyFeatures />
        </div>

        {/* Benefits Section */}
        <div className="my-24">
          <Benefits />
        </div>

        {/* Interactive Walkthrough */}
        <div className="my-24">
          <Walkthrough />
        </div>

        {/* Testimonials */}
        <div className="my-24">
          <Testimonials />
        </div>

        {/* CTA Section */}
        <div className="mb-24">
          <CtaSection />
        </div>
      </main>
      <Footer />
      <StickyFooter />
    </div>
  )
}

