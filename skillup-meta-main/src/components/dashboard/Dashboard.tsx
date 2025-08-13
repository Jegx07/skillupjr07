import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Target, TrendingUp, Clock, CheckCircle, PlayCircle, AlertCircle, Sparkles, UserCircle, Activity, Heart, Brain, Wifi, WifiOff } from 'lucide-react';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Waves } from '@/components/ui/waves-background';
import { useTheme } from '@/components/ui/ThemeProvider';

console.log('Dashboard page loaded');

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // IoT Device State
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [currentSession, setCurrentSession] = useState(false);
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    concentration: 85,
    motivation: 78,
    stress: 45,
    focus: 82
  });
  
  const skillStats = {
    mastered: 12,
    inProgress: 8,
    recommended: 15,
    totalAnalyzed: 35
  };

  // Mock IoT data simulation
  useEffect(() => {
    if (deviceConnected && currentSession) {
      const interval = setInterval(() => {
        setBiometricData(prev => ({
          heartRate: Math.max(60, Math.min(120, prev.heartRate + (Math.random() - 0.5) * 10)),
          concentration: Math.max(0, Math.min(100, prev.concentration + (Math.random() - 0.5) * 15)),
          motivation: Math.max(0, Math.min(100, prev.motivation + (Math.random() - 0.5) * 12)),
          stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 8)),
          focus: Math.max(0, Math.min(100, prev.focus + (Math.random() - 0.5) * 10))
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [deviceConnected, currentSession]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError('');
      const user = auth.currentUser;
      console.log('Current user:', user);
      if (!user) {
        setError('You must be logged in to view your dashboard.');
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log('Fetched userDoc:', userDoc);
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log('Fetched userDoc data:', data);
          let personalDetails = data.personalDetails || data;
          console.log('personalDetails:', personalDetails);
          if (personalDetails.firstName) {
            setFirstName(personalDetails.firstName);
          } else {
            setError('No personal details found. Please complete your profile.');
          }
        } else {
          setError('User data not found in database.');
        }
      } catch (e) {
        setError('Error fetching user data. Check console for details.');
        // Log error for debugging
        console.error('Error fetching user data:', e);
      } finally {
        setLoading(false);
      }
    };
    // If user is not immediately available, listen for auth state
    if (!auth.currentUser) {
      const unsubscribe = auth.onAuthStateChanged(() => {
        fetchUserDetails();
        unsubscribe();
      });
    } else {
      fetchUserDetails();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600 font-semibold text-center">
          {error}
          {error.includes('complete your profile') && (
            <div className="mt-4">
              <Button onClick={() => navigate('/personal-details')}>Complete Profile</Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const recentActivity = [
    { 
      skill: 'React.js', 
      action: 'Completed', 
      time: '2 hours ago', 
      level: 85,
      icon: '⚛️',
      status: 'completed'
    },
    { 
      skill: 'Python', 
      action: 'In Progress', 
      time: '1 day ago', 
      level: 65,
      icon: '🐍',
      status: 'progress'
    },
    { 
      skill: 'Data Analysis', 
      action: 'Started', 
      time: '3 days ago', 
      level: 25,
      icon: '📊',
      status: 'started'
    },
    { 
      skill: 'Machine Learning', 
      action: 'Recommended', 
      time: '5 days ago', 
      level: 0,
      icon: '🤖',
      status: 'recommended'
    },
  ];

  const weeklyGoals = [
    { 
      goal: 'Complete TypeScript Course', 
      progress: 75, 
      deadline: '2 days left',
      status: 'on-track',
      emoji: '🔥'
    },
    { 
      goal: 'Practice Algorithm Problems', 
      progress: 40, 
      deadline: '5 days left',
      status: 'behind',
      emoji: '⚡'
    },
    { 
      goal: 'Build Portfolio Project', 
      progress: 90, 
      deadline: '1 day left',
      status: 'ahead',
      emoji: '🚀'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
      case 'progress':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>;
      case 'started':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Started</Badge>;
      case 'recommended':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Recommended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-400';
      case 'behind':
        return 'text-yellow-400';
      case 'ahead':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleStartAnalysis = () => {
    navigate('/gap-analysis');
  };

  const handleViewGoals = () => {
    navigate('/career-goals');
  };

  const handleAddNewSkills = () => {
    navigate('/skills');
  };

  const handleSetCareerGoal = () => {
    navigate('/career-goals');
  };

  const toggleLearningSession = () => {
    if (!deviceConnected) {
      alert('Please connect your IoT device first');
      return;
    }
    setCurrentSession(!currentSession);
  };

  const connectDevice = () => {
    setDeviceConnected(true);
    // In real app, this would handle actual device pairing
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-visible z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative bg-card/80 backdrop-blur-sm p-12 md:p-16 rounded-3xl border border-border/50 shadow-2xl flex flex-col items-center justify-center min-h-[260px] mb-8" style={{marginTop: '32px'}}>
          <h1 className="text-5xl md:text-6xl font-extrabold flex items-center gap-4 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg" style={{lineHeight: 1.15, padding: '0.5em 0', marginBottom: '0.5em'}}>
            {`Welcome back, ${firstName || 'there'}!`}
            <Sparkles className="h-10 w-10 text-purple-400 drop-shadow-md" />
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground/90 font-semibold mb-6 text-center">
            {deviceConnected 
              ? 'Your IoT device is tracking your learning journey! 🚀'
              : 'Connect your IoT device to start tracking your learning journey! 📱'
            }
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 group hover:scale-105 text-lg md:text-xl"
              onClick={handleStartAnalysis}
            >
              <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Start Analysis
            </Button>
            {deviceConnected && (
              <Button
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold px-8 py-4 rounded-2xl transition-all duration-300 group hover:scale-105 text-lg"
                onClick={toggleLearningSession}
              >
                {currentSession ? (
                  <>
                    <AlertCircle className="mr-2 h-6 w-6" />
                    Stop Tracking
                  </>
                ) : (
                  <>
                    <Activity className="mr-2 h-6 w-6" />
                    Start Tracking
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm group hover:scale-105 transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skills Mastered</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Target className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{skillStats.mastered}</div>
            <p className="text-xs text-green-400/70 flex items-center mt-1">
              <span className="mr-1 text-base">🚀</span>
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm group hover:scale-105 transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Zap className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{skillStats.inProgress}</div>
            <p className="text-xs text-yellow-400/70">Active learning paths</p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm group hover:scale-105 transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recommended</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{skillStats.recommended}</div>
            <p className="text-xs text-purple-400/70">AI suggestions</p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm group hover:scale-105 transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyzed</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{skillStats.totalAnalyzed}</div>
            <p className="text-xs text-blue-400/70">Skills in database</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest skill development progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 group hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-foreground">{activity.skill}</span>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary mb-2">{activity.level}%</div>
                  <div className="w-24">
                    <Progress value={activity.level} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              Weekly Goals
            </CardTitle>
            <CardDescription>
              Track your learning milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="p-4 rounded-xl hover:bg-accent/50 group hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{goal.emoji}</span>
                    <span className="font-semibold text-sm">{goal.goal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {goal.deadline}
                    </Badge>
                    <span className={`text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status === 'on-track' ? '🔥 On Track' : 
                       goal.status === 'ahead' ? '🚀 Ahead' : '⚠️ Behind'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={goal.progress} className="flex-1 h-3" />
                  <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                </div>
              </div>
            ))}
            <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl"
              onClick={handleViewGoals}
            >
              <Target className="mr-2 h-4 w-4" />
              View All Goals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Tip Section */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            This Week's AI Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground leading-relaxed">
                Focus on building projects that combine your React skills with Python backend development. 
                This will create a powerful full-stack profile that's highly sought after in the current job market.
              </p>
              <Button variant="outline" className="mt-4 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            Quick Actions
          </CardTitle>
          <CardDescription>
            Jump into your skill development journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl group"
              onClick={handleAddNewSkills}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">📝</span>
              <span>Add New Skills</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 border-border/50 hover:border-purple-500/50 hover:text-purple-400 rounded-xl group"
              onClick={handleSetCareerGoal}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">🎯</span>
              <span>Set Career Goal</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 border-border/50 hover:border-green-500/50 hover:text-green-400 rounded-xl group"
              onClick={handleStartAnalysis}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">🧠</span>
              <span>AI Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* IoT Device Status & Controls - MOVED TO BOTTOM */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            IoT Device Status
          </CardTitle>
          <CardDescription>
            Monitor your learning biometrics and device connection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Device Connection */}
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
                onClick={connectDevice}
                disabled={deviceConnected}
              >
                {deviceConnected ? 'Connected' : 'Connect Device'}
              </Button>
            </div>

            {/* Learning Session Control */}
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <PlayCircle className={`h-8 w-8 ${currentSession ? 'text-green-500' : 'text-blue-500'}`} />
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
                onClick={toggleLearningSession}
                disabled={!deviceConnected}
              >
                {currentSession ? 'Stop Session' : 'Start Session'}
              </Button>
            </div>

            {/* Real-time Metrics */}
            <div className="text-center p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-1">Live Metrics</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentSession ? 'Real-time data' : 'No active session'}
              </p>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="font-semibold">{Math.round(biometricData.focus)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Motivation:</span>
                  <span className="font-semibold">{Math.round(biometricData.motivation)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biometric Data Display - MOVED TO BOTTOM */}
      {deviceConnected && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              Biometric Analytics
            </CardTitle>
            <CardDescription>
              Real-time data from your IoT device during learning sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="text-2xl font-bold text-green-600">{Math.round(biometricData.heartRate)}</div>
                <div className="text-xs text-green-600">BPM</div>
                <div className="text-xs text-muted-foreground">Heart Rate</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="text-2xl font-bold text-blue-600">{Math.round(biometricData.concentration)}%</div>
                <div className="text-xs text-blue-600">Concentration</div>
                <div className="text-xs text-muted-foreground">Focus Level</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <div className="text-2xl font-bold text-purple-600">{Math.round(biometricData.motivation)}%</div>
                <div className="text-xs text-purple-600">Motivation</div>
                <div className="text-xs text-muted-foreground">Drive Level</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <div className="text-2xl font-bold text-orange-600">{Math.round(biometricData.stress)}%</div>
                <div className="text-xs text-orange-600">Stress</div>
                <div className="text-xs text-muted-foreground">Pressure Level</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/20">
                <div className="text-2xl font-bold text-cyan-600">{Math.round(biometricData.focus)}%</div>
                <div className="text-xs text-cyan-600">Focus</div>
                <div className="text-xs text-muted-foreground">Attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
