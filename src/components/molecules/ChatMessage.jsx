import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ChatMessage = ({ message, isBot = false, timestamp }) => {
  return (
    <div className={cn("flex space-x-3 message-slide-in", isBot ? "" : "flex-row-reverse space-x-reverse")}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isBot ? "bg-gradient-to-br from-primary-500 to-secondary-500" : "bg-gradient-to-br from-accent-500 to-warning"
      )}>
        <ApperIcon 
          name={isBot ? "Bot" : "User"} 
          className="w-4 h-4 text-white" 
        />
      </div>
      
      <div className={cn("max-w-[80%] space-y-2", isBot ? "" : "text-right")}>
        <div className={cn(
          "inline-block px-4 py-3 rounded-lg text-sm",
          isBot 
            ? "bg-surface/80 text-white border border-white/10" 
            : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
        )}>
          {message}
        </div>
        
        {timestamp && (
          <div className="text-xs text-white/40">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;