import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No Data Available",
  message = "There's nothing to display right now",
  actionLabel,
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-8 h-8 text-white/40" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-white/60 max-w-md">{message}</p>
      </div>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="accent">
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;