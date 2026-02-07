import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import SocialProofBar from "@/components/sections/SocialProofBar";
import DirectionQuiz from "@/components/sections/DirectionQuiz";
import PersonasSection from "@/components/sections/PersonasSection";
import AboutYasna from "@/components/sections/AboutYasna";
import MethodSection from "@/components/sections/MethodSection";
import DirectionsShowcase from "@/components/sections/DirectionsShowcase";
import Testimonials from "@/components/sections/Testimonials";
import EventsSection from "@/components/sections/EventsSection";
import ThreeSteps from "@/components/sections/ThreeSteps";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import BackgroundDecor from "@/components/ui/BackgroundDecor";
import SignupModal from "@/components/forms/SignupModal";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <BackgroundDecor />
      <Header />
      <main id="main-content">
        <Hero />
        <SocialProofBar />
        <AboutYasna />
        <MethodSection />
        <div className="max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <PersonasSection />
        <DirectionsShowcase />
        <DirectionQuiz />
        <Testimonials />
        <ThreeSteps />
        <EventsSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <SignupModal />
      <StickyMobileCTA />
    </div>
  );
}
