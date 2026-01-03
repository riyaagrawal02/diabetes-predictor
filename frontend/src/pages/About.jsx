import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">
          About Us
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Diabetes Predict</strong> is a health-focused web application
          designed to help users understand their diabetes risk using data-driven
          predictions.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Our goal is to make early awareness simple and accessible for everyone.
          By combining technology with healthcare insights, we aim to support
          better lifestyle decisions.
        </p>

        <p className="text-gray-700 leading-relaxed">
          This platform is built using modern web technologies and focuses on
          accuracy, privacy, and ease of use.
        </p>
      </div>
    </div>
  );
}

export default About;
