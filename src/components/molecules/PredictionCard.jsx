import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ConfidenceMeter from "@/components/molecules/ConfidenceMeter";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const PredictionCard = ({ prediction, className }) => {
  if (!prediction) return null;
  
  const isHighConfidence = prediction.confidence >= 75;
  
  return (
    <Card 
      variant="glow" 
      className={cn(
        "prediction-glow border-2",
        isHighConfidence ? "border-success/50" : "border-warning/50",
        className
      )}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-2">
Prédiction de Match
          </h3>
          <Badge variant={isHighConfidence ? "success" : "warning"}>
            {isHighConfidence ? "Haute Confiance" : "Confiance Modérée"}
          </Badge>
        </div>
        <ConfidenceMeter confidence={prediction.confidence} size="md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-lg border border-accent-500/30">
            <ApperIcon name="Trophy" className="w-5 h-5 text-accent-500" />
            <div>
<p className="text-sm text-white/70">Vainqueur</p>
              <p className="font-bold text-accent-500">{prediction.winner}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg border border-primary-500/30">
            <ApperIcon name="Clock" className="w-5 h-5 text-primary-400" />
            <div>
<p className="text-sm text-white/70">Mi-Temps</p>
              <p className="font-bold text-primary-400">{prediction.firstHalfScore}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-success/20 to-primary-500/20 rounded-lg border border-success/30">
            <ApperIcon name="Target" className="w-5 h-5 text-success" />
<div>
              <p className="text-sm text-white/70">Temps Plein</p>
              <p className="font-bold text-success">{prediction.fullTimeScore}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-warning/20 to-accent-500/20 rounded-lg border border-warning/30">
            <ApperIcon name="Zap" className="w-5 h-5 text-warning" />
<div>
              <p className="text-sm text-white/70">Total de Buts</p>
              <p className="font-bold text-warning">{prediction.totalGoals}</p>
            </div>
          </div>
        </div>
      </div>
      
      {prediction.analysisFactors && (
<div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white/80 mb-3">Facteurs Clés d'Analyse</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(prediction.analysisFactors).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {value}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PredictionCard;