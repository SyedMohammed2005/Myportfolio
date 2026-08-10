import { useState, useEffect } from 'react';
import { Menu, X, Code, Terminal, Sun, Moon, Settings } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
  onOpenSettings?: () => void;
}

export default function Navbar({ activeSection, onOpenSettings }: NavbarProps) {
  const { theme, toggleTheme } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLight = theme === 'light';

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
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-md'
            : 'bg-[#07070a]/80 backdrop-blur-md border-b border-cyan-500/10 py-3 shadow-[0_10px_30px_-10px_rgba(0,210,255,0.15)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleScrollTo('home')}
            className={`flex items-center gap-2 font-display text-xl font-bold tracking-tight focus:outline-none cursor-pointer group ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
            id="logo-btn"
          >
            <div className={`relative w-8 h-8 flex items-center justify-center border rounded-lg overflow-hidden transition-all duration-300 ${
              isLight
                ? 'bg-sky-100 border-sky-300 text-sky-600 group-hover:border-sky-500'
                : 'bg-cyan-950 border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,210,255,0.4)]'
            }`}>
              <Code className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className={isLight ? 'text-slate-900' : 'text-white'}>
              SMPQ<span className="text-cyan-500">.dev</span>
            </span>
          </button>

          {/* Immersive UI Green Status Dot */}
          <div className={`hidden lg:flex items-center gap-2 border px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest relative select-none ${
            isLight
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
          }`}>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute left-3" />
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
                className={`px-3.5 py-2 font-display text-sm tracking-wide font-medium relative transition-colors duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-cyan-500 font-bold'
                    : isLight
                    ? 'text-slate-700 hover:text-black hover:font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-500 rounded-full shadow-[0_2px_10px_rgba(0,210,255,0.8)]" />
                )}
              </button>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all duration-300 ml-2 cursor-pointer ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-amber-600 hover:bg-black hover:text-amber-300 hover:border-black'
                : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-800'
            }`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Settings Admin Button */}
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-black hover:text-white hover:border-black'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-cyan-400'
            }`}
            title="Admin Settings Panel"
            aria-label="Open settings"
            id="nav-settings-btn"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="ml-3 px-4 py-2 rounded-lg font-display text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
            id="nav-hire-me"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border cursor-pointer ${
              isLight ? 'bg-slate-100 border-slate-300 text-amber-600' : 'bg-slate-900 border-slate-800 text-cyan-400'
            }`}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Settings Button Mobile */}
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-lg border cursor-pointer ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            aria-label="Open settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 focus:outline-none rounded-lg cursor-pointer ${
              isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] border-l shadow-2xl backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#09090e]/95 border-cyan-500/10 text-white'}`}
        id="mobile-drawer"
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-200 focus:outline-none rounded-lg cursor-pointer"
            id="mobile-drawer-close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-3 px-8 py-2">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-display font-semibold tracking-wide">Developer Menu</span>
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`text-left py-2.5 font-display text-base font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-cyan-500 border-l-2 border-cyan-500 pl-3 font-bold'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 pl-0'
                    : 'text-slate-400 hover:text-white pl-0'
                }`}
                id={`mobile-link-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenSettings?.();
            }}
            className="flex items-center gap-2 py-2.5 text-left font-display text-sm font-medium text-slate-400 hover:text-cyan-400 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Admin Settings</span>
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="mt-4 w-full py-3 rounded-lg text-center font-display text-sm font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 cursor-pointer"
            id="mobile-hire-me"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}

