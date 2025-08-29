import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import DataSourceCard from "@/components/molecules/DataSourceCard";
import { cn } from "@/utils/cn";
import { predictionService } from "@/services/api/predictionService";
import { toast } from "react-toastify";

const LiveDataFeed = ({ matchData }) => {
  const [liveData, setLiveData] = useState(null);
  const [dataSources, setDataSources] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (!matchData) return;

    const fetchLiveData = async () => {
      try {
        setLoading(true);
        const [liveMatchData, sourceStatus] = await Promise.all([
          predictionService.getLiveMatchData(matchData.homeTeam, matchData.awayTeam),
          predictionService.getDataSources()
        ]);
        
        setLiveData(liveMatchData);
        setDataSources(sourceStatus);
        setLastUpdate(new Date());
        
        if (liveMatchData.hasNewEvents) {
          toast.success("Nouvelles données de match disponibles!");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données en direct:", error);
        toast.error("Impossible de charger les données en direct");
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchLiveData();

    // Set up polling for live updates
    const interval = setInterval(fetchLiveData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [matchData]);

  if (!matchData) {
    return (
      <Card className="text-center py-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Radio" className="w-6 h-6 text-primary-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Flux de Données en Direct</h3>
        <p className="text-white/60">
          Sélectionnez un match pour voir les mises à jour en temps réel
        </p>
      </Card>
    );
  }

  if (loading && !liveData) {
    return (
      <Card>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-white/60">Chargement des données en direct...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Match Header */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-success to-primary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Radio" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">Flux en Direct</h2>
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          <Badge variant="success" className="flex items-center space-x-1">
            <ApperIcon name="Zap" size={12} />
            <span>LIVE</span>
          </Badge>
        </div>

        {liveData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-surface/30 rounded-lg">
              <div className="text-2xl font-display font-bold text-white mb-1">
                {liveData.homeScore}
              </div>
              <div className="text-sm text-white/60">{matchData.homeTeam}</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-lg border border-primary-500/20">
              <div className="text-lg font-semibold text-primary-400 mb-1">
                {liveData.minute}'
              </div>
              <div className="text-xs text-white/60">{liveData.status}</div>
            </div>
            
            <div className="text-center p-4 bg-surface/30 rounded-lg">
              <div className="text-2xl font-display font-bold text-white mb-1">
                {liveData.awayScore}
              </div>
              <div className="text-sm text-white/60">{matchData.awayTeam}</div>
            </div>
          </div>
        )}
      </Card>

      {/* Data Sources Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(dataSources).map(([key, source]) => (
          <DataSourceCard key={key} source={source} />
        ))}
      </div>

      {/* Live Events Feed */}
      {liveData?.events && liveData.events.length > 0 && (
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <ApperIcon name="Activity" className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold text-white">Événements en Direct</h3>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {liveData.events.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-full">
                    <ApperIcon name={event.type === 'goal' ? 'Target' : 'Clock'} size={14} className="text-primary-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{event.description}</div>
                    <div className="text-xs text-white/60">{event.player}</div>
                  </div>
                </div>
                <Badge variant={event.type === 'goal' ? 'success' : 'secondary'} className="text-xs">
                  {event.minute}'
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Statistics Comparison */}
      {liveData?.statistics && (
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <ApperIcon name="BarChart3" className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold text-white">Statistiques en Temps Réel</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(liveData.statistics).map(([stat, data]) => (
              <div key={stat} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80 capitalize">{stat.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white/60">{data.home}% - {data.away}%</span>
                </div>
                <div className="flex h-2 bg-surface/50 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-accent-500 to-primary-500 h-full transition-all duration-300"
                    style={{ width: `${data.home}%` }}
                  ></div>
                  <div 
                    className="bg-gradient-to-r from-secondary-500 to-warning h-full transition-all duration-300"
                    style={{ width: `${data.away}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default LiveDataFeed;