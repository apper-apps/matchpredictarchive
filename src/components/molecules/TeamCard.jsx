import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const TeamCard = ({ team, metrics, isHome = false }) => {
  const getDefenseQualityColor = (quality) => {
    if (quality >= 80) return "success";
    if (quality >= 60) return "warning";
    return "error";
  };
  
  return (
    <Card variant="compact" className="hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Shield" className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{team}</h3>
            <Badge variant={isHome ? "accent" : "secondary"}>
              {isHome ? "Home" : "Away"}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">Attack Pattern</span>
          <Badge variant="default">{metrics?.attackPattern || "Balanced"}</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">Defense Quality</span>
          <Badge variant={getDefenseQualityColor(metrics?.defenseQuality || 0)}>
            {metrics?.defenseQuality || 0}%
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">Recent Form</span>
          <div className="flex items-center space-x-1">
            <ApperIcon name="TrendingUp" className="w-4 h-4 text-success" />
            <span className="text-sm text-success">{metrics?.victories || 0}W</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/10">
          <div className="flex justify-between text-xs text-white/60">
            <span>Goals: {metrics?.goalsScored || 0}</span>
            <span>Conceded: {metrics?.goalsConceded || 0}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;