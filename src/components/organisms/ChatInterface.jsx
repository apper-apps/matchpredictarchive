import React, { useState, useRef, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ChatMessage from "@/components/molecules/ChatMessage";
import ApperIcon from "@/components/ApperIcon";

const ChatInterface = ({ messages, onSendMessage, loading }) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };
  
  return (
    <Card className="h-[600px] flex flex-col">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-white/10">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <ApperIcon name="MessageSquare" className="w-5 h-5 text-white" />
        </div>
        <div>
<h2 className="text-xl font-display font-bold text-white">MatchPredict AI</h2>
          <p className="text-sm text-white/60">Assistant d'Analyse Football Avancé</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mb-4">
              <ApperIcon name="Bot" className="w-8 h-8 text-primary-400" />
            </div>
<h3 className="text-lg font-semibold text-white mb-2">
              Bienvenue sur MatchPredict Pro
            </h3>
            <p className="text-white/60 max-w-md">
              Je suis votre assistant IA pour les prédictions de matchs de football. Commencez par saisir les détails du match dans le formulaire, 
              et je vous fournirai une analyse détaillée et des prédictions basées sur des algorithmes avancés.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))
        )}
        
        {loading && (
<ChatMessage
            message="Analyse des données de match en utilisant des algorithmes avancés..."
            isBot={true}
            timestamp={new Date().toLocaleTimeString()}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
placeholder="Posez des questions sur les prédictions, l'analyse d'équipe, ou les insights de match..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          className="flex-1"
        />
        <Button 
          type="submit" 
          variant="accent" 
          size="icon"
          disabled={loading || !inputValue.trim()}
        >
          <ApperIcon name="Send" className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
};

export default ChatInterface;