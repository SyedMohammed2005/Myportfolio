import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Skill } from '../types';
import { portfolioData as initialData } from '../data';

export type ThemeMode = 'dark' | 'light';

export interface CustomResume {
  name: string;
  dataUrl: string; // Base64 PDF data URL or external URL
  updatedAt: string;
}

interface PortfolioContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  personalInfo: typeof initialData.personalInfo;
  projects: Project[];
  skills: Skill[];
  customResume: CustomResume | null;
  heroImage: string | null;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addSkill: (skill: Skill) => void;
  deleteSkill: (skillName: string) => void;
  updateResume: (fileDataUrl: string, fileName: string) => void;
  updateHeroImage: (imageUrl: string | null) => void;
  resetAllData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_PROJECTS_KEY = 'smpq_portfolio_projects_v2';
const LOCAL_STORAGE_SKILLS_KEY = 'smpq_portfolio_skills_v2';
const LOCAL_STORAGE_THEME_KEY = 'smpq_portfolio_theme_v2';
const LOCAL_STORAGE_RESUME_KEY = 'smpq_portfolio_resume_v2';
const LOCAL_STORAGE_HERO_IMAGE_KEY = 'smpq_portfolio_hero_image_v2';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading projects from localStorage', e);
    }
    return initialData.projects;
  });

  // Skills state
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SKILLS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading skills from localStorage', e);
    }
    return initialData.skills;
  });

  // Resume state
  const [customResume, setCustomResume] = useState<CustomResume | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RESUME_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading resume from localStorage', e);
    }
    return null;
  });

  // Custom Hero Image state
  const [heroImage, setHeroImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_HERO_IMAGE_KEY);
    } catch (e) {
      console.error('Error loading hero image from localStorage', e);
      return null;
    }
  });

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  // Save projects on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  // Save skills on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SKILLS_KEY, JSON.stringify(skills));
  }, [skills]);

  // Save custom resume on change
  useEffect(() => {
    if (customResume) {
      localStorage.setItem(LOCAL_STORAGE_RESUME_KEY, JSON.stringify(customResume));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_RESUME_KEY);
    }
  }, [customResume]);

  // Save custom hero image on change
  useEffect(() => {
    if (heroImage) {
      localStorage.setItem(LOCAL_STORAGE_HERO_IMAGE_KEY, heroImage);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_HERO_IMAGE_KEY);
    }
  }, [heroImage]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const newProject: Project = { ...projectData, id: newId };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: number, updatedFields: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addSkill = (skill: Skill) => {
    // Avoid duplicate names
    setSkills((prev) => {
      const filtered = prev.filter((s) => s.name.toLowerCase() !== skill.name.toLowerCase());
      return [...filtered, skill];
    });
  };

  const deleteSkill = (skillName: string) => {
    setSkills((prev) => prev.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase()));
  };

  const updateResume = (fileDataUrl: string, fileName: string) => {
    const newResume: CustomResume = {
      name: fileName,
      dataUrl: fileDataUrl,
      updatedAt: new Date().toLocaleDateString(),
    };
    setCustomResume(newResume);
  };

  const updateHeroImage = (imageUrl: string | null) => {
    setHeroImage(imageUrl);
  };

  const resetAllData = () => {
    setProjects(initialData.projects);
    setSkills(initialData.skills);
    setCustomResume(null);
    setHeroImage(null);
    localStorage.removeItem(LOCAL_STORAGE_PROJECTS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_SKILLS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_RESUME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_HERO_IMAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        personalInfo: initialData.personalInfo,
        projects,
        skills,
        customResume,
        heroImage,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        deleteSkill,
        updateResume,
        updateHeroImage,
        resetAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
