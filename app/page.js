import LandingHeader from "@/components/organisms/LandingHeader";
import LandingHero from "@/components/organisms/LandingHero";
import ProblemSection from "@/components/organisms/ProblemSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection";
import ColasSection from "@/components/organisms/ColasSection";
import ComplianceSection from "@/components/organisms/ComplianceSection";
import LandingFooter from "@/components/organisms/LandingFooter";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHero />
        <ProblemSection />
        <HowItWorksSection />
        <ColasSection />
        <ComplianceSection />
      </main>
      <LandingFooter />
    </>
  );
}
