import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-gradient-to-br from-white via-sky-50 to-green-100 px-8 py-16 relative overflow-hidden">

      <span className="absolute top-0 left-0 w-60 h-60 bg-teal-300 rounded-full blur-3xl opacity-30"></span>
      <span className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></span>

      <div className="relative text-center lg:text-left max-w-xl">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
          AI-Powered  
          <span className="text-teal-600"> Diabetes Risk</span>  
          Prediction
        </h1>

        <p className="text-gray-600 text-lg mt-4">
          Enter your health values and get an instant diabetes risk score using advanced machine learning.
        </p>

        <Link
          to="/predict"
          className="mt-8 inline-block bg-teal-600 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-700 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Get Started
        </Link>
      </div>

      
    <div className="relative flex justify-center lg:justify-end w-full lg:w-1/2 mb-10 lg:mb-0">

  
      <div className="absolute inset-0 flex justify-center lg:justify-end">
      <div className="w-72 h-72 lg:w-[340px] lg:h-[340px] 
      bg-teal-300 opacity-30 blur-3xl rounded-full animate-pulseGlow"></div>
      </div>

    <img src="/medical.png" alt="Medical Illustration" className=" w-72 lg:w-[410px] relative z-10 drop-shadow-2xl rounded-3xl opacity-95 mix-blend-multiply animate-fadeIn animate-float transition-transform duration-700 hover:scale-105"/></div>
    </section>
  );
}

export default HeroSection;
