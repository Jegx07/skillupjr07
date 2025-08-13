import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserSkill = { skill: string; level: number };

interface UserSkillsContextType {
  skills: UserSkill[];
  setSkills: (skills: UserSkill[]) => void;
  addSkill: (skill: UserSkill) => void;
  removeSkill: (skillName: string) => void;
}

const UserSkillsContext = createContext<UserSkillsContextType | undefined>(undefined);

export const UserSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [skills, setSkills] = useState<UserSkill[]>([]);

  const addSkill = (skill: UserSkill) => {
    setSkills((prev) => {
      if (prev.find((s) => s.skill === skill.skill)) return prev;
      return [...prev, skill];
    });
  };

  const removeSkill = (skillName: string) => {
    setSkills((prev) => prev.filter((s) => s.skill !== skillName));
  };

  return (
    <UserSkillsContext.Provider value={{ skills, setSkills, addSkill, removeSkill }}>
      {children}
    </UserSkillsContext.Provider>
  );
};

export const useUserSkills = () => {
  const context = useContext(UserSkillsContext);
  if (!context) throw new Error('useUserSkills must be used within a UserSkillsProvider');
  return context;
}; 
