import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-md border border-white/20 bg-surface/50 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:bg-surface/70 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-white/80 block">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(baseStyles, error && "border-error focus:border-error focus:ring-error/20", className)}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;