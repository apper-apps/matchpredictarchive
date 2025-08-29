import React from "react";
import Card from "@/components/atoms/Card";
import TeamCard from "@/components/molecules/TeamCard";
import PredictionCard from "@/components/molecules/PredictionCard";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const AnalyticsDashboard = ({ matchData, h2hData, teamMetrics, prediction }) => {
  const getH2HStats = () => {
    if (!h2hData || h2hData.length === 0) return null;
    
    const homeWins = h2hData.filter(match => match.winner === matchData?.homeTeam).length;
    const awayWins = h2hData.filter(match => match.winner === matchData?.awayTeam).length;
    const draws = h2hData.filter(match => match.winner === "Draw").length;
    
    return { homeWins, awayWins, draws, total: h2hData.length };
  };
  
  const h2hStats = getH2HStats();
  
  if (!matchData) {
    return (
      <Card className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="BarChart3" className="w-8 h-8 text-primary-400" />
        </div>
<h3 className="text-lg font-semibold text-white mb-2">Tableau de Bord Analytique</h3>
        <p className="text-white/60">
          Saisissez les détails du match pour voir l'analyse complète des équipes et les prédictions
        </p>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Trophy" className="w-5 h-5 text-white" />
          </div>
          <div>
<h2 className="text-xl font-display font-bold text-white">Aperçu du Match</h2>
            <p className="text-sm text-white/60">
              {matchData.championship} • {matchData.date.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-white mb-1">
              {matchData.homeTeam}
            </div>
<Badge variant="accent">Domicile</Badge>
            <div className="text-lg font-semibold text-accent-500 mt-2">
              {matchData.homeCoefficient}
            </div>
          </div>
          
          <div className="text-center flex flex-col justify-center">
<div className="text-4xl font-display font-bold text-primary-400 mb-2">VS</div>
            <div className="text-lg font-semibold text-white/60">
              Match Nul: {matchData.drawCoefficient}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-white mb-1">
              {matchData.awayTeam}
            </div>
<Badge variant="secondary">Extérieur</Badge>
            <div className="text-lg font-semibold text-secondary-500 mt-2">
              {matchData.awayCoefficient}
            </div>
          </div>
        </div>
      </Card>
      
      {h2hStats && (
        <Card>
          <div className="flex items-center space-x-3 mb-4">
<ApperIcon name="History" className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold text-white">Statistiques Face-à-Face</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
<div className="text-2xl font-bold text-success">{h2hStats.homeWins}</div>
              <div className="text-xs text-white/60">Victoires {matchData.homeTeam}</div>
            </div>
            <div>
<div className="text-2xl font-bold text-white/60">{h2hStats.draws}</div>
              <div className="text-xs text-white/60">Matchs Nuls</div>
            </div>
            <div>
<div className="text-2xl font-bold text-warning">{h2hStats.awayWins}</div>
              <div className="text-xs text-white/60">Victoires {matchData.awayTeam}</div>
            </div>
            <div>
<div className="text-2xl font-bold text-primary-400">{h2hStats.total}</div>
              <div className="text-xs text-white/60">Total des Matchs</div>
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamCard 
          team={matchData.homeTeam} 
          metrics={teamMetrics?.home} 
          isHome={true} 
        />
        <TeamCard 
          team={matchData.awayTeam} 
          metrics={teamMetrics?.away} 
          isHome={false} 
        />
      </div>
      
      {prediction && (
        <PredictionCard prediction={prediction} />
      )}
    </div>
  );
};

export default AnalyticsDashboard;