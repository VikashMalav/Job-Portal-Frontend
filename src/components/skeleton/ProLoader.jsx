import React from "react";

const ProLoader = ({ text = "Loading..." }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <div className="flex flex-col items-center gap-6 p-10 rounded-2xl shadow-2xl bg-white/80 border border-indigo-100">
      {/* Animated SVG spinner */}
      <svg className="animate-spin h-16 w-16 text-indigo-500 drop-shadow-lg" viewBox="0 0 50 50">
        <circle
          className="opacity-20"
          cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="6" fill="none"
        />
        <circle
          className="opacity-80"
          cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="6" fill="none"
          strokeDasharray="100" strokeDashoffset="60"
        />
      </svg>
      <span className="text-indigo-700 text-lg font-semibold tracking-wide animate-pulse">{text}</span>
    </div>
  </div>
);

export default ProLoader;
