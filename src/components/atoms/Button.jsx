import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
  
  const variants = {
    default: "bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-500 hover:to-primary-400 shadow-lg hover:shadow-primary-500/25",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-lg hover:shadow-secondary-500/25",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-400 hover:to-accent-500 shadow-lg hover:shadow-accent-500/25",
    outline: "border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white",
    ghost: "text-white/70 hover:text-white hover:bg-white/10",
    danger: "bg-error text-white hover:bg-error/90 shadow-lg hover:shadow-error/25",
  };
  
  const sizes = {
    default: "h-10 px-6 py-2 text-sm",
    sm: "h-8 px-4 py-1 text-xs",
    lg: "h-12 px-8 py-3 text-base",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;