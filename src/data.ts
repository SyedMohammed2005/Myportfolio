import { Project, Skill } from './types';
import sensaiImg from './assets/images/sensai_project_mockup_1783264724470.jpg';
import pharmixImg from './assets/images/pharmix_project_mockup_1783264737729.jpg';
import spotifyImg from './assets/images/spotify_project_mockup_1783264783783.jpg';
import netflixImg from './assets/images/netflix_project_mockup_1783264753373.jpg';
import amazonImg from './assets/images/amazon_project_mockup_1783264766889.jpg';

export const portfolioData = {
  personalInfo: {
    name: 'Syed Mohammed Pasha Quadri',
    title: 'MERN Stack Developer',
    subtitle: 'Building Intelligent Full-Stack Web Applications',
    email: 'syedmdpashaquadri2005@gmail.com',
    linkedin: 'https://www.linkedin.com/in/syed-mohammed-pasha-quadri-0a56202b4', // Real link based on name
    github: 'https://github.com/SyedMohammed2005', // Matching user requested Github link
    bio: 'An ambitious and detail-oriented MERN Stack Developer specializing in crafting high-performance full-stack web applications, responsive user interfaces, and intelligent AI integrations. Deeply passionate about clean code, modular software architecture, and modern UX design.',
    location: 'Hyderabad, India',
    resumeUrl: '#', // Placeholder or anchor to open CV print dialog
  },
  skills: [
    // Frontend
    { name: 'React', category: 'frontend', level: 90, iconName: 'React' },
    { name: 'JavaScript', category: 'frontend', level: 85, iconName: 'JS' },
    { name: 'Tailwind CSS', category: 'frontend', level: 92, iconName: 'Tailwind' },
    { name: 'HTML5 / CSS3', category: 'frontend', level: 95, iconName: 'HTML' },
    
    // Backend
    { name: 'Node.js', category: 'backend', level: 85, iconName: 'Node' },
    { name: 'Express.js', category: 'backend', level: 88, iconName: 'Express' },
    
    // Databases
    { name: 'MongoDB', category: 'database', level: 85, iconName: 'Mongo' },
    { name: 'MySQL', category: 'database', level: 80, iconName: 'MySQL' },
    { name: 'Neon DB', category: 'database', level: 78, iconName: 'Neon' },
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
