import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
          Welcome to the Future
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-300">
          Experience innovation like never before
        </p>
        <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
