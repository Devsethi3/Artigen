"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background animation
      gsap.to(sectionRef.current, {
        duration: 20,
        backgroundPosition: "100% 100%",
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Animate title with a gradient text effect
      const titleElement = titleRef.current;
      if (titleElement) {
        gsap.to(titleElement, {
          duration: 3,
          backgroundPosition: "200% center",
          ease: "none",
          repeat: -1,
        });
      }

      // Animate subtitle with a typing effect
      const subtitleElement = subtitleRef.current;
      if (subtitleElement) {
        const text = subtitleElement.textContent || "";
        subtitleElement.textContent = "";
        gsap.to(subtitleElement, {
          duration: text.length * 0.05,
          text: { value: text, delimiter: "" },
          ease: "none",
          delay: 0.5,
        });
      }

      // Animate feature cards
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          autoAlpha: 0,
          y: 30,
          ease: "power3.out",
          delay: index * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-br from-emerald-900 to-slate-900 bg-[length:200%_200%] text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl w-full py-20">
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-[length:200%_auto] text-transparent bg-clip-text"
          >
            Unleash Your Creative Potential <br /> with AI
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl mb-8 text-emerald-100"
          >
            Transform ideas into reality with our amazing AI tools
          </p>
          <div ref={buttonRef}>
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 ease-in-out"
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
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
          />
          <FeatureCard
            icon="📝"
            title="Smart Content Generation"
            description="Produce high-quality content with AI-driven writing tools"
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
          />
          <FeatureCard
            icon="🔍"
            title="Intelligent Analysis"
            description="Gain deep insights with our advanced AI analytics"
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
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
