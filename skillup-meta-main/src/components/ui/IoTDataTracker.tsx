import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  AlertCircle
} from 'lucide-react';

interface BiometricData {
  heartRate: number;
  concentration: number;
  motivation: number;
  stress: number;
  focus: number;
  timestamp: Date;
}

interface IoTDataTrackerProps {
  deviceId?: string;
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
  onDataUpdate?: (data: BiometricData) => void;
}

const IoTDataTracker: React.FC<IoTDataTrackerProps> = ({
  deviceId = 'default',
  onSessionStart,
  onSessionEnd,
  onDataUpdate
}) => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [currentSession, setCurrentSession] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [biometricData, setBiometricData] = useState<BiometricData>({
    heartRate: 72,
    concentration: 85,
    motivation: 78,
    stress: 45,
    focus: 82,
    timestamp: new Date()
  });

  const [sessionHistory, setSessionHistory] = useState<Array<{
    startTime: Date;
    endTime?: Date;
    duration: number;
    avgConcentration: number;
    avgMotivation: number;
  }>>([]);

  // Simulate IoT data updates
  useEffect(() => {
    if (deviceConnected && currentSession) {
      const interval = setInterval(() => {
        const newData: BiometricData = {
          heartRate: Math.max(60, Math.min(120, biometricData.heartRate + (Math.random() - 0.5) * 8)),
          concentration: Math.max(0, Math.min(100, biometricData.concentration + (Math.random() - 0.5) * 12)),
          motivation: Math.max(0, Math.min(100, biometricData.motivation + (Math.random() - 0.5) * 10)),
          stress: Math.max(0, Math.min(100, biometricData.stress + (Math.random() - 0.5) * 6)),
          focus: Math.max(0, Math.min(100, biometricData.focus + (Math.random() - 0.5) * 8)),
          timestamp: new Date()
        };
        
        setBiometricData(newData);
        onDataUpdate?.(newData);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [deviceConnected, currentSession, biometricData, onDataUpdate]);

  // Session timer
  useEffect(() => {
    if (currentSession) {
      const timer = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentSession]);

  const connectDevice = () => {
    setDeviceConnected(true);
    // In real app, this would handle actual device pairing
  };

  const disconnectDevice = () => {
    setDeviceConnected(false);
    if (currentSession) {
      stopSession();
    }
  };

  const startSession = () => {
    if (!deviceConnected) {
      alert('Please connect your IoT device first');
      return;
    }
    
    setCurrentSession(true);
    setSessionDuration(0);
    onSessionStart?.();
  };

  const stopSession = () => {
    if (currentSession) {
      const sessionData = {
        startTime: new Date(Date.now() - sessionDuration * 1000),
        endTime: new Date(),
        duration: sessionDuration,
        avgConcentration: biometricData.concentration,
        avgMotivation: biometricData.motivation
      };
      
      setSessionHistory(prev => [sessionData, ...prev.slice(0, 9)]);
      setCurrentSession(false);
      onSessionEnd?.();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (value: number, type: 'good' | 'warning' | 'danger') => {
    if (type === 'good') return value > 70 ? 'text-green-600' : value > 50 ? 'text-yellow-600' : 'text-red-600';
    if (type === 'warning') return value < 30 ? 'text-green-600' : value < 50 ? 'text-yellow-600' : 'text-red-600';
    return 'text-blue-600';
  };

  const getStatusIcon = (value: number, type: 'good' | 'warning' | 'danger') => {
    if (type === 'good') return value > 70 ? '🟢' : value > 50 ? '🟡' : '🔴';
    if (type === 'warning') return value < 30 ? '🟢' : value < 50 ? '🟡' : '🔴';
    return '🔵';
  };

  return (
    <div className="space-y-6">
      {/* Device Connection Status */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-white" />
            </div>
            IoT Device Connection
          </CardTitle>
          <CardDescription>
            Manage your fitness band connection and learning sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                {deviceConnected ? (
                  <Wifi className="h-8 w-8 text-green-500" />
                ) : (
                  <WifiOff className="h-8 w-8 text-red-500" />
                )}
              </div>
              <h3 className="font-semibold mb-1">
                {deviceConnected ? 'Device Connected' : 'Device Disconnected'}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {deviceConnected ? 'Fitness band active' : 'No device detected'}
              </p>
              <Button
                variant={deviceConnected ? "outline" : "default"}
                size="sm"
                onClick={deviceConnected ? disconnectDevice : connectDevice}
              >
                {deviceConnected ? 'Disconnect' : 'Connect Device'}
              </Button>
            </div>

            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                {currentSession ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Square className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <Play className="h-8 w-8 text-blue-500" />
                )}
              </div>
              <h3 className="font-semibold mb-1">
                {currentSession ? 'Session Active' : 'No Active Session'}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentSession ? 'Tracking in progress' : 'Start learning session'}
              </p>
              <Button
                variant={currentSession ? "destructive" : "default"}
                size="sm"
                onClick={currentSession ? stopSession : startSession}
                disabled={!deviceConnected}
              >
                {currentSession ? 'Stop Session' : 'Start Session'}
              </Button>
            </div>

            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-1">Session Duration</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentSession ? 'Current session time' : 'No active session'}
              </p>
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(sessionDuration)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Biometric Data */}
      {deviceConnected && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              Real-time Biometric Data
            </CardTitle>
            <CardDescription>
              Live data from your IoT device during learning sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="text-2xl font-bold text-green-600">{Math.round(biometricData.heartRate)}</div>
                <div className="text-xs text-green-600">BPM</div>
                <div className="text-xs text-muted-foreground">Heart Rate</div>
                <div className="text-xs mt-1">{getStatusIcon(biometricData.heartRate, 'good')}</div>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className={`text-2xl font-bold ${getStatusColor(biometricData.concentration, 'good')}`}>
                  {Math.round(biometricData.concentration)}%
                </div>
                <div className="text-xs text-blue-600">Concentration</div>
                <div className="text-xs text-muted-foreground">Focus Level</div>
                <div className="text-xs mt-1">{getStatusIcon(biometricData.concentration, 'good')}</div>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <div className={`text-2xl font-bold ${getStatusColor(biometricData.motivation, 'good')}`}>
                  {Math.round(biometricData.motivation)}%
                </div>
                <div className="text-xs text-purple-600">Motivation</div>
                <div className="text-xs text-muted-foreground">Drive Level</div>
                <div className="text-xs mt-1">{getStatusIcon(biometricData.motivation, 'good')}</div>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <div className={`text-2xl font-bold ${getStatusColor(biometricData.stress, 'warning')}`}>
                  {Math.round(biometricData.stress)}%
                </div>
                <div className="text-xs text-orange-600">Stress</div>
                <div className="text-xs text-muted-foreground">Pressure Level</div>
                <div className="text-xs mt-1">{getStatusIcon(biometricData.stress, 'warning')}</div>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/20">
                <div className={`text-2xl font-bold ${getStatusColor(biometricData.focus, 'good')}`}>
                  {Math.round(biometricData.focus)}%
                </div>
                <div className="text-xs text-cyan-600">Focus</div>
                <div className="text-xs text-muted-foreground">Attention</div>
                <div className="text-xs mt-1">{getStatusIcon(biometricData.focus, 'good')}</div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Concentration Level</span>
                  <span className="font-semibold">{Math.round(biometricData.concentration)}%</span>
                </div>
                <Progress value={biometricData.concentration} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Motivation Level</span>
                  <span className="font-semibold">{Math.round(biometricData.motivation)}%</span>
                </div>
                <Progress value={biometricData.motivation} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Focus Level</span>
                  <span className="font-semibold">{Math.round(biometricData.focus)}%</span>
                </div>
                <Progress value={biometricData.focus} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session History */}
      {sessionHistory.length > 0 && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Session History
            </CardTitle>
            <CardDescription>
              Track your learning sessions and biometric performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessionHistory.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">
                        Session {sessionHistory.length - index}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.startTime.toLocaleDateString()} - {formatTime(session.duration)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{Math.round(session.avgConcentration)}%</div>
                      <div className="text-xs text-muted-foreground">Concentration</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-yellow-600">{Math.round(session.avgMotivation)}%</div>
                      <div className="text-xs text-muted-foreground">Motivation</div>
                    </div>
                    <Badge variant="secondary">
                      {session.duration > 3600 ? 'Long' : session.duration > 1800 ? 'Medium' : 'Short'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights & Recommendations */}
      {deviceConnected && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              AI Insights & Recommendations
            </CardTitle>
            <CardDescription>
              Personalized suggestions based on your biometric data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  Current Status
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Learning Readiness:</span>
                    <Badge variant={biometricData.concentration > 80 ? "default" : "secondary"}>
                      {biometricData.concentration > 80 ? 'Optimal' : 'Good'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus Quality:</span>
                    <Badge variant={biometricData.focus > 75 ? "default" : "secondary"}>
                      {biometricData.focus > 75 ? 'High' : 'Medium'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Stress Level:</span>
                    <Badge variant={biometricData.stress < 50 ? "default" : "destructive"}>
                      {biometricData.stress < 50 ? 'Low' : 'High'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Recommendations
                </h4>
                <div className="space-y-2 text-sm">
                  {biometricData.concentration < 70 && (
                    <div className="p-2 rounded bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                      <div className="font-medium text-yellow-800 dark:text-yellow-200">Low Concentration</div>
                      <div className="text-yellow-700 dark:text-yellow-300">Take a short break and return to the task</div>
                    </div>
                  )}
                  
                  {biometricData.stress > 60 && (
                    <div className="p-2 rounded bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                      <div className="font-medium text-red-800 dark:text-red-200">High Stress</div>
                      <div className="text-red-700 dark:text-red-300">Consider switching to easier topics</div>
                    </div>
                  )}
                  
                  {biometricData.motivation > 80 && biometricData.concentration > 80 && (
                    <div className="p-2 rounded bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                      <div className="font-medium text-green-800 dark:text-green-200">Peak Performance</div>
                      <div className="text-green-700 dark:text-green-300">Great time to tackle challenging concepts!</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IoTDataTracker; 