import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-accent-500 to-primary-400 bg-clip-text text-transparent">
                MatchPredict Pro
              </h1>
              <p className="text-xs text-white/60">Advanced Football Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-sm text-white/60">
              <ApperIcon name="Database" className="w-4 h-4" />
              <span>Real-time Data Sources</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;