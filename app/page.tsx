import TargetCursor from "@/components/TargetCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { WhyWorkWithMe } from "@/components/WhyWorkWithMe";
import { Workflow } from "@/components/Workflow";
import { Portfolio } from "@/components/Portfolio";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ClosingCTABand } from "@/components/ClosingCTABand";

export default function Home() {
  return (
    <>
      <TargetCursor
        spinDuration={2.2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={1}
      />
      <Navbar />
      <main className="flex-1 bg-[var(--color-canvas)]">
        <Hero />
        <About />
        <Services />
        <WhyWorkWithMe />
        <Workflow />
        <Portfolio />
        <FAQ />
        <Contact />

      </main>
      <Footer />
    </>
  );
}

