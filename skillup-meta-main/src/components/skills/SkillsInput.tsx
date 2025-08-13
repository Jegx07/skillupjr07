import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, Link2, Plus, X } from 'lucide-react';
import { useUserSkills } from './UserSkillsContext';

const SkillsInput = () => {
  const { skills, addSkill, removeSkill } = useUserSkills();
  const [manualSkills, setManualSkills] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState(50);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.skill === newSkill.trim())) {
      addSkill({ skill: newSkill.trim(), level: newLevel });
      setNewSkill('');
      setNewLevel(50);
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    removeSkill(skillName);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeUrl(null);
      setResumeError(null);
      // Placeholder for file processing logic
      // You can add your file parsing logic here
    }
  };

  const handleBrowseFilesClick = () => {
    fileInputRef.current?.click();
  };

  const handleFromUrlClick = async () => {
    const url = window.prompt('Enter the public URL to your resume (PDF, DOC, DOCX):');
    if (!url) return;
    setResumeError(null);
    setResumeFileName(null);
    setResumeUrl(null);
    try {
      // Try to fetch the file to check if it's accessible
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch file from URL');
      // Optionally, check content-type or size here
      setResumeUrl(url);
      setResumeFileName(null);
      setResumeError(null);
      // Placeholder: You can process the file here (e.g., read as blob, parse, etc.)
    } catch (err: any) {
      setResumeError('Could not fetch file from the provided URL. Please check the link.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chrome bg-clip-text text-transparent mb-2">
          Skills Input Center
        </h1>
        <p className="text-muted-foreground">
          Add your skills manually, upload your resume, or import from professional platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>✍️</span>
              Manual Input
            </CardTitle>
            <CardDescription>
              Type your skills directly or add them one by one
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bulk Skills Entry</label>
              <Textarea
                placeholder="Enter your skills separated by commas (e.g., JavaScript, Python, React, Node.js...)"
                value={manualSkills}
                onChange={(e) => setManualSkills(e.target.value)}
                className="glass min-h-[100px]"
              />
              <Button className="w-full glow-hover">
                <Plus className="w-4 h-4 mr-2" />
                Parse & Add Skills
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Add Individual Skill</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter skill name"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="glass"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={newLevel}
                  onChange={(e) => setNewLevel(Number(e.target.value))}
                  className="glass w-24"
                  placeholder="Level"
                />
                <Button onClick={handleAddSkill} className="glow-hover">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📄</span>
              Resume Upload
            </CardTitle>
            <CardDescription>
              Upload your resume for automatic skill extraction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center glass-hover">
              <div className="mx-auto w-12 h-12 chrome-gradient rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-background" />
              </div>
              <p className="text-sm font-medium mb-2">Drop your resume here</p>
              <p className="text-xs text-muted-foreground mb-4">
                Supports PDF, DOC, DOCX files up to 5MB
              </p>
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
              <label htmlFor="resume-upload">
                <Button className="glow-hover" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              {resumeFileName && (
                <div className="mt-2 text-green-600 text-sm">Selected: {resumeFileName}</div>
              )}
              {resumeUrl && (
                <div className="mt-2 text-green-600 text-sm">Fetched from URL: {resumeUrl}</div>
              )}
              {resumeError && (
                <div className="mt-2 text-red-600 text-sm">{resumeError}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="glass glass-hover" onClick={handleBrowseFilesClick}>
                <Upload className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
              <Button variant="outline" className="glass glass-hover" onClick={handleFromUrlClick}>
                <Link2 className="w-4 h-4 mr-2" />
                From URL
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔗</span>
            Platform Integrations
          </CardTitle>
          <CardDescription>
            Import skills from your professional profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="glass glass-hover h-16 flex-col w-full">
                <div className="w-8 h-8 bg-blue-600 rounded mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
                LinkedIn Import
              </Button>
            </a>
            <a href="https://github.com/login" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="glass glass-hover h-16 flex-col w-full">
                <div className="w-8 h-8 bg-gray-900 rounded mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">GH</span>
                </div>
                GitHub Analysis
              </Button>
            </a>
            <a href="https://www.cvlogin.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="glass glass-hover h-16 flex-col w-full">
                <div className="w-8 h-8 bg-orange-500 rounded mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">CV</span>
                </div>
                CSV Import
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏷️</span>
            Current Skills ({skills.length})
          </CardTitle>
          <CardDescription>
            Review and manage your skill portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-2 glass glass-hover"
              >
                <span className="flex items-center gap-2">
                  {skill.skill} ({skill.level})
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleRemoveSkill(skill.skill)}
                  />
                </span>
              </Badge>
            ))}
          </div>
          {skills.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No skills added yet. Start by adding your first skill above!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsInput;

