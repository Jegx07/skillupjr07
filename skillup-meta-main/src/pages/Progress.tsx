
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Trophy, Target, TrendingUp, Award } from 'lucide-react';

const ProgressTracker = () => {
  const weeklyGoals = [
    { name: "Complete React Course", progress: 75, dueDate: "Dec 15" },
    { name: "Practice JavaScript", progress: 90, dueDate: "Dec 12" },
    { name: "AWS Certification Prep", progress: 30, dueDate: "Dec 20" }
  ];

  const achievements = [
    { name: "JavaScript Master", date: "Nov 28", icon: "🏆" },
    { name: "First Course Complete", date: "Nov 15", icon: "🎯" },
    { name: "Week Streak", date: "Nov 10", icon: "🔥" }
  ];

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chrome bg-clip-text text-transparent mb-2">
          Progress Tracker
        </h1>
        <p className="text-muted-foreground">
          Track your learning milestones and celebrate achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">68%</div>
              <div className="text-sm text-muted-foreground">Skills Mastery</div>
              <Progress value={68} className="w-full" />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Courses Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-xs text-muted-foreground">Skills Learned</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {goal.dueDate}
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {goal.progress}% complete
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-2 glass rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Learning Streak
            </CardTitle>
            <CardDescription>
              Keep up the momentum with daily learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl">🔥</div>
              <div className="text-3xl font-bold text-primary">7 Days</div>
              <div className="text-muted-foreground">Current Streak</div>
              <Button className="w-full glow-hover">
                Continue Streak
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Monthly Goals
            </CardTitle>
            <CardDescription>
              December 2024 objectives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Complete 3 Courses</span>
                <span className="text-primary font-medium">2/3</span>
              </div>
              <Progress value={67} />
              <div className="flex justify-between items-center">
                <span>Learn 10 New Skills</span>
                <span className="text-primary font-medium">7/10</span>
              </div>
              <Progress value={70} />
              <div className="flex justify-between items-center">
                <span>Practice 20 Hours</span>
                <span className="text-primary font-medium">15/20</span>
              </div>
              <Progress value={75} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;
