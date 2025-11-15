import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import HeroSection from "@/components/homepage/HeroSection"
import BrandsSection from "@/components/homepage/BrandsSection"
import ProcessSection from "@/components/homepage/ProcessSection"
import FeaturesSection from "@/components/homepage/FeaturesSection"
import ExamplesSection from "@/components/homepage/ExamplesSection"
import TestimonialsSection from "@/components/homepage/TestimonialsSection"
import PricingSection from "@/components/homepage/PricingSection"
import FAQSection from "@/components/homepage/FAQSection"
import CTASection from "@/components/homepage/CTASection"

export const dynamic = "force-dynamic"

export default async function Index() {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Only check user if Supabase is properly configured
  if (supabaseUrl && supabaseAnonKey && 
      supabaseUrl !== 'your-supabase-url' && 
      supabaseAnonKey !== 'your-supabase-anon-key') {
    try {
      const supabase = createServerComponentClient({ cookies })
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        return redirect("/overview")
      }
    } catch (error) {
      // If Supabase fails, just show the homepage
      console.warn('Supabase not configured or unavailable, showing homepage:', error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <HeroSection />
        <BrandsSection />
        <ProcessSection />
        <FeaturesSection />
        <ExamplesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  )
}
