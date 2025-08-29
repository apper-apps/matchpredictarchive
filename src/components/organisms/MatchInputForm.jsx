import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const MatchInputForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    championship: "",
    homeTeam: "",
    awayTeam: "",
    homeCoefficient: "",
    awayCoefficient: "",
    drawCoefficient: "",
  });
  
  const [errors, setErrors] = useState({});
  
  const championships = [
    "Premier League",
    "La Liga",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
    "Champions League",
    "Europa League",
    "World Cup",
    "Euro Championship",
    "Copa América",
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.championship) newErrors.championship = "Championship is required";
    if (!formData.homeTeam) newErrors.homeTeam = "Home team is required";
    if (!formData.awayTeam) newErrors.awayTeam = "Away team is required";
    if (formData.homeTeam === formData.awayTeam) {
      newErrors.awayTeam = "Teams must be different";
    }
    
    // Validate coefficients
    const homeCoef = parseFloat(formData.homeCoefficient);
    const awayCoef = parseFloat(formData.awayCoefficient);
    const drawCoef = parseFloat(formData.drawCoefficient);
    
    if (!formData.homeCoefficient || homeCoef <= 0) {
      newErrors.homeCoefficient = "Valid home coefficient required";
    }
    if (!formData.awayCoefficient || awayCoef <= 0) {
      newErrors.awayCoefficient = "Valid away coefficient required";
    }
    if (!formData.drawCoefficient || drawCoef <= 0) {
      newErrors.drawCoefficient = "Valid draw coefficient required";
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the form errors");
      return;
    }
    
    const matchData = {
      id: Date.now().toString(),
      date: new Date(formData.date + "T" + formData.time),
      championship: formData.championship,
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      homeCoefficient: parseFloat(formData.homeCoefficient),
      awayCoefficient: parseFloat(formData.awayCoefficient),
      drawCoefficient: parseFloat(formData.drawCoefficient),
    };
    
    onSubmit(matchData);
    toast.success("Match data submitted successfully!");
  };
  
  return (
    <Card className="w-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-warning rounded-lg flex items-center justify-center">
          <ApperIcon name="Calendar" className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-white">Match Details</h2>
          <p className="text-sm text-white/60">Enter the match information for prediction</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Match Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            required
          />
          
          <FormField
            label="Match Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            error={errors.time}
            required
          />
        </div>
        
        <FormField
          label="Championship"
          name="championship"
          type="select"
          value={formData.championship}
          onChange={handleChange}
          error={errors.championship}
          required
        >
          <option value="">Select Championship</option>
          {championships.map(champ => (
            <option key={champ} value={champ}>{champ}</option>
          ))}
        </FormField>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Home Team"
            name="homeTeam"
            placeholder="e.g., Manchester United"
            value={formData.homeTeam}
            onChange={handleChange}
            error={errors.homeTeam}
            required
          />
          
          <FormField
            label="Away Team"
            name="awayTeam"
            placeholder="e.g., Liverpool"
            value={formData.awayTeam}
            onChange={handleChange}
            error={errors.awayTeam}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Home Win Coefficient"
            name="homeCoefficient"
            type="number"
            step="0.01"
            min="1"
            placeholder="1.50"
            value={formData.homeCoefficient}
            onChange={handleChange}
            error={errors.homeCoefficient}
            required
          />
          
          <FormField
            label="Draw Coefficient"
            name="drawCoefficient"
            type="number"
            step="0.01"
            min="1"
            placeholder="3.20"
            value={formData.drawCoefficient}
            onChange={handleChange}
            error={errors.drawCoefficient}
            required
          />
          
          <FormField
            label="Away Win Coefficient"
            name="awayCoefficient"
            type="number"
            step="0.01"
            min="1"
            placeholder="2.80"
            value={formData.awayCoefficient}
            onChange={handleChange}
            error={errors.awayCoefficient}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Match...
            </>
          ) : (
            <>
              <ApperIcon name="Zap" className="w-5 h-5 mr-2" />
              Analyze Match
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default MatchInputForm;