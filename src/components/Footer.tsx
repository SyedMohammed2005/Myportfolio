import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#040407] border-t border-slate-900 py-12 relative overflow-hidden">
      
      {/* Absolute faint grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,210,255,0.015)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        {/* Brand details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <button
            onClick={handleScrollToTop}
            className="text-white font-display text-lg font-bold tracking-tight cursor-pointer focus:outline-none"
            id="footer-logo-btn"
          >
            SMPQ<span className="text-cyan-400">.dev</span>
          </button>
          <p className="text-slate-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} Syed Mohammed Pasha Quadri. All Rights Reserved.
          </p>
          <p className="text-slate-600 text-[10px] font-mono tracking-widest mt-1 uppercase">
            HYD // LAT: 17.3850° N // LONG: 78.4867° E
          </p>
        </div>

        {/* Quick jumps */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-display font-semibold uppercase tracking-wider text-slate-400">
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => handleScrollTo(section)}
              className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer focus:outline-none"
              id={`footer-nav-link-${section}`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Social coordinates & Scroll top */}
        <div className="flex items-center gap-4">
          
          <a
            href={portfolioData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300"
            id="footer-github-link"
          >
            <Github className="w-4.5 h-4.5" />
          </a>

          <a
            href={portfolioData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300"
            id="footer-linkedin-link"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>

          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300"
            id="footer-email-link"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>

          <button
            onClick={handleScrollToTop}
            className="w-9 h-9 rounded-lg bg-cyan-400 hover:bg-cyan-300 flex items-center justify-center text-black shadow-[0_0_12px_rgba(0,210,255,0.3)] active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none ml-2"
            title="Scroll to Top"
            id="footer-scroll-top-btn"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
