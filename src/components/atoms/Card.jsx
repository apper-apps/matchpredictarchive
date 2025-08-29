import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children,
  variant = "default",
  ...props 
}, ref) => {
  const baseStyles = "rounded-lg border border-white/10 bg-surface/80 backdrop-blur-sm shadow-xl transition-all duration-200";
  
  const variants = {
    default: "p-6",
    compact: "p-4",
    hover: "hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1",
    glow: "shadow-primary-500/20 border-primary-500/30",
  };
  
  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;