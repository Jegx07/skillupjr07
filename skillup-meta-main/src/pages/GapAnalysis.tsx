import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Activity,
  Heart,
  Zap,
  Eye,
  BarChart3,
  LineChart,
  Smartphone,
  Wifi,
  WifiOff
} from 'lucide-react';

const GapAnalysis = () => {
  const [selectedSkill, setSelectedSkill] = useState('react');
  const [timeRange, setTimeRange] = useState('week');
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [currentSession, setCurrentSession] = useState(false);

  // Mock IoT data for analysis
  const [biometricTrends, setBiometricTrends] = useState({
    concentration: [85, 78, 92, 88, 95, 87, 90],
    motivation: [78, 82, 75, 88, 92, 85, 89],
    stress: [45, 52, 38, 42, 35, 48, 41],
    focus: [82, 76, 89, 85, 93, 88, 91]
  });

  const skills = [
    { id: 'react', name: 'React.js', level: 75, target: 90, category: 'Frontend' },
    { id: 'python', name: 'Python', level: 60, target: 85, category: 'Backend' },
    { id: 'nodejs', name: 'Node.js', level: 45, target: 80, category: 'Backend' },
    { id: 'typescript', name: 'TypeScript', level: 70, target: 90, category: 'Frontend' },
    { id: 'docker', name: 'Docker', level: 30, target: 75, category: 'DevOps' }
  ];

  const selectedSkillData = skills.find(s => s.id === selectedSkill);
  const gap = selectedSkillData ? selectedSkillData.target - selectedSkillData.level : 0;

  // IoT Data Analysis
  const getBiometricInsights = () => {
    const avgConcentration = biometricTrends.concentration.reduce((a, b) => a + b, 0) / biometricTrends.concentration.length;
    const avgMotivation = biometricTrends.motivation.reduce((a, b) => a + b, 0) / biometricTrends.motivation.length;
    
    return {
      concentration: avgConcentration,
      motivation: avgMotivation,
      recommendation: avgConcentration > 85 && avgMotivation > 80 
        ? 'Excellent focus and motivation! You\'re ready for advanced challenges.'
        : avgConcentration < 70 
        ? 'Consider shorter, focused learning sessions to improve concentration.'
        : 'Good progress! Try breaking down complex topics into smaller chunks.'
    };
  };

  const insights = getBiometricInsights();

  return (
    <div className="space-y-6">
      {/* IoT Device Status */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            IoT Device Status & Biometric Analysis
          </CardTitle>
          <CardDescription>
            Monitor your learning patterns and physical state during skill development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                {deviceConnected ? (
                  <Wifi className="h-6 w-6 text-green-500" />
                ) : (
                  <WifiOff className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div className="text-sm font-medium">Device Status</div>
              <div className="text-xs text-muted-foreground">
                {deviceConnected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            
            <div className="text-center p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-sm font-medium">Avg Concentration</div>
              <div className="text-lg font-bold text-blue-600">{Math.round(insights.concentration)}%</div>
            </div>
            
            <div className="text-center p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-sm font-medium">Avg Motivation</div>
              <div className="text-lg font-bold text-yellow-600">{Math.round(insights.motivation)}%</div>
            </div>
            
            <div className="text-center p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-sm font-medium">Focus Trend</div>
              <div className="text-xs text-muted-foreground">
                {biometricTrends.focus[biometricTrends.focus.length - 1] > biometricTrends.focus[0] ? '↗️ Improving' : '↘️ Declining'}
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Biometric Insights
            </h4>
            <p className="text-sm text-muted-foreground">{insights.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Skill Gap Analysis */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            Skill Gap Analysis
          </CardTitle>
          <CardDescription>
            Analyze the gap between your current skills and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Skill</label>
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Time Range</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {selectedSkillData && (
                <>
                  <div className="text-center p-4 rounded-lg border border-border/50">
                    <h3 className="text-lg font-semibold mb-2">{selectedSkillData.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current Level</div>
                        <div className="text-2xl font-bold text-blue-600">{selectedSkillData.level}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Target Level</div>
                        <div className="text-2xl font-bold text-green-600">{selectedSkillData.target}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Skill Gap</span>
                        <span className="font-semibold">{gap}%</span>
                      </div>
                      <Progress value={(selectedSkillData.level / selectedSkillData.target) * 100} className="h-2" />
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-sm font-medium mb-1">Estimated Time to Target</div>
                      <div className="text-lg font-bold text-primary">
                        {gap <= 10 ? '2-3 weeks' : gap <= 25 ? '1-2 months' : '3-6 months'}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biometric Trends */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <LineChart className="h-4 w-4 text-white" />
            </div>
            Biometric Trends & Learning Correlation
          </CardTitle>
          <CardDescription>
            Track how your physical state affects skill development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Concentration Pattern</h4>
              <div className="space-y-2">
                {biometricTrends.concentration.map((value, index) => (
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
              <h4 className="font-semibold mb-3">Motivation vs Progress</h4>
              <div className="space-y-2">
                {biometricTrends.motivation.map((value, index) => (
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
          
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Key Insights
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Your concentration peaks during morning sessions (Day 3, 5)</li>
              <li>• Motivation correlates strongly with skill progress</li>
              <li>• Consider scheduling complex tasks during high-focus periods</li>
              <li>• Stress levels below 50% show optimal learning conditions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered suggestions based on your biometric data and learning patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Learning Schedule Optimization</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Morning Focus Sessions</div>
                    <div className="text-sm text-muted-foreground">Schedule complex React concepts between 9-11 AM</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <Activity className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Breaks & Recovery</div>
                    <div className="text-sm text-muted-foreground">Take 5-minute breaks every 45 minutes</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Goal Setting</div>
                    <div className="text-sm text-muted-foreground">Set daily micro-goals to maintain motivation</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Skill Development Strategy</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Current Strengths</div>
                    <div className="text-sm text-muted-foreground">High concentration during structured learning</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Areas for Improvement</div>
                    <div className="text-sm text-muted-foreground">Maintain focus during longer sessions</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Next Steps</div>
                    <div className="text-sm text-muted-foreground">Practice React hooks during peak focus times</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white">
              <Smartphone className="mr-2 h-4 w-4" />
              Sync with IoT Device
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GapAnalysis;
