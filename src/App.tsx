import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import AIStudioGrid from './components/AIStudioGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSkills from './components/AboutSkills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = usePortfolio();
  const isLight = theme === 'light';

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // Tracks mid-viewport triggers
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Standard animation motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: 'easeOut' } 
    }
  };

  return (
    <div className={`relative min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${
      isLight
        ? 'bg-white text-slate-900 selection:bg-cyan-500/20 selection:text-slate-900'
        : 'bg-[#07070a] text-white selection:bg-cyan-500/30 selection:text-white'
    }`}>
      
      {/* Background Interactive Google AI Studio Style Grid Canvas */}
      <AIStudioGrid />

      {/* Glassmorphic Navbar */}
      <Navbar activeSection={activeSection} onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* App Content wrapper */}
      <main className="relative z-10">
        
        {/* Home/Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Hero />
        </motion.div>

        {/* About & Skills Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <AboutSkills />
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Projects />
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Contact />
        </motion.div>

      </main>

      {/* Cybernetic Footer */}
      <Footer />

      {/* Settings / Admin Management Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
}

