"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { FlipWords } from "./ui/FlipWords";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const words = ["Innovation", "Efficiency", "Creativity"];

  useGSAP(() => {
    gsap.context(() => {
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
            Revolutionize Your <FlipWords words={words} /> <br /> Journey with
            AI
          </h1>

          <div className="flex items-center mt-12 flex-wrap justify-center gap-5">
            <Button onClick={() => router.push("/dashboard")} size="lg">
              Start Creating
            </Button>
            <Link href="https://github.com/Devsethi3/Artigen" target="_blank">
              <Button variant="secondary" size="lg">
                ⭐ Star on <FaGithub className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎨"
            title="Smart Visual Generation"
            description="Easily create amazing content ideas with simple prompt using our AI-powered design tools."
          />
          <FeatureCard
            icon="📝"
            title="Advanced Content Creation"
            description="Generate high-quality, engaging content with our AI-driven writing assistants."
          />
          <FeatureCard
            icon="📊"
            title="Deep Analytics"
            description="Unlock valuable insights with our advanced AI-powered analytics tools."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="bg-emerald-800 bg-opacity-50 p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:bg-opacity-70 transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-emerald-300">{title}</h3>
        <p className="text-emerald-100">{description}</p>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default HeroSection;
