// src/components/FeatureCard.jsx
import React from "react";

const FeatureCard = ({ title, description, icon, isPrimary = false }) => {
  return (
    <div
      className={`relative rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
        isPrimary ? "bg-green-600 text-white" : "bg-white dark:bg-slate-800"
      }`}
    >
      {/* Top Curve */}
      <div
        className={`absolute top-0 left-0 w-full h-16 overflow-hidden ${
          isPrimary ? "bg-green-500" : "bg-green-100 dark:bg-green-900/20"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
        >
          <path
            d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,170.7C672,181,768,203,864,208C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill={isPrimary ? "#2e7d32" : "#81c784"}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="pt-12 relative z-10">
        <div
          className={`mb-4 p-3 rounded-lg inline-block ${
            isPrimary ? "bg-green-500" : "bg-green-100 dark:bg-green-900/30"
          }`}
        >
          {icon}
        </div>
        <h3
          className={`font-bold text-xl mb-2 ${
            isPrimary ? "text-white" : "text-slate-900 dark:text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`${
            isPrimary ? "text-green-50" : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
