import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      
      <div className="text-center">
        <p className="text-white/80 font-medium">{text}</p>
        <p className="text-xs text-white/60 mt-1">
          Analyzing data with advanced algorithms...
        </p>
      </div>
      
      <div className="flex items-center space-x-2 text-xs text-white/40">
        <ApperIcon name="Cpu" className="w-4 h-4 animate-pulse" />
        <span>AI Processing</span>
      </div>
    </div>
  );
};

export default Loading;