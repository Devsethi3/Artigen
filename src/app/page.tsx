import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingCards from "@/components/PricingCards";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="wrapper my-5" id="pricing-cards">
        <PricingCards />
      </div>
    </div>
  );
};

export default HomePage;
