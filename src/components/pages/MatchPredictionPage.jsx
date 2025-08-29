import React, { useState, useEffect } from "react";
import MatchInputForm from "@/components/organisms/MatchInputForm";
import HeadToHeadForm from "@/components/organisms/HeadToHeadForm";
import ChatInterface from "@/components/organisms/ChatInterface";
import AnalyticsDashboard from "@/components/organisms/AnalyticsDashboard";
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
      addMessage(`Analyze match: ${data.homeTeam} vs ${data.awayTeam} in ${data.championship}`);
      
      // Simulate AI processing
      setTimeout(() => {
        addMessage(
          `Match data received! I can see ${data.homeTeam} (coefficient: ${data.homeCoefficient}) playing against ${data.awayTeam} (coefficient: ${data.awayCoefficient}) with a draw coefficient of ${data.drawCoefficient}. Please add head-to-head data for more accurate predictions.`,
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
    
    addMessage(`Added H2H match: ${h2hMatch.homeTeam} ${h2hMatch.homeScore}-${h2hMatch.awayScore} ${h2hMatch.awayTeam} (Winner: ${h2hMatch.winner})`);
    
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
      addMessage("Generating prediction using advanced algorithms...", true);
      
      const predictionResult = await predictionService.generatePrediction(
        matchData,
        [...h2hData],
        teamMetrics
      );
      
      setPrediction(predictionResult);
      
      addMessage(
        `Prediction complete! Based on my analysis, I predict ${predictionResult.winner} to win with a confidence of ${predictionResult.confidence}%. Full-time score: ${predictionResult.fullTimeScore}, Total goals: ${predictionResult.totalGoals}`,
        true
      );
      
      toast.success("Prediction generated successfully!");
      
    } catch (err) {
      setError(err.message);
      toast.error("Failed to generate prediction");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendMessage = (message) => {
    addMessage(message);
    
    // Simulate AI responses based on message content
    setTimeout(() => {
      let response = "I understand your question. ";
      
      if (message.toLowerCase().includes("predict") || message.toLowerCase().includes("winner")) {
        if (prediction) {
          response += `Based on my analysis, ${prediction.winner} is likely to win with ${prediction.confidence}% confidence.`;
        } else {
          response += "Please complete the match details and head-to-head data first for accurate predictions.";
        }
      } else if (message.toLowerCase().includes("score")) {
        if (prediction) {
          response += `I predict the final score will be ${prediction.fullTimeScore} with ${prediction.totalGoals} total goals.`;
        } else {
          response += "I'll be able to predict the exact score once you provide more match data.";
        }
      } else if (message.toLowerCase().includes("confidence")) {
        if (prediction) {
          response += `My prediction confidence is ${prediction.confidence}%, based on team performance metrics, head-to-head history, and betting coefficients.`;
        } else {
          response += "Prediction confidence will be calculated based on the data quality and historical patterns.";
        }
      } else {
        response += "I can help you with match predictions, team analysis, and betting insights. Feel free to ask about specific teams or matches!";
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