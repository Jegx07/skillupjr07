import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Plus, 
  X, 
  Search, 
  TrendingUp, 
  Code, 
  Palette, 
  Database, 
  Globe, 
  Settings,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useUserSkills } from '../components/skills/UserSkillsContext';
import { useNavigate } from 'react-router-dom';

const skillCategories = [
  {
    name: 'Programming Languages',
    icon: <Code className="w-5 h-5" />,
    color: 'bg-blue-500',
    skills: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'TypeScript']
  },
  {
    name: 'Frontend Development',
    icon: <Palette className="w-5 h-5" />,
    color: 'bg-green-500',
    skills: ['React', 'Vue.js', 'Angular', 'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'Next.js', 'Nuxt.js']
  },
  {
    name: 'Backend Development',
    icon: <Database className="w-5 h-5" />,
    color: 'bg-purple-500',
    skills: ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'ASP.NET', 'FastAPI', 'GraphQL', 'REST API']
  },
  {
    name: 'DevOps & Tools',
    icon: <Settings className="w-5 h-5" />,
    color: 'bg-orange-500',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'Git', 'CI/CD', 'Terraform', 'Ansible', 'Linux']
  },
  {
    name: 'Data & Analytics',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'bg-red-500',
    skills: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Tableau']
  },
  {
    name: 'Other Skills',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-gray-500',
    skills: ['Project Management', 'Agile', 'Scrum', 'UI/UX Design', 'Mobile Development', 'Testing', 'Security', 'Machine Learning', 'AI', 'Blockchain']
  }
];

const SkillsPage = () => {
  const { skills, addSkill, removeSkill } = useUserSkills();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [customLevel, setCustomLevel] = useState([50]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const navigate = useNavigate();

  const handleAddSkill = (skillName: string, level: number = 50) => {
    if (!skills.find(s => s.skill === skillName)) {
      addSkill({ skill: skillName, level });
    }
  };

  const [skillLevels, setSkillLevels] = useState<{ [key: string]: number }>({});

  const handleSkillLevelChange = (skillName: string, level: number) => {
    setSkillLevels(prev => ({
      ...prev,
      [skillName]: level
    }));
  };

  const handleRemoveSkill = (skillName: string) => {
    removeSkill(skillName);
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim()) {
      handleAddSkill(customSkill.trim(), customLevel[0]);
      setCustomSkill('');
      setCustomLevel([50]);
      setShowCustomInput(false);
    }
  };

  const getFilteredSkills = () => {
    if (!selectedCategory) return [];
    const category = skillCategories.find(cat => cat.name === selectedCategory);
    if (!category) return [];
    
    return category.skills.filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getSkillLevel = (skillName: string) => {
    const skill = skills.find(s => s.skill === skillName);
    return skill?.level || 0;
  };

  const handleContinue = () => {
    // Save skills to localStorage
    localStorage.setItem('userSkills', JSON.stringify(skills));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass p-6 rounded-2xl border border-border/50">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chrome bg-clip-text text-transparent mb-2">
            Skills Assessment
          </h1>
          <p className="text-muted-foreground">
            Add your skills and rate your proficiency level. This helps us provide personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill Categories */}
          <div className="lg:col-span-1">
            <Card className="glass glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📂</span>
                  Skill Categories
                </CardTitle>
                <CardDescription>
                  Choose a category to browse skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className={`w-full justify-start glass glass-hover ${
                      selectedCategory === category.name ? 'bg-primary text-primary-foreground' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className={`w-6 h-6 rounded mr-3 flex items-center justify-center ${category.color}`}>
                      {category.icon}
                    </div>
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Custom Skill Input */}
            <Card className="glass glow-hover mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>➕</span>
                  Add Custom Skill
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showCustomInput ? (
                  <Button 
                    onClick={() => setShowCustomInput(true)}
                    className="w-full glow-hover"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Skill
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter skill name"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      className="glass"
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Proficiency Level: {customLevel[0]}%</label>
                      <Slider
                        value={customLevel}
                        onValueChange={setCustomLevel}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCustomSkillAdd} className="flex-1 glow-hover">
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCustomInput(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills Browser */}
          <div className="lg:col-span-2">
            <Card className="glass glow-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedCategory ? (
                        <>
                          {skillCategories.find(cat => cat.name === selectedCategory)?.icon}
                          {selectedCategory}
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Browse Skills
                        </>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {selectedCategory 
                        ? `Browse ${selectedCategory} skills` 
                        : 'Select a category to browse skills'
                      }
                    </CardDescription>
                  </div>
                  {selectedCategory && (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 glass"
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedCategory ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a category to browse available skills</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getFilteredSkills().map((skill) => {
                      const isAdded = skills.find(s => s.skill === skill);
                      const level = getSkillLevel(skill);
                      
                      return (
                        <div
                          key={skill}
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            isAdded 
                              ? 'bg-primary/10 border-primary/30' 
                              : 'glass glass-hover border-border/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{skill}</span>
                            {isAdded && <CheckCircle className="w-4 h-4 text-primary" />}
                          </div>
                          
                          {!isAdded && (
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-sm">
                                <span>Proficiency</span>
                                <span>{skillLevels[skill] || 50}%</span>
                              </div>
                              <Slider
                                value={[skillLevels[skill] || 50]}
                                onValueChange={(value) => handleSkillLevelChange(skill, value[0])}
                                max={100}
                                step={5}
                                className="w-full"
                              />
                            </div>
                          )}
                          
                          {isAdded && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Proficiency</span>
                                <span>{level}%</span>
                              </div>
                              <Progress value={level} className="h-2" />
                              <div className="space-y-2">
                                <Slider
                                  value={[level]}
                                  onValueChange={(value) => {
                                    const updatedSkills = skills.map(s => 
                                      s.skill === skill ? { ...s, level: value[0] } : s
                                    );
                                    // Update the skill level in the context
                                    removeSkill(skill);
                                    addSkill({ skill, level: value[0] });
                                  }}
                                  max={100}
                                  step={5}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-2 mt-3">
                            {!isAdded ? (
                              <Button
                                size="sm"
                                onClick={() => handleAddSkill(skill, skillLevels[skill] || 50)}
                                className="flex-1 glow-hover"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveSkill(skill)}
                                className="flex-1"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Skills Summary */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📊</span>
              Your Skills ({skills.length})
            </CardTitle>
            <CardDescription>
              Review and manage your skill portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            {skills.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No skills added yet. Start by selecting a category and adding your skills!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="p-3 rounded-lg glass border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.skill}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveSkill(skill.skill)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Level</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleContinue}
                    className="glow-hover metallic-gradient text-white"
                    disabled={skills.length === 0}
                  >
                    Continue to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillsPage;
