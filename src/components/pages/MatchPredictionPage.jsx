import React, { useState, useEffect } from "react";
import MatchInputForm from "@/components/organisms/MatchInputForm";
import HeadToHeadForm from "@/components/organisms/HeadToHeadForm";
import ChatInterface from "@/components/organisms/ChatInterface";
import AnalyticsDashboard from "@/components/organisms/AnalyticsDashboard";
import LiveDataFeed from "@/components/molecules/LiveDataFeed";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { predictionService } from "@/services/api/predictionService";
import { toast } from "react-toastify";
const MatchPredictionPage = () => {
  const [matchData, setMatchData] = useState(null);
  const [h2hData, setH2hData] = useState([]);
  const [teamMetrics, setTeamMetrics] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const addMessage = (text, isBot = false) => {
    const newMessage = {
      text,
      isBot,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };
  
  const handleMatchSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      setMatchData(data);
      
      // Add user message
addMessage(`Analyse du match: ${data.homeTeam} vs ${data.awayTeam} en ${data.championship}`);
      
      // Simulate AI processing
      setTimeout(() => {
        addMessage(
          `Données de match reçues ! Je vois ${data.homeTeam} (cote: ${data.homeCoefficient}) jouant contre ${data.awayTeam} (cote: ${data.awayCoefficient}) avec une cote de match nul de ${data.drawCoefficient}. Veuillez ajouter des données de confrontations directes pour des prédictions plus précises.`,
          true
        );
      }, 1000);
      
      // Load team metrics
      const metrics = await predictionService.getTeamMetrics(data.homeTeam, data.awayTeam);
      setTeamMetrics(metrics);
      
    } catch (err) {
      setError(err.message);
      toast.error("Failed to process match data");
    } finally {
      setLoading(false);
    }
  };
  
  const handleH2HSubmit = (h2hMatch) => {
    setH2hData(prev => [...prev, h2hMatch]);
    
addMessage(`Match H2H ajouté: ${h2hMatch.homeTeam} ${h2hMatch.homeScore}-${h2hMatch.awayScore} ${h2hMatch.awayTeam} (Vainqueur: ${h2hMatch.winner})`);
    
    // Trigger prediction if we have enough data
    if (h2hData.length >= 2) {
      setTimeout(() => {
        generatePrediction();
      }, 1000);
    }
  };
  
  const generatePrediction = async () => {
    if (!matchData) return;
    
    setLoading(true);
    
    try {
addMessage("Génération de la prédiction en utilisant des algorithmes avancés...", true);
      
      const predictionResult = await predictionService.generatePrediction(
        matchData,
        [...h2hData],
        teamMetrics
      );
      
      setPrediction(predictionResult);
      
addMessage(
        `Prédiction terminée ! Basé sur mon analyse, je prédis que ${predictionResult.winner} va gagner avec une confiance de ${predictionResult.confidence}%. Score final: ${predictionResult.fullTimeScore}, Total de buts: ${predictionResult.totalGoals}`,
        true
      );
      
toast.success("Prédiction générée avec succès !");
      
    } catch (err) {
      setError(err.message);
toast.error("Échec de la génération de la prédiction");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendMessage = (message) => {
    addMessage(message);
    
    // Simulate AI responses based on message content
    setTimeout(() => {
let response = "Je comprends votre question. ";
      
if (message.toLowerCase().includes("predict") || message.toLowerCase().includes("winner") || message.toLowerCase().includes("prédiction") || message.toLowerCase().includes("gagnant")) {
        if (prediction) {
          response += `Basé sur mon analyse, ${prediction.winner} est susceptible de gagner avec ${prediction.confidence}% de confiance.`;
        } else {
          response += "Veuillez d'abord compléter les détails du match et les données de confrontations directes pour des prédictions précises.";
        }
      } else if (message.toLowerCase().includes("score")) {
        if (prediction) {
          response += `Je prédis que le score final sera ${prediction.fullTimeScore} avec ${prediction.totalGoals} buts au total.`;
        } else {
          response += "Je pourrai prédire le score exact une fois que vous fournirez plus de données de match.";
        }
      } else if (message.toLowerCase().includes("confidence") || message.toLowerCase().includes("confiance")) {
        if (prediction) {
          response += `Ma confiance de prédiction est de ${prediction.confidence}%, basée sur les métriques de performance d'équipe, l'historique des confrontations directes et les cotes de paris.`;
        } else {
          response += "La confiance de prédiction sera calculée en fonction de la qualité des données et des tendances historiques.";
        }
      } else {
        response += "Je peux vous aider avec les prédictions de match, l'analyse d'équipe et les insights de paris. N'hésitez pas à poser des questions sur des équipes ou des matchs spécifiques !";
      }
      
      addMessage(response, true);
    }, 800);
  };
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          message={error} 
          onRetry={() => {
            setError(null);
            if (matchData) generatePrediction();
          }}
        />
      </div>
    );
  }
  
  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Forms and Chat */}
        <div className="xl:col-span-1 space-y-8">
          <MatchInputForm onSubmit={handleMatchSubmit} loading={loading} />
          
          <HeadToHeadForm
            homeTeam={matchData?.homeTeam}
            awayTeam={matchData?.awayTeam}
            onSubmit={handleH2HSubmit}
            h2hData={h2hData}
          />
          
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={loading}
          />
        </div>
        
        {/* Right Column - Analytics Dashboard */}
        <div className="xl:col-span-2">
          {loading && !matchData ? (
            <Loading text="Processing match data..." />
          ) : (
            <AnalyticsDashboard
              matchData={matchData}
              h2hData={h2hData}
              teamMetrics={teamMetrics}
              prediction={prediction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchPredictionPage;