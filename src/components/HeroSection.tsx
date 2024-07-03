"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { FlipWords } from "./ui/FlipWords";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const words = ["Creativity", "Ideas"];

  useGSAP(() => {
    gsap.context(() => {
      // Subtle background animation
      gsap.to(sectionRef.current, {
        duration: 20,
        backgroundPosition: "100% 100%",
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-br from-emerald-900 to-slate-900 bg-[length:200%_200%] text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl w-full py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-[length:200%_auto] text-transparent bg-clip-text">
            Unleash Your <FlipWords words={words} /> <br /> with AI
          </h1>
          <div>
            <Button
              onClick={() => router.push("/dashboard")}
              size="lg"
              className="bg-emerald-500 mt-5 hover:bg-emerald-600 text-white transition-all duration-300 ease-in-out"
            >
              Start Creating
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎨"
            title="AI-Powered Design"
            description="Create stunning visuals with our intelligent design assistant"
          />
          <FeatureCard
            icon="📝"
            title="Smart Content Generation"
            description="Produce high-quality content with AI-driven writing tools"
          />
          <FeatureCard
            icon="🔍"
            title="Intelligent Analysis"
            description="Gain deep insights with our advanced AI analytics"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-emerald-800 bg-opacity-50 p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:bg-opacity-70 transform hover:scale-105"
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-emerald-300">{title}</h3>
        <p className="text-emerald-100">{description}</p>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default HeroSection;
