import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { personalInfo, theme } = usePortfolio();
  const isLight = theme === 'light';

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
    <footer className={`border-t py-12 relative overflow-hidden ${
      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-800' : 'bg-[#040407] border-slate-900 text-slate-400'
    }`}>
      
      {/* Absolute faint grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,210,255,0.015)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        {/* Brand details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <button
            onClick={handleScrollToTop}
            className={`font-display text-lg font-bold tracking-tight cursor-pointer focus:outline-none ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
            id="footer-logo-btn"
          >
            SMPQ<span className="text-cyan-500">.dev</span>
          </button>
          <p className={`text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-500'}`}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
          </p>
          <p className={`text-[10px] font-mono tracking-widest mt-1 uppercase ${isLight ? 'text-slate-500' : 'text-slate-600'}`}>
            HYD // LAT: 17.3850° N // LONG: 78.4867° E
          </p>
        </div>

        {/* Quick jumps */}
        <div className={`flex flex-wrap justify-center items-center gap-6 text-xs font-display font-semibold uppercase tracking-wider ${
          isLight ? 'text-slate-700' : 'text-slate-400'
        }`}>
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => handleScrollTo(section)}
              className="hover:text-cyan-500 transition-colors duration-200 cursor-pointer focus:outline-none"
              id={`footer-nav-link-${section}`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Social coordinates & Scroll top */}
        <div className="flex items-center gap-4">
          
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:text-black hover:border-slate-400'
                : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
            id="footer-github-link"
          >
            <Github className="w-4.5 h-4.5" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:text-black hover:border-slate-400'
                : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
            id="footer-linkedin-link"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:text-black hover:border-slate-400'
                : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
            id="footer-email-link"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>

          <button
            onClick={handleScrollToTop}
            className="w-9 h-9 rounded-lg bg-cyan-400 hover:bg-cyan-300 flex items-center justify-center text-black shadow-md active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none ml-2"
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

