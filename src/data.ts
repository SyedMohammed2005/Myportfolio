import { Project, Skill } from './types';
import sensaiImg from './assets/images/sensai_project_mockup_1783264724470.jpg';
import pharmixImg from './assets/images/pharmix_project_mockup_1783264737729.jpg';
import spotifyImg from './assets/images/spotify_project_mockup_1783264783783.jpg';
import netflixImg from './assets/images/netflix_project_mockup_1783264753373.jpg';
import amazonImg from './assets/images/amazon_project_mockup_1783264766889.jpg';
import codejImg from './assets/images/codej_project_mockup.svg';

export const portfolioData = {
  personalInfo: {
    name: 'Syed Mohammed Pasha Quadri',
    title: 'MERN Stack Developer',
    subtitle: 'Building Intelligent Full-Stack Web Applications',
    email: 'syedmdpashaquadri2005@gmail.com',
    linkedin: 'https://www.linkedin.com/in/syed-mohammed-pasha-quadri-264530397/',
    github: 'https://github.com/SyedMohammed2005', // Matching user requested Github link
    bio: 'An ambitious and detail-oriented MERN Stack Developer specializing in crafting high-performance full-stack web applications, responsive user interfaces, and intelligent AI integrations. Deeply passionate about clean code, modular software architecture, and modern UX design.',
    location: 'Hyderabad, India',
    resumeUrl: '#', // Placeholder or anchor to open CV print dialog
  },
  skills: [
    // Frontend
    { name: 'React', category: 'frontend', level: 90, iconName: 'React' },
    { name: 'Next.js', category: 'frontend', level: 88, iconName: 'Next' },
    { name: 'JavaScript', category: 'frontend', level: 85, iconName: 'JS' },
    { name: 'Tailwind CSS', category: 'frontend', level: 92, iconName: 'Tailwind' },
    { name: 'HTML5 / CSS3', category: 'frontend', level: 95, iconName: 'HTML' },
    
    // Backend
    { name: 'Node.js', category: 'backend', level: 85, iconName: 'Node' },
    { name: 'Express.js', category: 'backend', level: 88, iconName: 'Express' },
    
    // Databases
    { name: 'MongoDB', category: 'database', level: 85, iconName: 'Mongo' },
    { name: 'PostgreSQL', category: 'database', level: 82, iconName: 'PostgreSQL' },
    { name: 'SQL', category: 'database', level: 84, iconName: 'SQL' },

    // Tools
    { name: 'Git', category: 'tools', level: 88, iconName: 'Git' },
    { name: 'GitHub', category: 'tools', level: 90, iconName: 'GitHub' },
    { name: 'Postman', category: 'tools', level: 86, iconName: 'Postman' },
  ] as Skill[],
  projects: [
    {
      id: 1,
      title: 'Sensai (AI Career Coach)',
      description: 'A full-stack, AI-powered career coach platform designed to accelerate professional growth. Features automated resume analysis, mock interview chatbots, and personalized skill-gap roadmaps.',
      longDescription: 'Sensai is a comprehensive full-stack platform that serves as a virtual career guide. Built using React and Node.js/Express, it integrates the Gemini API to analyze uploaded resumes against job descriptions, provide actionable recommendations, generate custom learning paths, and simulate real-time conversational technical interviews with helpful scoring and feedback.',
      image: sensaiImg,
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini AI', 'Tailwind CSS'],
      liveUrl: 'https://sensai-pv4v.vercel.app/', // Deployed live link
      githubUrl: 'https://github.com/SyedMohammed2005/sensai',
      category: 'ai',
      featured: true,
    },
    {
      id: 2,
      title: 'Pharmix (Online Pharmacy)',
      description: 'An AI-powered pharmacy management system with ML-driven demand forecasting and sales analysis.',
      longDescription: 'Pharmix is an intelligent, AI-powered pharmacy management system designed for healthcare store operations. It features secure doctor prescription uploads, prescription-based carts, and comprehensive sales analysis. Most notably, it implements machine learning-driven demand forecasting to track inventory levels, predict future medicine stock requirements, and provide deep analytics dashboards for administrators.',
      image: pharmixImg,
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit', 'Machine Learning', 'Forecasting'],
      liveUrl: 'https://ai-driven-pharmacy-management-system-438490369784.asia-southeast1.run.app',
      githubUrl: 'https://github.com/SyedMohammed2005/pharmix',
      category: 'fullstack',
      featured: true,
    },
    {
      id: 6,
      title: 'CodeJ (AI Java DSA Playground)',
      description: 'An AI-powered web-based Java DSA playground and IDE combining a browser compiler, real-time Gemini AI tutor, Big-O complexity analyzer, and direct GitHub repository sync.',
      longDescription: 'CodeJ is a full-stack web-based Java IDE built to make practicing Data Structures and Algorithms interactive in one balanced environment. It combines an advanced syntax-highlighted editor with stdin support and browser compilation, Gemini AI for real-time code analysis and logic breakdowns, custom Big-O complexity calculation and algorithm visualization, and direct GitHub integration to push code straight to repositories.',
      image: codejImg,
      tags: ['React', 'Java', 'Gemini AI', 'GitHub Sync', 'Big-O Visualizer', 'Tailwind CSS'],
      liveUrl: 'https://codej-one.vercel.app/',
      githubUrl: 'https://github.com/SyedMohammed2005',
      category: 'fullstack',
      featured: true,
    },
    {
      id: 7,
      title: 'ResumeIQ (AI Resume Builder)',
      description: 'An AI-powered resume builder and ATS analyzer where you create your Master Profile once to generate job-specific, ATS-optimized, one-page PDF resumes with custom templates.',
      longDescription: 'ResumeIQ streamlines job applications by eliminating repetitive manual resume edits. Built with React, TypeScript, Tailwind CSS, and the Gemini API, it lets you build a verified Master Profile once and generate tailored resumes for any job description. Features include AI-powered ATS analysis and scoring, job-specific keyword optimization, AI custom template uploads, mobile-friendly editing, application tracking, and instant one-page selectable A4 PDF exports.',
      image: '/assets/aistudio/WhatsApp_Image_2026-11-17_at_9.36.45_AM_527a6a5e.jpeg',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'ATS Scoring', 'PDF Export'],
      liveUrl: 'https://resume-iq-psi-sable.vercel.app/',
      githubUrl: 'https://github.com/SyedMohammed2005',
      category: 'fullstack',
      featured: true,
    },
    {
      id: 3,
      title: 'Spotify Complete Clone',
      description: 'An interactive Spotify clone with fully functional custom music player controls, custom playlists, actual audio stream playing, search filters, and pixel-perfect high-fidelity responsive styling.',
      longDescription: 'This project is a high-fidelity recreation of the Spotify desktop and mobile application. It features a complete custom audio engine inside React that plays, pauses, seeks, and controls volume for track items. It dynamically parses song durations, displays active lyrics animations, and maintains playlist structures with an immersive glassmorphism sidebar interface.',
      image: spotifyImg,
      tags: ['React', 'Context API', 'Lucide Icons', 'Vite', 'Tailwind CSS', 'Web Audio API'],
      liveUrl: 'https://spotify-clone.example.com',
      githubUrl: 'https://github.com/SyedMohammed2005/spotify-clone',
      category: 'frontend',
      featured: true,
    },
    {
      id: 4,
      title: 'Netflix UI Clone',
      description: 'A sleek, pixel-perfect clone of the Netflix web interface featuring dynamic trailer previews, responsive grids, content filtering, and responsive sliding banner headers.',
      longDescription: 'This high-performance single-page frontend application mimics Netflix’s exact design language. It integrates movie metadata APIs (TMDB) to dynamically fetch trending, top-rated, and genre-specific lists, presenting them in smooth horizontal sliders. It features a dynamic video trailer modal player and a responsive hero billboard with smooth fading overlays.',
      image: netflixImg,
      tags: ['React', 'Vite', 'CSS Transitions', 'Tailwind CSS', 'TMDB API'],
      liveUrl: 'https://netflix-ui-clone.example.com',
      githubUrl: 'https://github.com/SyedMohammed2005/netflix-clone',
      category: 'frontend',
      featured: false,
    },
    {
      id: 5,
      title: 'Amazon UI Clone',
      description: 'A robust e-commerce UI clone of Amazon with an active shopping cart system, subtotal calculator, rating stars filter, product detail view modals, and responsive grids.',
      longDescription: 'This frontend Amazon clone features a responsive header search with autocomplete, banner sliders, multi-category grid card panels, and a fully interactive shopping cart that tracks subtotal quantities, item removal, and checkout mock stages. Designed with extreme responsiveness in mind.',
      image: amazonImg,
      tags: ['React', 'Context API', 'Tailwind CSS', 'CSS Grid', 'Mock Checkout'],
      liveUrl: 'https://amazon-ui-clone.example.com',
      githubUrl: 'https://github.com/SyedMohammed2005/amazon-clone',
      category: 'frontend',
      featured: false,
    },
  ] as Project[],
};
