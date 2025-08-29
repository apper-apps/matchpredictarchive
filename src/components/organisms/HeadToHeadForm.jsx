import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const HeadToHeadForm = ({ homeTeam, awayTeam, onSubmit, h2hData = [] }) => {
  const [formData, setFormData] = useState({
    date: "",
    homeScore: "",
    awayScore: "",
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.homeScore && formData.homeScore !== "0") {
      newErrors.homeScore = "Home score is required";
    }
    if (!formData.awayScore && formData.awayScore !== "0") {
      newErrors.awayScore = "Away score is required";
    }
    
    const homeScore = parseInt(formData.homeScore);
    const awayScore = parseInt(formData.awayScore);
    
    if (isNaN(homeScore) || homeScore < 0) {
      newErrors.homeScore = "Valid score required";
    }
    if (isNaN(awayScore) || awayScore < 0) {
      newErrors.awayScore = "Valid score required";
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
    
    const homeScore = parseInt(formData.homeScore);
    const awayScore = parseInt(formData.awayScore);
    
    let winner = "Draw";
    if (homeScore > awayScore) winner = homeTeam;
    else if (awayScore > homeScore) winner = awayTeam;
    
    const h2hMatch = {
      matchId: Date.now().toString(),
      date: new Date(formData.date),
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      winner,
    };
    
    onSubmit(h2hMatch);
    setFormData({ date: "", homeScore: "", awayScore: "" });
    toast.success("Head-to-head match added successfully!");
  };
  
  const getWinnerBadge = (match) => {
    if (match.winner === "Draw") return <Badge variant="secondary">Draw</Badge>;
    if (match.winner === homeTeam) return <Badge variant="success">{homeTeam}</Badge>;
    return <Badge variant="accent">{awayTeam}</Badge>;
  };
  
  if (!homeTeam || !awayTeam) {
    return (
      <Card className="text-center py-8">
        <ApperIcon name="Users" className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <p className="text-white/60">Please select both teams first to add head-to-head data</p>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <ApperIcon name="History" className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-white">Head-to-Head History</h2>
          <p className="text-sm text-white/60">{homeTeam} vs {awayTeam}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <FormField
          label="Match Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label={`${homeTeam} Goals`}
            name="homeScore"
            type="number"
            min="0"
            placeholder="0"
            value={formData.homeScore}
            onChange={handleChange}
            error={errors.homeScore}
            required
          />
          
          <FormField
            label={`${awayTeam} Goals`}
            name="awayScore"
            type="number"
            min="0"
            placeholder="0"
            value={formData.awayScore}
            onChange={handleChange}
            error={errors.awayScore}
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Match
        </Button>
      </form>
      
      {h2hData.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-white/80 text-sm">Previous Matches</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {h2hData.map((match) => (
              <div key={match.matchId} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-white/60">
                    {match.date.toLocaleDateString()}
                  </div>
                  <div className="font-medium text-white">
                    {match.homeScore} - {match.awayScore}
                  </div>
                </div>
                {getWinnerBadge(match)}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {h2hData.length === 0 && (
        <div className="text-center py-8 border-t border-white/10">
          <ApperIcon name="Clock" className="w-8 h-8 text-white/40 mx-auto mb-2" />
          <p className="text-sm text-white/60">No head-to-head data added yet</p>
        </div>
      )}
    </Card>
  );
};

export default HeadToHeadForm;