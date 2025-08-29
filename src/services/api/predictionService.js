import teamMetricsData from "@/services/mockData/teamMetrics.json";
import sportsData from "@/services/mockData/sportsData.json";
import React from "react";
import Error from "@/components/ui/Error";

// Simulate realistic loading delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const predictionService = {
  async getTeamMetrics(homeTeam, awayTeam) {
    await delay(300);
    
    const homeMetrics = teamMetricsData.teams[homeTeam] || {
      attackPattern: "Balanced",
      defenseQuality: Math.floor(Math.random() * 40) + 50,
      firstHalfGoals: Math.random() * 1.5,
      victories: Math.floor(Math.random() * 15) + 10,
      goalsScored: Math.floor(Math.random() * 30) + 30,
      goalsConceded: Math.floor(Math.random() * 20) + 15,
    };
    
    const awayMetrics = teamMetricsData.teams[awayTeam] || {
      attackPattern: "Balanced", 
      defenseQuality: Math.floor(Math.random() * 40) + 50,
      firstHalfGoals: Math.random() * 1.5,
      victories: Math.floor(Math.random() * 15) + 10,
      goalsScored: Math.floor(Math.random() * 30) + 30,
      goalsConceded: Math.floor(Math.random() * 20) + 15,
    };
    
    return {
      home: homeMetrics,
      away: awayMetrics
    };
  },
  
  async generatePrediction(matchData, h2hData, teamMetrics) {
    await delay(800);
    
    try {
      // Calculate prediction using advanced algorithm simulation
      const homeCoef = matchData.homeCoefficient;
      const awayCoef = matchData.awayCoefficient;
      const drawCoef = matchData.drawCoefficient;
      
      // Convert coefficients to probabilities
      const homeProb = 1 / homeCoef;
      const awayProb = 1 / awayCoef;
      const drawProb = 1 / drawCoef;
      const totalProb = homeProb + awayProb + drawProb;
      
      // Normalize probabilities
      const normalizedHomeProb = (homeProb / totalProb) * 100;
      const normalizedAwayProb = (awayProb / totalProb) * 100;
      const normalizedDrawProb = (drawProb / totalProb) * 100;
      
      // Factor in head-to-head data
      let h2hWeight = 1;
      if (h2hData && h2hData.length > 0) {
        const homeWins = h2hData.filter(match => match.winner === matchData.homeTeam).length;
        const awayWins = h2hData.filter(match => match.winner === matchData.awayTeam).length;
        
        if (homeWins > awayWins) {
          h2hWeight = 1.1; // Boost home team
        } else if (awayWins > homeWins) {
          h2hWeight = 0.9; // Boost away team
        }
      }
      
      // Factor in team metrics
      let metricsWeight = 1;
      if (teamMetrics) {
        const homeDefense = teamMetrics.home?.defenseQuality || 70;
        const awayDefense = teamMetrics.away?.defenseQuality || 70;
        const homeAttack = teamMetrics.home?.goalsScored || 40;
        const awayAttack = teamMetrics.away?.goalsScored || 40;
        
        const homeStrength = (homeDefense + homeAttack) / 2;
        const awayStrength = (awayDefense + awayAttack) / 2;
        
        if (homeStrength > awayStrength) {
          metricsWeight = 1.05;
        } else if (awayStrength > homeStrength) {
          metricsWeight = 0.95;
        }
      }
      
      // Apply weights
      const adjustedHomeProb = normalizedHomeProb * h2hWeight * metricsWeight;
      const adjustedAwayProb = normalizedAwayProb * (2 - h2hWeight) * (2 - metricsWeight);
      
      // Determine winner
      let winner, confidence;
      if (adjustedHomeProb > adjustedAwayProb && adjustedHomeProb > normalizedDrawProb) {
        winner = matchData.homeTeam;
        confidence = Math.min(Math.max(adjustedHomeProb, 60), 95);
      } else if (adjustedAwayProb > adjustedHomeProb && adjustedAwayProb > normalizedDrawProb) {
        winner = matchData.awayTeam;
        confidence = Math.min(Math.max(adjustedAwayProb, 60), 95);
      } else {
        winner = "Draw";
        confidence = Math.min(Math.max(normalizedDrawProb, 45), 75);
      }
      
      // Generate scores based on team metrics and probabilities
      const homeGoals = Math.max(0, Math.round((teamMetrics?.home?.goalsScored || 40) / 30 + Math.random() * 2));
      const awayGoals = Math.max(0, Math.round((teamMetrics?.away?.goalsScored || 40) / 30 + Math.random() * 2));
      
      // Adjust scores based on predicted winner
      let finalHomeGoals, finalAwayGoals;
      if (winner === matchData.homeTeam) {
        finalHomeGoals = Math.max(homeGoals, awayGoals + 1);
        finalAwayGoals = awayGoals;
      } else if (winner === matchData.awayTeam) {
        finalHomeGoals = homeGoals;
        finalAwayGoals = Math.max(awayGoals, homeGoals + 1);
      } else {
        finalHomeGoals = Math.max(1, homeGoals);
        finalAwayGoals = finalHomeGoals; // Draw
      }
      
      // Generate first half scores (typically lower)
      const firstHalfHome = Math.floor(finalHomeGoals * (0.4 + Math.random() * 0.4));
      const firstHalfAway = Math.floor(finalAwayGoals * (0.4 + Math.random() * 0.4));
      
      const prediction = {
        matchId: matchData.id,
        winner,
        firstHalfScore: `${firstHalfHome}-${firstHalfAway}`,
        fullTimeScore: `${finalHomeGoals}-${finalAwayGoals}`,
        totalGoals: finalHomeGoals + finalAwayGoals,
        confidence: Math.round(confidence),
        analysisFactors: {
          "Coefficients Impact": "High",
          "H2H History": h2hData?.length > 0 ? "Analyzed" : "Limited",
          "Team Form": "Current",
          "Defense Quality": "Evaluated",
          "Attack Patterns": "Assessed"
        }
      };
      
      return prediction;
      
    } catch (error) {
      console.error("Prediction generation error:", error);
      throw new Error("Failed to generate prediction. Please try again.");
    }
  },
  
async getDataSources() {
    await delay(100);
    return sportsData.dataSources;
  },

  async getLiveMatchData(homeTeam, awayTeam) {
    await delay(500);
    
    // Simulate live match data
    const liveMatch = sportsData.liveMatches.find(
      match => match.homeTeam === homeTeam && match.awayTeam === awayTeam
    ) || {
      homeTeam,
      awayTeam,
      homeScore: Math.floor(Math.random() * 4),
      awayScore: Math.floor(Math.random() * 4),
      minute: Math.floor(Math.random() * 90) + 1,
      status: "En cours",
      hasNewEvents: Math.random() > 0.7,
      events: [
        {
          type: "goal",
          minute: 23,
          description: "But marqué",
          player: "Joueur A"
        },
        {
          type: "card",
          minute: 45,
          description: "Carton jaune",
          player: "Joueur B"
        }
      ],
      statistics: {
        possession: { home: 60, away: 40 },
        shots: { home: 8, away: 5 },
        corners: { home: 3, away: 2 },
        fouls: { home: 7, away: 9 }
      }
    };

    return liveMatch;
  },

  async getSourceStatus() {
    await delay(300);
    return Object.entries(sportsData.dataSources).reduce((acc, [key, source]) => {
      acc[key] = {
        ...source,
        reliability: Math.max(70, source.reliability + Math.floor(Math.random() * 10) - 5)
      };
      return acc;
}, {});
  }
};

export { predictionService };