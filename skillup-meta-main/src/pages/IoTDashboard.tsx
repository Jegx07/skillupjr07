import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Heart, 
  Brain, 
  Zap, 
  Eye, 
  Clock, 
  Play, 
  Square, 
  Wifi, 
  WifiOff,
  Smartphone,
  TrendingUp,
  AlertCircle,
  BarChart3,
  LineChart,
  Target,
  Calendar,
  Users,
  Award,
  Lightbulb
} from 'lucide-react';
import IoTDataTracker from '../components/ui/IoTDataTracker';

interface BiometricData {
  heartRate: number;
  concentration: number;
  motivation: number;
  stress: number;
  focus: number;
  timestamp: Date;
}

interface LearningSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  skill: string;
  avgConcentration: number;
  avgMotivation: number;
  avgFocus: number;
  stressLevel: number;
  notes?: string;
}

const IoTDashboard = () => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [currentSession, setCurrentSession] = useState(false);
  const [biometricData, setBiometricData] = useState<BiometricData>({
    heartRate: 72,
    concentration: 85,
    motivation: 78,
    stress: 45,
    focus: 82,
    timestamp: new Date()
  });

  const [learningSessions, setLearningSessions] = useState<LearningSession[]>([
    {
      id: '1',
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(),
      duration: 3600,
      skill: 'React.js',
      avgConcentration: 88,
      avgMotivation: 85,
      avgFocus: 90,
      stressLevel: 35,
      notes: 'Great focus on hooks and state management'
    },
    {
      id: '2',
      startTime: new Date(Date.now() - 7200000),
      endTime: new Date(Date.now() - 3600000),
      duration: 3600,
      skill: 'Python',
      avgConcentration: 75,
      avgMotivation: 70,
      avgFocus: 78,
      stressLevel: 55,
      notes: 'Struggled with complex algorithms'
    }
  ]);

  const [weeklyStats, setWeeklyStats] = useState({
    totalSessions: 12,
    totalTime: 28.5,
    avgConcentration: 82,
    avgMotivation: 78,
    improvement: 15
  });

  const handleSessionStart = () => {
    setCurrentSession(true);
    // In real app, this would start IoT data collection
  };

  const handleSessionEnd = () => {
    setCurrentSession(false);
    // In real app, this would stop IoT data collection and save session
  };

  const handleDataUpdate = (data: BiometricData) => {
    setBiometricData(data);
    // In real app, this would update real-time data
  };

  const getPerformanceScore = () => {
    const concentration = biometricData.concentration;
    const motivation = biometricData.motivation;
    const focus = biometricData.focus;
    const stress = biometricData.stress;
    
    // Weighted average with stress penalty
    let score = (concentration * 0.3 + motivation * 0.25 + focus * 0.25 + (100 - stress) * 0.2);
    
    if (stress > 70) score *= 0.8; // Stress penalty
    if (concentration < 50) score *= 0.9; // Low concentration penalty
    
    return Math.round(score);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 85) return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
    if (score >= 70) return <Badge variant="secondary">Good</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          IoT Learning Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Monitor your learning performance through biometric data and IoT insights
        </p>
      </div>

      {/* Performance Overview */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            Performance Overview
          </CardTitle>
          <CardDescription>
            Your current learning performance based on biometric data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">
                {getPerformanceScore()}/100
              </div>
              <div className="text-sm text-muted-foreground mb-2">Performance Score</div>
              {getPerformanceBadge(getPerformanceScore())}
            </div>
            
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(biometricData.concentration)}%
              </div>
              <div className="text-sm text-muted-foreground mb-2">Concentration</div>
              <Progress value={biometricData.concentration} className="h-2" />
            </div>
            
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(biometricData.motivation)}%
              </div>
              <div className="text-sm text-muted-foreground mb-2">Motivation</div>
              <Progress value={biometricData.motivation} className="h-2" />
            </div>
            
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                {Math.round(biometricData.focus)}%
              </div>
              <div className="text-sm text-muted-foreground mb-2">Focus</div>
              <Progress value={biometricData.focus} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Statistics */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            Weekly Learning Statistics
          </CardTitle>
          <CardDescription>
            Your learning performance over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {weeklyStats.totalSessions}
              </div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </div>
            
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {weeklyStats.totalTime}h
              </div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
            
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {weeklyStats.avgConcentration}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Concentration</div>
            </div>
            
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                +{weeklyStats.improvement}%
              </div>
              <div className="text-sm text-muted-foreground">Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main IoT Data Tracker */}
      <IoTDataTracker
        deviceId="user-device-001"
        onSessionStart={handleSessionStart}
        onSessionEnd={handleSessionEnd}
        onDataUpdate={handleDataUpdate}
      />

      {/* Learning Sessions Analysis */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            Learning Sessions Analysis
          </CardTitle>
          <CardDescription>
            Detailed analysis of your learning sessions and performance trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sessions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
              <TabsTrigger value="trends">Performance Trends</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sessions" className="space-y-4">
              <div className="space-y-3">
                {learningSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{session.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.startTime.toLocaleDateString()} - {Math.round(session.duration / 60)}min
                        </div>
                        {session.notes && (
                          <div className="text-xs text-muted-foreground mt-1">{session.notes}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{session.avgConcentration}%</div>
                        <div className="text-xs text-muted-foreground">Concentration</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-yellow-600">{session.avgMotivation}%</div>
                        <div className="text-xs text-muted-foreground">Motivation</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-cyan-600">{session.avgFocus}%</div>
                        <div className="text-xs text-muted-foreground">Focus</div>
                      </div>
                      <Badge variant={session.stressLevel < 50 ? "default" : "destructive"}>
                        {session.stressLevel < 50 ? 'Low Stress' : 'High Stress'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Concentration Trend</h4>
                  <div className="space-y-2">
                    {[85, 78, 92, 88, 95, 87, 90].map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-xs text-muted-foreground w-8">Day {index + 1}</div>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <div className="text-xs font-medium w-12">{value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Motivation Trend</h4>
                  <div className="space-y-2">
                    {[78, 82, 75, 88, 92, 85, 89].map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-xs text-muted-foreground w-8">Day {index + 1}</div>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <div className="text-xs font-medium w-12">{value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Learning Patterns
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <div className="font-medium text-blue-800 dark:text-blue-200">Peak Performance Time</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Your concentration peaks between 9-11 AM</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                      <div className="font-medium text-green-800 dark:text-green-200">Optimal Session Length</div>
                      <div className="text-sm text-green-700 dark:text-green-300">45-60 minute sessions work best for you</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                      <div className="font-medium text-purple-800 dark:text-purple-200">Stress Management</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Take breaks when stress exceeds 60%</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    Recommendations
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                      <div className="font-medium text-yellow-800 dark:text-yellow-200">Schedule Complex Tasks</div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">Plan difficult concepts during peak focus times</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                      <div className="font-medium text-orange-800 dark:text-orange-200">Break Strategy</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">5-minute breaks every 45 minutes</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
                      <div className="font-medium text-cyan-800 dark:text-cyan-200">Goal Setting</div>
                      <div className="text-sm text-cyan-700 dark:text-cyan-300">Set daily micro-goals to maintain motivation</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          size="lg"
        >
          <Users className="mr-2 h-5 w-5" />
          Share Progress
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="border-primary/30 text-primary hover:bg-primary/10"
        >
          <TrendingUp className="mr-2 h-5 w-5" />
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default IoTDashboard; 