import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Target, TrendingUp, Star, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Switch from '@/components/ui/switch';

const CareerGoals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [careerGoals, setCareerGoals] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [weeklyReportsEnabled, setWeeklyReportsEnabled] = useState(false);
  const [goalHistory, setGoalHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load saved career goals and settings from localStorage on mount
    const savedGoals = localStorage.getItem('careerGoals');
    if (savedGoals) {
      setCareerGoals(JSON.parse(savedGoals));
      setSelectedCareer(null);
    }
    const notif = localStorage.getItem('careerNotifications');
    setNotificationsEnabled(notif === 'true');
    const weekly = localStorage.getItem('careerWeeklyReports');
    setWeeklyReportsEnabled(weekly === 'true');
    // Load goal history
    const history = localStorage.getItem('careerGoalHistory');
    if (history) {
      setGoalHistory(JSON.parse(history));
    }
  }, []);

  const handleSetCareerGoal = () => {
    if (selectedCareer) {
      setCareerGoals(prev => {
        if (!prev.includes(selectedCareer)) {
          const updated = [...prev, selectedCareer];
          localStorage.setItem('careerGoals', JSON.stringify(updated));
          // Update history
          setGoalHistory(prevHistory => {
            if (!prevHistory.includes(selectedCareer)) {
              const updatedHistory = [...prevHistory, selectedCareer];
              localStorage.setItem('careerGoalHistory', JSON.stringify(updatedHistory));
              return updatedHistory;
            }
            return prevHistory;
          });
          toast({
            title: 'Career Goal Set!',
            description: 'You have added a new career goal.',
          });
          return updated;
        }
        toast({
          title: 'Already Set',
          description: 'This career goal is already in your list.',
        });
        return prev;
      });
    }
  };

  const handleRemoveCareerGoal = (goalId: string) => {
    setCareerGoals(prev => {
      const updated = prev.filter(id => id !== goalId);
      localStorage.setItem('careerGoals', JSON.stringify(updated));
      toast({
        title: 'Career Goal Removed',
        description: 'You have removed a career goal.',
      });
      return updated;
    });
  };

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem('careerNotifications', checked.toString());
    toast({
      title: 'Notifications',
      description: checked ? 'Notifications enabled.' : 'Notifications disabled.',
    });
  };

  const handleWeeklyReportsToggle = (checked: boolean) => {
    setWeeklyReportsEnabled(checked);
    localStorage.setItem('careerWeeklyReports', checked.toString());
    toast({
      title: 'Weekly Reports',
      description: checked ? 'Weekly reports enabled.' : 'Weekly reports disabled.',
    });
  };

  const handleClearGoalHistory = () => {
    localStorage.removeItem('careerGoalHistory');
    setGoalHistory([]);
    toast({
      title: 'Goal History Cleared',
      description: 'Your set goals history has been cleared.',
    });
  };

  const careerPaths = [
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      description: 'Build user interfaces and web experiences',
      demand: 'High',
      avgSalary: '$75,000 - $120,000',
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Redux'],
      icon: '💻',
      courses: [
        { name: 'React - The Complete Guide', link: 'https://www.udemy.com/course/react-the-complete-guide/' },
        { name: 'JavaScript: Understanding the Weird Parts', link: 'https://www.udemy.com/course/understand-javascript/' },
        { name: 'CSS Flexbox and Grid', link: 'https://www.coursera.org/learn/css-flexbox-grid' }
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Analyze data to extract business insights',
      demand: 'Very High',
      avgSalary: '$95,000 - $150,000',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Pandas'],
      icon: '📊',
      courses: [
        { name: 'Machine Learning by Andrew Ng', link: 'https://www.coursera.org/learn/machine-learning' },
        { name: 'Python for Data Science', link: 'https://www.edx.org/course/python-for-data-science' },
        { name: 'Statistics with R', link: 'https://www.coursera.org/specializations/statistics' }
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description: 'Lead product strategy and development',
      demand: 'High',
      avgSalary: '$85,000 - $140,000',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Communication'],
      icon: '🎯',
      courses: [
        { name: 'Digital Product Management', link: 'https://www.coursera.org/learn/uva-darden-digital-product-management' },
        { name: 'Agile Meets Design Thinking', link: 'https://www.coursera.org/learn/agile-meets-design-thinking' }
      ]
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      description: 'Bridge development and operations teams',
      demand: 'Very High',
      avgSalary: '$90,000 - $160,000',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
      icon: '⚙️',
      courses: [
        { name: 'Docker Mastery', link: 'https://www.udemy.com/course/docker-mastery/' },
        { name: 'Learn Kubernetes', link: 'https://www.udemy.com/course/learn-kubernetes/' },
        { name: 'AWS Certified Solutions Architect', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate/' }
      ]
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      description: 'Design user-centered digital experiences',
      demand: 'High',
      avgSalary: '$70,000 - $115,000',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      icon: '🎨',
      courses: [
        { name: 'Google UX Design Professional Certificate', link: 'https://www.coursera.org/professional-certificates/google-ux-design' },
        { name: 'User Experience Design Essentials', link: 'https://www.udemy.com/course/user-experience-design-essentials/' }
      ]
    },
    {
      id: 'full-stack-dev',
      title: 'Full Stack Developer',
      description: 'Work on both frontend and backend systems',
      demand: 'Very High',
      avgSalary: '$80,000 - $130,000',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Git'],
      icon: '🚀',
      courses: [
        { name: 'The Complete Node.js Developer Course', link: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/' },
        { name: 'MongoDB - The Complete Developer Guide', link: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/' },
        { name: 'Full-Stack Web Development with React', link: 'https://www.coursera.org/specializations/full-stack-react' }
      ]
    },
    // Additional careers
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      description: 'Build and deploy artificial intelligence solutions',
      demand: 'Very High',
      avgSalary: '$110,000 - $180,000',
      skills: ['Deep Learning', 'TensorFlow', 'PyTorch', 'Python', 'NLP'],
      icon: '🤖',
      courses: [
        { name: 'Deep Learning Specialization', link: 'https://www.coursera.org/specializations/deep-learning' },
        { name: 'Natural Language Processing', link: 'https://www.coursera.org/learn/language-processing' }
      ]
    },
    {
      id: 'cloud-architect',
      title: 'Cloud Architect',
      description: 'Design and manage scalable cloud solutions',
      demand: 'High',
      avgSalary: '$120,000 - $200,000',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Networking', 'Security'],
      icon: '☁️',
      courses: [
        { name: 'Architecting with Google Cloud', link: 'https://www.coursera.org/specializations/gcp-architecture' },
        { name: 'Azure Solutions Architect Expert', link: 'https://learn.microsoft.com/en-us/certifications/azure-solutions-architect/' }
      ]
    },
    {
      id: 'cybersecurity-analyst',
      title: 'Cybersecurity Analyst',
      description: 'Protect systems and data from cyber threats',
      demand: 'Very High',
      avgSalary: '$90,000 - $140,000',
      skills: ['Security', 'Networking', 'Python', 'SIEM', 'Incident Response'],
      icon: '🛡️',
      courses: [
        { name: 'IBM Cybersecurity Analyst', link: 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst' },
        { name: 'The Complete Cyber Security Course', link: 'https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/' }
      ]
    },
    {
      id: 'business-analyst',
      title: 'Business Analyst',
      description: 'Analyze business needs and recommend solutions',
      demand: 'High',
      avgSalary: '$70,000 - $110,000',
      skills: ['Business Analysis', 'SQL', 'Excel', 'Requirements Gathering', 'Communication'],
      icon: '📈',
      courses: [
        { name: 'Business Analysis Fundamentals', link: 'https://www.udemy.com/course/business-analysis-fundamentals/' },
        { name: 'Excel Skills for Business', link: 'https://www.coursera.org/specializations/excel' }
      ]
    },
    {
      id: 'digital-marketer',
      title: 'Digital Marketer',
      description: 'Promote products and brands online',
      demand: 'High',
      avgSalary: '$60,000 - $100,000',
      skills: ['SEO', 'Content Marketing', 'Google Ads', 'Analytics', 'Social Media'],
      icon: '📢',
      courses: [
        { name: 'Digital Marketing Specialization', link: 'https://www.coursera.org/specializations/digital-marketing' },
        { name: 'Google Ads Certification', link: 'https://skillshop.exceedlms.com/student/catalog/list?category_ids=53-google-ads' }
      ]
    },
    // Science & Technology
    {
      id: 'software-developer',
      title: 'Software Developer / Engineer',
      description: 'Build apps, websites, games, AI, etc.',
      demand: 'Very High',
      avgSalary: '$80,000 - $140,000',
      skills: ['Programming', 'Problem Solving', 'Algorithms', 'Web Development'],
      icon: '🖥️',
      courses: [
        { name: 'CS50: Introduction to Computer Science', link: 'https://www.edx.org/course/cs50s-introduction-to-computer-science' },
        { name: 'Full-Stack Web Development', link: 'https://www.coursera.org/specializations/full-stack-react' }
      ]
    },
    {
      id: 'data-scientist-analyst',
      title: 'Data Scientist / Analyst',
      description: 'Work with data to solve real-world problems.',
      demand: 'Very High',
      avgSalary: '$90,000 - $150,000',
      skills: ['Python', 'Statistics', 'Data Visualization', 'Machine Learning'],
      icon: '📊',
      courses: [
        { name: 'Data Science Specialization', link: 'https://www.coursera.org/specializations/jhu-data-science' },
        { name: 'Applied Data Science with Python', link: 'https://www.coursera.org/specializations/data-science-python' }
      ]
    },
    {
      id: 'cybersecurity-expert',
      title: 'Cybersecurity Expert',
      description: 'Protect digital systems and data from hackers.',
      demand: 'High',
      avgSalary: '$90,000 - $140,000',
      skills: ['Security', 'Networking', 'Penetration Testing', 'Incident Response'],
      icon: '🛡️',
      courses: [
        { name: 'Cybersecurity Specialization', link: 'https://www.coursera.org/specializations/cyber-security' },
        { name: 'The Complete Cyber Security Course', link: 'https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/' }
      ]
    },
    {
      id: 'ai-ml-engineer',
      title: 'AI/ML Engineer',
      description: 'Design smart systems using machine learning and AI.',
      demand: 'Very High',
      avgSalary: '$110,000 - $180,000',
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'PyTorch'],
      icon: '🤖',
      courses: [
        { name: 'Deep Learning Specialization', link: 'https://www.coursera.org/specializations/deep-learning' },
        { name: 'Machine Learning by Andrew Ng', link: 'https://www.coursera.org/learn/machine-learning' }
      ]
    },
    {
      id: 'biotechnologist',
      title: 'Biotechnologist',
      description: 'Research and innovate in medicine, agriculture, and genetics.',
      demand: 'Medium',
      avgSalary: '$60,000 - $110,000',
      skills: ['Biology', 'Genetics', 'Lab Techniques', 'Research'],
      icon: '🧬',
      courses: [
        { name: 'Biotechnology Fundamentals', link: 'https://www.edx.org/course/biotechnology' }
      ]
    },
    // Business & Management
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      description: 'Start your own business or startup.',
      demand: 'High',
      avgSalary: 'Varies',
      skills: ['Business Planning', 'Leadership', 'Finance', 'Marketing'],
      icon: '🚀',
      courses: [
        { name: 'How to Start Your Own Business', link: 'https://www.coursera.org/learn/wharton-entrepreneurship' }
      ]
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      description: 'Plan campaigns, branding, and promotions.',
      demand: 'High',
      avgSalary: '$70,000 - $130,000',
      skills: ['Marketing', 'Branding', 'Digital Marketing', 'Analytics'],
      icon: '📣',
      courses: [
        { name: 'Digital Marketing Specialization', link: 'https://www.coursera.org/specializations/digital-marketing' }
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources (HR)',
      description: 'Recruit, train, and manage company talent.',
      demand: 'Medium',
      avgSalary: '$60,000 - $100,000',
      skills: ['Recruitment', 'Training', 'Employee Relations', 'Compliance'],
      icon: '🧑‍💼',
      courses: [
        { name: 'Human Resource Management', link: 'https://www.edx.org/course/human-resources' }
      ]
    },
    {
      id: 'financial-analyst',
      title: 'Financial Analyst',
      description: 'Help businesses make informed investment decisions.',
      demand: 'High',
      avgSalary: '$70,000 - $120,000',
      skills: ['Finance', 'Excel', 'Data Analysis', 'Accounting'],
      icon: '💹',
      courses: [
        { name: 'Financial Markets', link: 'https://www.coursera.org/learn/financial-markets-global' }
      ]
    },
    {
      id: 'project-manager',
      title: 'Project Manager',
      description: 'Oversee and deliver business projects efficiently.',
      demand: 'High',
      avgSalary: '$80,000 - $130,000',
      skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
      icon: '📋',
      courses: [
        { name: 'Project Management Principles and Practices', link: 'https://www.coursera.org/specializations/project-management' }
      ]
    },
    // Arts & Design
    {
      id: 'graphic-designer',
      title: 'Graphic Designer',
      description: 'Create visual content for brands, ads, and media.',
      demand: 'Medium',
      avgSalary: '$50,000 - $90,000',
      skills: ['Photoshop', 'Illustrator', 'Creativity', 'Branding'],
      icon: '🎨',
      courses: [
        { name: 'Graphic Design Specialization', link: 'https://www.coursera.org/specializations/graphic-design' }
      ]
    },
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Designer',
      description: 'Design user-friendly apps and websites.',
      demand: 'High',
      avgSalary: '$70,000 - $115,000',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      icon: '🖌️',
      courses: [
        { name: 'Google UX Design Professional Certificate', link: 'https://www.coursera.org/professional-certificates/google-ux-design' }
      ]
    },
    {
      id: 'animator-game-designer',
      title: 'Animator / Game Designer',
      description: 'Work on movies, games, or simulations.',
      demand: 'Medium',
      avgSalary: '$60,000 - $110,000',
      skills: ['Animation', 'Game Design', 'Unity', 'Storytelling'],
      icon: '🎮',
      courses: [
        { name: 'Game Design and Development', link: 'https://www.coursera.org/specializations/game-development' }
      ]
    },
    {
      id: 'photographer-videographer',
      title: 'Photographer / Videographer',
      description: 'Capture and edit creative content.',
      demand: 'Medium',
      avgSalary: '$40,000 - $80,000',
      skills: ['Photography', 'Video Editing', 'Creativity', 'Lighting'],
      icon: '📷',
      courses: [
        { name: 'Photography Basics and Beyond', link: 'https://www.coursera.org/specializations/photography' }
      ]
    },
    {
      id: 'fashion-designer',
      title: 'Fashion Designer',
      description: 'Design clothing and accessories.',
      demand: 'Medium',
      avgSalary: '$50,000 - $100,000',
      skills: ['Fashion Design', 'Sewing', 'Creativity', 'Trend Analysis'],
      icon: '👗',
      courses: [
        { name: 'Fashion as Design', link: 'https://www.coursera.org/learn/fashion-design' }
      ]
    },
    // Health & Medicine
    {
      id: 'doctor-surgeon',
      title: 'Doctor / Surgeon',
      description: 'Diagnose and treat medical conditions.',
      demand: 'Very High',
      avgSalary: '$150,000 - $300,000',
      skills: ['Medicine', 'Surgery', 'Patient Care', 'Diagnosis'],
      icon: '🩺',
      courses: [
        { name: 'Introduction to the Medical Profession', link: 'https://www.coursera.org/learn/medical-profession' }
      ]
    },
    {
      id: 'pharmacist',
      title: 'Pharmacist',
      description: 'Dispense medications and provide drug advice.',
      demand: 'High',
      avgSalary: '$90,000 - $140,000',
      skills: ['Pharmacy', 'Chemistry', 'Patient Counseling', 'Drug Safety'],
      icon: '💊',
      courses: [
        { name: 'Pharmacy Technician Certification Exam', link: 'https://www.coursera.org/learn/pharmacy-technician' }
      ]
    },
    {
      id: 'nurse',
      title: 'Nurse',
      description: 'Provide care and support to patients.',
      demand: 'Very High',
      avgSalary: '$60,000 - $110,000',
      skills: ['Nursing', 'Patient Care', 'Compassion', 'Medical Knowledge'],
      icon: '👩‍⚕️',
      courses: [
        { name: 'Foundations of Nursing', link: 'https://www.edx.org/course/foundations-of-nursing' }
      ]
    },
    {
      id: 'psychologist-therapist',
      title: 'Psychologist / Therapist',
      description: 'Help people with mental and emotional well-being.',
      demand: 'High',
      avgSalary: '$70,000 - $120,000',
      skills: ['Psychology', 'Therapy', 'Empathy', 'Counseling'],
      icon: '🧠',
      courses: [
        { name: 'Introduction to Psychology', link: 'https://www.coursera.org/learn/introduction-psychology' }
      ]
    },
    {
      id: 'medical-lab-technologist',
      title: 'Medical Lab Technologist',
      description: 'Analyze samples to diagnose diseases.',
      demand: 'Medium',
      avgSalary: '$50,000 - $90,000',
      skills: ['Lab Techniques', 'Analysis', 'Attention to Detail', 'Biology'],
      icon: '🧪',
      courses: [
        { name: 'Medical Laboratory Technician', link: 'https://www.coursera.org/learn/medical-laboratory-technician' }
      ]
    },
    // Law, Government & Education
    {
      id: 'lawyer-legal-advisor',
      title: 'Lawyer / Legal Advisor',
      description: 'Interpret laws, represent clients.',
      demand: 'High',
      avgSalary: '$90,000 - $200,000',
      skills: ['Law', 'Legal Research', 'Advocacy', 'Negotiation'],
      icon: '⚖️',
      courses: [
        { name: 'Introduction to International Criminal Law', link: 'https://www.coursera.org/learn/international-criminal-law' }
      ]
    },
    {
      id: 'civil-servant',
      title: 'Civil Servant (IAS/IPS/IFS)',
      description: 'Work in government administration.',
      demand: 'High',
      avgSalary: '$60,000 - $150,000',
      skills: ['Administration', 'Policy', 'Leadership', 'Public Service'],
      icon: '🏛️',
      courses: [
        { name: 'Public Policy Challenges', link: 'https://www.coursera.org/learn/public-policy' }
      ]
    },
    {
      id: 'politician-policy-analyst',
      title: 'Politician / Policy Analyst',
      description: 'Influence laws and policies.',
      demand: 'Medium',
      avgSalary: '$60,000 - $120,000',
      skills: ['Policy Analysis', 'Public Speaking', 'Research', 'Negotiation'],
      icon: '🗳️',
      courses: [
        { name: 'Policy Analysis Using Interrupted Time Series', link: 'https://www.coursera.org/learn/policy-analysis' }
      ]
    },
    {
      id: 'teacher-professor',
      title: 'Teacher / Professor',
      description: 'Educate students in schools or universities.',
      demand: 'High',
      avgSalary: '$50,000 - $120,000',
      skills: ['Teaching', 'Subject Knowledge', 'Communication', 'Mentoring'],
      icon: '👩‍🏫',
      courses: [
        { name: 'How to Teach Online', link: 'https://www.coursera.org/learn/teach-online' }
      ]
    },
    {
      id: 'librarian-researcher',
      title: 'Librarian / Researcher',
      description: 'Work in academic or archival settings.',
      demand: 'Medium',
      avgSalary: '$40,000 - $80,000',
      skills: ['Research', 'Organization', 'Information Management', 'Archiving'],
      icon: '📚',
      courses: [
        { name: 'Research Methods', link: 'https://www.coursera.org/learn/research-methods' }
      ]
    },
    // Emerging & Niche Fields
    {
      id: 'sustainability-specialist',
      title: 'Sustainability Specialist',
      description: 'Focus on environmental impact and green practices.',
      demand: 'Medium',
      avgSalary: '$60,000 - $110,000',
      skills: ['Sustainability', 'Environmental Science', 'Policy', 'Project Management'],
      icon: '🌱',
      courses: [
        { name: 'Sustainability and Development', link: 'https://www.coursera.org/learn/sustainability-development' }
      ]
    },
    {
      id: 'ethical-hacker',
      title: 'Ethical Hacker / Bug Bounty Hunter',
      description: 'Legally test security systems.',
      demand: 'High',
      avgSalary: '$80,000 - $150,000',
      skills: ['Ethical Hacking', 'Penetration Testing', 'Security', 'Networking'],
      icon: '🕵️‍♂️',
      courses: [
        { name: 'The Complete Ethical Hacking Course', link: 'https://www.udemy.com/course/penetration-testing/' }
      ]
    },
    {
      id: 'blockchain-developer',
      title: 'Blockchain Developer',
      description: 'Build decentralized applications (crypto, NFTs).',
      demand: 'High',
      avgSalary: '$90,000 - $160,000',
      skills: ['Blockchain', 'Solidity', 'Smart Contracts', 'Cryptography'],
      icon: '⛓️',
      courses: [
        { name: 'Blockchain Specialization', link: 'https://www.coursera.org/specializations/blockchain' }
      ]
    },
    {
      id: 'content-creator',
      title: 'Content Creator / Influencer',
      description: 'Use social media as a profession.',
      demand: 'High',
      avgSalary: 'Varies',
      skills: ['Content Creation', 'Social Media', 'Branding', 'Video Editing'],
      icon: '📱',
      courses: [
        { name: 'Viral Marketing and How to Craft Contagious Content', link: 'https://www.coursera.org/learn/viral-marketing' }
      ]
    },
    {
      id: 'space-scientist',
      title: 'Space Scientist / Astrophysicist',
      description: 'Explore outer space and cosmology.',
      demand: 'Medium',
      avgSalary: '$80,000 - $150,000',
      skills: ['Astrophysics', 'Mathematics', 'Research', 'Data Analysis'],
      icon: '🔭',
      courses: [
        { name: 'Astrophysics: The Violent Universe', link: 'https://www.coursera.org/learn/astrophysics' }
      ]
    },
  ];

  const filteredCareers = careerPaths.filter(career =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCareerData = careerPaths.find(career => career.id === selectedCareer);

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chrome bg-clip-text text-transparent mb-2">
          Career Goal Selector
        </h1>
        <p className="text-muted-foreground">
          Choose your target career path and discover the skills you need to succeed
        </p>
      </div>

      {/* Search */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search career paths..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCareer(null); // Clear career details after search
              }}
              className="pl-10 glass"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" />
            Available Career Paths
          </h2>
          {searchTerm.trim() === '' ? (
            <div className="text-muted-foreground italic p-4">Start typing to search for career paths.</div>
          ) : filteredCareers.length === 0 ? (
            <div className="text-muted-foreground italic p-4">No career paths found.</div>
          ) : (
            <div className="space-y-3">
              {filteredCareers.map((career) => (
                <Card
                  key={career.id}
                  className={`glass cursor-pointer transition-all duration-200 ${
                    selectedCareer === career.id
                      ? 'border-primary/50 glow'
                      : 'glass-hover'
                  }`}
                  onClick={() => setSelectedCareer(career.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{career.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{career.title}</h3>
                          <Badge variant={career.demand === 'Very High' ? 'default' : 'secondary'}>
                            {career.demand} Demand
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {career.description}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {career.avgSalary}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Selected Career Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5" />
            Career Details
          </h2>
          
          {selectedCareerData ? (
            <Card className="glass glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCareerData.icon}</span>
                  {selectedCareerData.title}
                </CardTitle>
                <CardDescription>{selectedCareerData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Market Demand</p>
                    <p className="font-semibold text-primary">{selectedCareerData.demand}</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Salary Range</p>
                    <p className="font-semibold text-primary text-sm">{selectedCareerData.avgSalary}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareerData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="glass">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className={`w-full glow-hover metallic-gradient text-white ${careerGoals.includes(selectedCareerData?.id ?? '') ? 'bg-primary' : ''}`}
                  onClick={handleSetCareerGoal}
                  disabled={careerGoals.includes(selectedCareerData?.id ?? '')}
                >
                  {careerGoals.includes(selectedCareerData?.id ?? '') ? 'Goal Set' : 'Set as Career Goal'}
                </Button>
                {/* Most Useful Courses */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Most Useful Courses</h4>
                  <ul className="list-disc ml-6">
                    {selectedCareerData?.courses?.map((course, idx) => (
                      <li key={idx}>
                        {course.link ? (
                          <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">{course.name}</a>
                        ) : (
                          course.name
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 chrome-gradient rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-background" />
                </div>
                <h3 className="font-semibold mb-2">Select a Career Path</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a career from the list to see detailed requirements and set it as your goal
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Current Goal Status */}
      {selectedCareerData && (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📈</span>
              Your Progress Toward {selectedCareerData.title}
            </CardTitle>
            <CardDescription>
              Track your skill development journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-primary">65%</div>
                <p className="text-sm text-muted-foreground">Skills Match</p>
                <Progress value={65} className="mt-2" />
              </div>
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-primary">4/6</div>
                <p className="text-sm text-muted-foreground">Skills Acquired</p>
                <Progress value={67} className="mt-2" />
              </div>
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-primary">3mo</div>
                <p className="text-sm text-muted-foreground">Est. Time to Goal</p>
                <Progress value={33} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Set Goals View Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Set Goals History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {goalHistory.length > 0 ? (
            <div className="flex flex-col gap-2">
              {goalHistory.map((goalId, idx) => {
                const goal = careerPaths.find(c => c.id === goalId);
                if (!goal) return null;
                return (
                  <div key={goalId} className="flex items-center gap-2">
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-semibold">{goal.title}</span>
                    <Badge>{goal.demand} Demand</Badge>
                  </div>
                );
              })}
              <Button variant="outline" onClick={handleClearGoalHistory} className="w-fit mt-2">Clear History</Button>
            </div>
          ) : (
            <span className="text-muted-foreground">No goals set yet.</span>
          )}
        </CardContent>
      </Card>

      {/* Set Goals Section (multiple) */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Your Set Career Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {careerGoals.length > 0 ? (
            <div className="flex flex-col gap-2">
              {careerGoals.map(goalId => {
                const goal = careerPaths.find(c => c.id === goalId);
                if (!goal) return null;
                return (
                  <div key={goalId} className="flex items-center gap-2">
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-semibold">{goal.title}</span>
                    <Badge>{goal.demand} Demand</Badge>
                    <Button variant="outline" size="sm" onClick={() => handleRemoveCareerGoal(goalId)}>
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="text-muted-foreground">No career goals set.</span>
          )}
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Career Goal Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notifications</div>
              <div className="text-sm text-muted-foreground">Notify me about progress and updates</div>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Weekly Reports</div>
              <div className="text-sm text-muted-foreground">Get weekly learning summaries</div>
            </div>
            <Switch checked={weeklyReportsEnabled} onCheckedChange={handleWeeklyReportsToggle} />
          </div>
        </CardContent>
      </Card>

      {/* All Courses Section */}
      <Card className="glass mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            All Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6">
            {[...new Map(careerPaths.flatMap(c => c.courses || []).map(course => [course.name, course])).values()].map((course, idx) => (
              <li key={idx}>
                {course.link ? (
                  <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">{course.name}</a>
                ) : (
                  course.name
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerGoals;
