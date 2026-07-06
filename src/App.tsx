import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import AIStudioGrid from './components/AIStudioGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSkills from './components/AboutSkills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

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
    <div className="relative min-h-screen bg-[#07070a] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      
      {/* Background Interactive Google AI Studio Style Grid Canvas */}
      <AIStudioGrid />

      {/* Glassmorphic Navbar */}
      <Navbar activeSection={activeSection} />

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

    </div>
  );
}
