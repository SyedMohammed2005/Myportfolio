import { useState, useEffect } from 'react';
import { Mail, ArrowRight, Eye, Terminal, Database, Code, Cpu } from 'lucide-react';
import { portfolioData } from '../data';
import developerPortrait from '../assets/images/developer_portrait_updated_1783323115254.jpg';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const roles = [
    'MERN Stack Developer',
    'Full-Stack Engineer',
    'AI Solutions Creator',
    'Creative Programmer'
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1800;

  useEffect(() => {
    let timer: number;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedText === currentRole) {
      timer = window.setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
        
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Welcome Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(0,210,255,0.1)]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Console.log("Welcome World")</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-none">
              Hi, I am <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                Syed Mohammed Pasha Quadri
              </span>
            </h1>
            
            {/* Typewriter text */}
            <div className="h-10 sm:h-12 flex items-center">
              <p className="text-xl sm:text-2xl font-mono text-cyan-400 font-semibold flex items-center">
                &gt; {typedText}
                <span className="w-2.5 h-6 ml-1.5 bg-cyan-400 animate-blink shadow-[0_0_10px_rgba(0,210,255,1)]" />
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
            {portfolioData.personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={handleScrollToContact}
              className="px-6 py-3.5 rounded-xl text-black font-display text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 hover:from-cyan-300 hover:via-teal-300 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              id="hero-cta-hire"
            >
              Hire Me
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleOpenResume}
              className="px-6 py-3.5 rounded-xl border border-cyan-500/30 text-cyan-400 font-display text-sm font-bold uppercase tracking-wider bg-cyan-950/10 hover:bg-cyan-950/30 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              id="hero-cta-resume"
            >
              View Resume
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Core Tech Quick Badges */}
          <div className="pt-8 border-t border-slate-900 w-full max-w-lg">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Core Stack Focus</p>
            <div className="flex flex-wrap gap-2.5">
              {['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-[#0f0f15] border border-slate-800 text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Hexagonal Frame & Portait Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
          
          {/* Background Ambient Glowing Rings */}
          <div className="absolute w-[320px] h-[320px] rounded-full bg-cyan-500/5 blur-[80px] -z-10 animate-pulse" />
          <div className="absolute w-[260px] h-[260px] rounded-full bg-purple-500/5 blur-[80px] -z-10 animate-pulse delay-700" />
          
          {/* Tech stack floating tags */}
          <div className="absolute top-1/4 -left-6 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0)] hover:scale-105 hover:border-emerald-400 transition-all duration-300 select-none animate-float">
            <Database className="w-3.5 h-3.5" />
            <span>MongoDB</span>
          </div>

          <div className="absolute bottom-1/4 -right-4 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0)] hover:scale-105 hover:border-cyan-400 transition-all duration-300 select-none animate-float-delayed">
            <Code className="w-3.5 h-3.5" />
            <span>React.js</span>
          </div>

          <div className="absolute -bottom-2 left-6 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-yellow-500/30 text-yellow-500 font-mono text-xs flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0)] hover:scale-105 hover:border-yellow-400 transition-all duration-300 select-none animate-float">
            <Cpu className="w-3.5 h-3.5" />
            <span>Node.js</span>
          </div>

          {/* Hexagonal frame container with glowing borders */}
          <div className="relative group p-1.5 transition-all duration-500">
            {/* Double Glowing Borders */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-2xl opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 -z-10" />
            <div className="absolute inset-0.5 bg-slate-950 rounded-2xl -z-10" />
            
            {/* Hexagonal Inner Mask */}
            <div className="relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors duration-500">
              
              {/* PLACE YOUR AI IMAGE HERE */}
              <img
                src={developerPortrait}
                alt="Syed Mohammed Pasha Quadri Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                id="developer-hero-image"
              />

              {/* Futuristic scanned screen overlay overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,210,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
            </div>
            
            {/* Micro Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
          </div>

        </div>

      </div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
