import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, Play, Star, Clock, ExternalLink, Filter, Sparkles, Award } from 'lucide-react';

const Recommendations = () => {
  const [platformFilter, setPlatformFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [costFilter, setCostFilter] = useState('all');
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [learningPath, setLearningPath] = useState<any[]>([]);

  const usdToInr = (usd) => {
    if (!usd) return null;
    // Handle prices like "$89.99" or "$49/month"
    const match = usd.match(/\$([0-9.]+)/);
    if (!match) return usd;
    const value = parseFloat(match[1]);
    const inr = Math.round(value * 83);
    return `₹${inr.toLocaleString('en-IN')}` + (usd.includes('/month') ? '/month' : '');
  };

  const courses = [
    {
      title: "Complete React Developer Course",
      provider: "Udemy",
      rating: 4.8,
      duration: "40 hours",
      price: usdToInr("$89.99"),
      originalPrice: usdToInr("$199.99"),
      skills: ["React", "JavaScript", "Redux"],
      image: "📚",
      recommended: true,
      difficulty: "Intermediate",
      link: "https://www.udemy.com/course/react-the-complete-guide/"
    },
    {
      title: "AWS Cloud Practitioner",
      provider: "AWS Training",
      rating: 4.9,
      duration: "20 hours",
      price: "Free",
      originalPrice: null,
      skills: ["AWS", "Cloud Computing", "DevOps"],
      image: "☁️",
      recommended: true,
      difficulty: "Beginner",
      link: "https://www.aws.training/Details/Curriculum?id=20685"
    },
    {
      title: "Python for Data Science",
      provider: "Coursera",
      rating: 4.7,
      duration: "60 hours",
      price: usdToInr("$49/month"),
      originalPrice: null,
      skills: ["Python", "Data Analysis", "Machine Learning"],
      image: "🐍",
      recommended: false,
      difficulty: "Advanced",
      link: "https://www.coursera.org/specializations/data-science-python"
    },
    {
      title: "Full-Stack JavaScript",
      provider: "Udemy",
      rating: 4.6,
      duration: "35 hours",
      price: usdToInr("$79.99"),
      originalPrice: usdToInr("$159.99"),
      skills: ["JavaScript", "Node.js", "MongoDB"],
      image: "💻",
      recommended: true,
      difficulty: "Intermediate",
      link: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/"
    },
    {
      title: "UI/UX Design Masterclass",
      provider: "Coursera",
      rating: 4.8,
      duration: "25 hours",
      price: usdToInr("$39/month"),
      originalPrice: null,
      skills: ["Design", "Figma", "User Research"],
      image: "🎨",
      recommended: false,
      difficulty: "Beginner",
      link: "https://www.coursera.org/professional-certificates/google-ux-design"
    },
    {
      title: "Cybersecurity Fundamentals",
      provider: "edX",
      rating: 4.5,
      duration: "30 hours",
      price: "Free",
      originalPrice: null,
      skills: ["Security", "Networking", "Ethical Hacking"],
      image: "🔒",
      recommended: true,
      difficulty: "Intermediate",
      link: "https://www.edx.org/course/cybersecurity-fundamentals"
    }
  ];

  // Career paths (copy from CareerGoals for consistency)
  const careerPaths = [
    {
      id: "full-stack-developer",
      name: "Full-Stack Developer",
      description: "Become a proficient full-stack developer, mastering both frontend and backend technologies.",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "DevOps", "Database"]
    },
    {
      id: "data-scientist",
      name: "Data Scientist",
      description: "Learn to analyze data, build machine learning models, and create data-driven applications.",
      skills: ["Python", "Data Analysis", "Machine Learning", "Data Visualization", "SQL"]
    },
    {
      id: "cloud-architect",
      name: "Cloud Architect",
      description: "Design and manage scalable, secure, and cost-effective cloud infrastructure.",
      skills: ["AWS", "Azure", "DevOps", "Networking", "Security"]
    },
    {
      id: "cybersecurity-specialist",
      name: "Cybersecurity Specialist",
      description: "Master the principles of cybersecurity, ethical hacking, and secure coding.",
      skills: ["Security", "Networking", "Ethical Hacking", "Penetration Testing"]
    }
  ];

  useEffect(() => {
    // Load user skills from localStorage (set by SkillsInput)
    const skills = localStorage.getItem('skillsList');
    setUserSkills(skills ? JSON.parse(skills) : []);
    // Load selected career goal from localStorage (set by CareerGoals)
    const goals = localStorage.getItem('careerGoals');
    let selected = null;
    if (goals) {
      const arr = JSON.parse(goals);
      if (arr.length > 0) {
        selected = careerPaths.find(c => c.id === arr[0]);
      }
    }
    setSelectedCareer(selected);
  }, []);

  useEffect(() => {
    if (selectedCareer && userSkills) {
      // Find missing skills
      const missing = selectedCareer.skills.filter((skill: string) => !userSkills.includes(skill));
      setMissingSkills(missing);
      // Build learning path: find courses that cover missing skills
      const path: any[] = [];
      missing.forEach((skill: string) => {
        // Find a course that covers this skill (prefer recommended, then any)
        const course = courses.find(c => c.skills.includes(skill));
        if (course && !path.find(p => p.title === course.title)) {
          path.push(course);
        }
      });
      setLearningPath(path);
    }
  }, [selectedCareer, userSkills]);

  // Filtered and ranked courses for recommendations
  const filteredCourses = courses
    .filter(course => {
      const platformMatch = platformFilter === 'all' || course.provider.toLowerCase() === platformFilter;
      const skillMatch = skillFilter === 'all' || course.skills.some(skill => skill.toLowerCase().includes(skillFilter));
      const costMatch = costFilter === 'all' || 
        (costFilter === 'free' && course.price === 'Free') ||
        (costFilter === 'paid' && course.price !== 'Free');
      // Personalized: recommend if covers a missing skill
      const personalizedMatch = missingSkills.length === 0 || course.skills.some(skill => missingSkills.includes(skill));
      return platformMatch && skillMatch && costMatch && personalizedMatch;
    })
    .sort((a, b) => {
      // Rank by number of missing skills covered
      const aMatch = a.skills.filter(skill => missingSkills.includes(skill)).length;
      const bMatch = b.skills.filter(skill => missingSkills.includes(skill)).length;
      return bMatch - aMatch;
    });

  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'udemy': return '🎓';
      case 'coursera': return '📖';
      case 'aws training': return '☁️';
      case 'edx': return '🏛️';
      default: return '📚';
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'udemy': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'coursera': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'aws training': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'edx': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="glass p-8 rounded-2xl border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chrome/5"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 chrome-gradient rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
                <Sparkles className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-white via-chrome to-primary bg-clip-text text-transparent">
                  Personalized Recommendations
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  AI-curated learning paths tailored to your skill gaps and career goals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Filter Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Platform</label>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="glass glass-hover">
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent className="glass border border-border/50">
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="udemy">Udemy</SelectItem>
                  <SelectItem value="coursera">Coursera</SelectItem>
                  <SelectItem value="aws training">AWS Training</SelectItem>
                  <SelectItem value="edx">edX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Skill</label>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="glass glass-hover">
                  <SelectValue placeholder="All skills" />
                </SelectTrigger>
                <SelectContent className="glass border border-border/50">
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Cost</label>
              <Select value={costFilter} onValueChange={setCostFilter}>
                <SelectTrigger className="glass glass-hover">
                  <SelectValue placeholder="All costs" />
                </SelectTrigger>
                <SelectContent className="glass border border-border/50">
                  <SelectItem value="all">All Costs</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <Card key={index} className="glass glow-hover group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chrome/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Top section with proper positioning */}
              <div className="relative z-10 p-4 pb-0">
                <div className="flex items-start justify-between mb-4">
                  {/* Course icon - top left */}
                  <div className="flex-shrink-0">
                    <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                      {course.image}
                    </div>
                  </div>
                  
                  {/* Top right badges container */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
                    {/* AI Pick badge */}
                    {course.recommended && (
                      <Badge className="bg-gradient-to-r from-primary to-chrome text-background font-bold shadow-lg text-xs h-5 px-2">
                        <Award className="w-3 h-3 mr-1" />
                        AI Pick
                      </Badge>
                    )}
                    
                    {/* Platform badge with tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className={`glass border ${getProviderColor(course.provider)} font-medium text-xs h-6 px-2 hover:scale-105 transition-transform duration-200`}>
                          <span className="mr-1 text-sm">{getProviderIcon(course.provider)}</span>
                          <span className="hidden sm:inline">{course.provider}</span>
                          <span className="sm:hidden">{course.provider.slice(0, 3)}</span>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Course hosted on {course.provider}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <CardHeader className="relative z-10 pt-0">
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 leading-tight">
                  {course.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm mt-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.difficulty}
                  </Badge>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs glass border-primary/30 hover:bg-primary/20 transition-colors duration-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black bg-gradient-to-r from-primary to-chrome bg-clip-text text-transparent">
                        {course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        Save {Math.round((1 - parseFloat(course.price.replace('₹', '').replace(',', '').replace('/month', '')) / parseFloat(course.originalPrice.replace('₹', '').replace(',', '').replace('/month', ''))) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="glass glass-hover group/btn">
                      <Play className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform duration-200" />
                      Preview
                    </Button>
                    <a href={course.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="glow-hover bg-gradient-to-r from-primary to-chrome group/btn">
                        <ExternalLink className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform duration-200" />
                        Enroll
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Path Section */}
        <Card className="glass border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chrome/5"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 chrome-gradient rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
                <BookOpen className="w-5 h-5 text-background" />
              </div>
              Learning Path Suggestions
            </CardTitle>
            <CardDescription className="text-lg">
              Structured learning journeys for your career goals
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-6">
              {learningPath.length > 0 ? (
                <div>
                  {learningPath.map((course, idx) => (
                    <div key={idx} className="p-6 glass rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 group mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">{course.title}</h3>
                        <a href={course.link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="glow-hover bg-gradient-to-r from-primary to-chrome group/btn">
                            <ExternalLink className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform duration-200" />
                            Go to Course
                          </Button>
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {course.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs glass border-primary/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-2">{course.provider} &middot; {course.duration} &middot; {course.price}</p>
                    </div>
                  ))}
                  <Button className="w-full glow-hover bg-gradient-to-r from-primary to-chrome text-lg py-6 group/btn mt-4"
                    onClick={() => {
                      if (learningPath[0]?.link) {
                        window.open(learningPath[0].link, '_blank');
                      }
                    }}
                  >
                    <BookOpen className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                    Start Learning Path
                  </Button>
                </div>
              ) : (
                <div className="p-6 glass rounded-xl border border-border/30 text-center">
                  <p className="text-muted-foreground">No learning path available. Set a career goal and add your skills to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default Recommendations;

