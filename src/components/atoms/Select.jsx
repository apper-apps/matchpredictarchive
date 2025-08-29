import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children,
  label,
  error,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-md border border-white/20 bg-surface/50 px-3 py-2 text-sm text-white focus:border-primary-500 focus:bg-surface/70 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none pr-10";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-white/80 block">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(baseStyles, error && "border-error focus:border-error focus:ring-error/20", className)}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none"
        />
      </div>
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;