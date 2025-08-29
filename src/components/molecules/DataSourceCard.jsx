import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DataSourceCard = ({ source }) => {
  const getStatusColor = (reliability) => {
    if (reliability >= 90) return "success";
    if (reliability >= 80) return "warning";
    return "error";
  };

  const getStatusIcon = (reliability) => {
    if (reliability >= 90) return "CheckCircle";
    if (reliability >= 80) return "AlertTriangle";
    return "XCircle";
  };

  const formatLastUpdate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return "À l'instant";
    if (diffMinutes < 60) return `Il y a ${diffMinutes}min`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    return `Il y a ${diffHours}h`;
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-105",
      source.reliability >= 90 && "border-success/30 bg-success/5",
      source.reliability >= 80 && source.reliability < 90 && "border-warning/30 bg-warning/5",
      source.reliability < 80 && "border-error/30 bg-error/5"
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              source.reliability >= 90 && "bg-success/20",
              source.reliability >= 80 && source.reliability < 90 && "bg-warning/20",
              source.reliability < 80 && "bg-error/20"
            )}>
              <ApperIcon 
                name={getStatusIcon(source.reliability)} 
                size={16} 
                className={cn(
                  source.reliability >= 90 && "text-success",
                  source.reliability >= 80 && source.reliability < 90 && "text-warning",
                  source.reliability < 80 && "text-error"
                )}
              />
            </div>
            <h3 className="font-semibold text-white text-sm">{source.name}</h3>
          </div>
          
          <Badge variant={getStatusColor(source.reliability)} className="text-xs">
            {source.reliability}%
          </Badge>
        </div>

        {/* Reliability Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Fiabilité</span>
            <span className="text-white/80">{source.reliability}%</span>
          </div>
          <div className="w-full bg-surface/50 rounded-full h-2 overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                source.reliability >= 90 && "bg-gradient-to-r from-success/70 to-success",
                source.reliability >= 80 && source.reliability < 90 && "bg-gradient-to-r from-warning/70 to-warning",
                source.reliability < 80 && "bg-gradient-to-r from-error/70 to-error"
              )}
              style={{ width: `${source.reliability}%` }}
            ></div>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">Dernière MAJ</span>
          <div className="flex items-center space-x-1">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              source.reliability >= 90 && "bg-success animate-pulse",
              source.reliability >= 80 && source.reliability < 90 && "bg-warning animate-pulse",
              source.reliability < 80 && "bg-error"
            )}></div>
            <span className="text-white/80">{formatLastUpdate(source.lastUpdate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DataSourceCard;