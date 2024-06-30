import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-blue-400 text-transparent bg-clip-text">
            Embrace the AI Creation
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-emerald-100">
            Innovating for a creative future
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🌱"
            title="Eco-Friendly"
            description="Our solutions prioritize environmental sustainability"
          />
          <FeatureCard
            icon="💡"
            title="Innovative"
            description="Cutting-edge technology for modern challenges"
          />
          <FeatureCard
            icon="🔄"
            title="Circular Economy"
            description="Promoting reuse and recycling in all our processes"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-emerald-800 bg-opacity-50 p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:bg-opacity-70">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-emerald-300">{title}</h3>
      <p className="text-emerald-100">{description}</p>
    </div>
  );
};

export default HeroSection;
