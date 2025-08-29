import React from "react";
import { cn } from "@/utils/cn";

const ConfidenceMeter = ({ confidence, size = "lg" }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;
  
  const getColor = (value) => {
    if (value < 40) return "#E74C3C"; // Red
    if (value < 70) return "#F39C12"; // Orange
    return "#27AE60"; // Green
  };
  
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };
  
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };
  
  return (
    <div className={cn("relative", sizes[size])}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={getColor(confidence)}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={cn("font-bold text-white", textSizes[size])}>
            {Math.round(confidence)}%
          </div>
          {size === "lg" && (
            <div className="text-xs text-white/60 mt-1">Confidence</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;