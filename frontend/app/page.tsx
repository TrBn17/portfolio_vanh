import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
        <About />
        <Education />
        <Experience />
        <Campaigns />
        <Awards />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatbotWidget />
    </>
  );
}
