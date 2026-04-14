import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimateIn from "@/components/AnimateIn";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Campaigns from "@/components/Campaigns";
import Awards from "@/components/Awards";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AnimateIn>
          <About />
        </AnimateIn>
        <AnimateIn staggerChildren staggerDelay={100} delay={0}>
          <Education />
        </AnimateIn>
        <AnimateIn staggerChildren staggerDelay={80} delay={0}>
          <Experience />
        </AnimateIn>
        <AnimateIn staggerChildren staggerDelay={80} delay={0}>
          <Campaigns />
        </AnimateIn>
        <AnimateIn staggerChildren staggerDelay={80} delay={0}>
          <Awards />
        </AnimateIn>
        <AnimateIn staggerChildren staggerDelay={60} delay={0}>
          <Skills />
        </AnimateIn>
        <AnimateIn staggerChildren staggerDelay={80} delay={0}>
          <Contact />
        </AnimateIn>
      </main>
      <Footer />
      <BackToTop />
      <ChatbotWidget />
    </>
  );
}
