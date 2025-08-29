import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Error"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
      <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-white/60 max-w-md">{message}</p>
      </div>
      
      {onRetry && (
        <Button onClick={onRetry} variant="accent">
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
      
      <div className="text-xs text-white/40">
        If the problem persists, please check your internet connection
      </div>
    </div>
  );
};

export default Error;