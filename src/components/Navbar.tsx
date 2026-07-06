import { useState, useEffect } from 'react';
import { Menu, X, Code, Terminal } from 'lucide-react';
import { portfolioData } from '../data';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <header
      id="portfolio-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07070a]/80 backdrop-blur-md border-b border-cyan-500/10 py-3 shadow-[0_10px_30px_-10px_rgba(0,210,255,0.15)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleScrollTo('home')}
            className="flex items-center gap-2 text-white font-display text-xl font-bold tracking-tight focus:outline-none cursor-pointer group"
            id="logo-btn"
          >
            <div className="relative w-8 h-8 flex items-center justify-center bg-cyan-950 border border-cyan-500/40 rounded-lg overflow-hidden group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,210,255,0.4)] transition-all duration-300">
              <Code className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent group-hover:to-cyan-400 transition-all duration-300">
              SMPQ<span className="text-cyan-400">.dev</span>
            </span>
          </button>

          {/* Immersive UI Green Status Dot */}
          <div className="hidden lg:flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest relative select-none">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full absolute left-3" />
            <span>Available for Hire</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`px-4 py-2 font-display text-sm tracking-wide font-medium relative transition-colors duration-300 focus:outline-none cursor-pointer ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_2px_10px_rgba(0,210,255,0.8)]" />
                )}
              </button>
            );
          })}
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="ml-4 px-5 py-2 rounded-lg font-display text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
            id="nav-hire-me"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] bg-[#09090e]/95 border-l border-cyan-500/10 shadow-2xl backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-drawer"
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none rounded-lg cursor-pointer"
            id="mobile-drawer-close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-3 px-8 py-4">
          <div className="flex items-center gap-2 pb-6 border-b border-slate-800">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-display font-semibold text-white tracking-wide">Developer Menu</span>
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`text-left py-3 font-display text-base font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-slate-400 hover:text-white pl-0'
                }`}
                id={`mobile-link-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => handleScrollTo('contact')}
            className="mt-6 w-full py-3 rounded-lg text-center font-display text-sm font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 cursor-pointer"
            id="mobile-hire-me"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
