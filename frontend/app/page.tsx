import React from "react";
import GoogleGeminiEffectDemo from "../components/HomePageComponents/GeminiEffect";
import HeroPageNavbar from "../components/HomePageComponents/HeroPageNavbar";
import FAQ from "../components/HomePageComponents/FAQ";
import { HeroParallaxDemo } from "../components/HomePageComponents/HeroParallax";
import { BentoGridDemo } from "../components/HomePageComponents/FeatureCard";
import Footer from "../components/HomePageComponents/Footer"; 

export default function Home() {
  return (
    <div>

      <GoogleGeminiEffectDemo />
      <HeroPageNavbar />
      <HeroParallaxDemo />
      <BentoGridDemo />
      <FAQ />
      <Footer /> 
    </div>
  );
}
