import { useState, useEffect } from 'react';
import { Mail, ArrowRight, Eye, Terminal, Database, Code, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import developerPortrait from '../assets/images/fsm.jpeg';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const { theme, personalInfo, heroImage } = usePortfolio();
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const activeHeroImage = heroImage || developerPortrait;
  const isLight = theme === 'light';

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
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs uppercase tracking-widest animate-pulse ${
            isLight
              ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-sm'
              : 'bg-cyan-950/40 border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.1)]'
          }`}>
            <Terminal className="w-3.5 h-3.5" />
            <span>Console.log("Welcome World")</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-none ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Hi, I am <br />
              <span className={
                isLight
                  ? 'bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent'
              }>
                {personalInfo.name}
              </span>
            </h1>
            
            {/* Typewriter text */}
            <div className="h-10 sm:h-12 flex items-center">
              <p className={`text-xl sm:text-2xl font-mono font-semibold flex items-center ${
                isLight ? 'text-sky-600' : 'text-cyan-400'
              }`}>
                &gt; {typedText}
                <span className={`w-2.5 h-6 ml-1.5 animate-blink ${
                  isLight ? 'bg-sky-600' : 'bg-cyan-400 shadow-[0_0_10px_rgba(0,210,255,1)]'
                }`} />
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className={`text-base sm:text-lg max-w-xl font-sans leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={handleScrollToContact}
              className="px-6 py-3.5 rounded-xl text-black font-display text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 hover:from-cyan-300 hover:via-teal-300 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
              id="hero-cta-hire"
            >
              Hire Me
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleOpenResume}
              className={`px-6 py-3.5 rounded-xl border font-display text-sm font-bold uppercase tracking-wider active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-800 hover:bg-black hover:text-white hover:border-black shadow-sm'
                  : 'border-cyan-500/30 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-950/30 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,210,255,0.2)]'
              }`}
              id="hero-cta-resume"
            >
              View Resume
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Core Tech Quick Badges */}
          <div className={`pt-8 border-t w-full max-w-lg ${isLight ? 'border-slate-200' : 'border-slate-900'}`}>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Core Stack Focus</p>
            <div className="flex flex-wrap gap-2.5">
              {['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-all duration-200 cursor-default ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-black hover:text-white hover:border-black'
                      : 'bg-[#0f0f15] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Circular Frame & Portrait Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
          
          {/* Background Ambient Glowing Rings */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[340px] h-[340px] rounded-full bg-cyan-500/15 blur-[80px] -z-10" 
          />
          <motion.div 
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute w-[280px] h-[280px] rounded-full bg-purple-500/15 blur-[80px] -z-10" 
          />
          
          {/* Floating Tech Stack Badges */}
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-1/4 -left-6 z-20 px-3.5 py-2 rounded-xl border font-mono text-xs flex items-center gap-2 shadow-lg select-none ${
              isLight
                ? 'bg-white/90 backdrop-blur-md border-emerald-300 text-emerald-700'
                : 'bg-slate-950/90 backdrop-blur-md border-emerald-500/30 text-emerald-400'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>MongoDB</span>
          </motion.div>

          <motion.div 
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className={`absolute bottom-1/4 -right-4 z-20 px-3.5 py-2 rounded-xl border font-mono text-xs flex items-center gap-2 shadow-lg select-none ${
              isLight
                ? 'bg-white/90 backdrop-blur-md border-sky-300 text-sky-700'
                : 'bg-slate-950/90 backdrop-blur-md border-cyan-500/30 text-cyan-400'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>React.js</span>
          </motion.div>

          <motion.div 
            animate={{ y: [-4, 6, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`absolute -bottom-2 left-6 z-20 px-3.5 py-2 rounded-xl border font-mono text-xs flex items-center gap-2 shadow-lg select-none ${
              isLight
                ? 'bg-white/90 backdrop-blur-md border-amber-300 text-amber-700'
                : 'bg-slate-950/90 backdrop-blur-md border-yellow-500/30 text-yellow-500'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-yellow-400" />
            <span>Node.js</span>
          </motion.div>

          {/* Floating Container (No Tilt / Rotation) */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative group p-2 flex items-center justify-center"
          >
            {/* Outer Rotating Cyber Halo Rings */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/40 animate-[spin_20s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-1.5 rounded-full border border-purple-500/30 animate-[spin_12s_linear_infinite_reverse] pointer-events-none" />

            {/* Glowing Backdrop Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-teal-400 to-purple-500 rounded-full opacity-80 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 -z-10" 
            />
            <div className={`absolute inset-1 rounded-full -z-10 ${isLight ? 'bg-white' : 'bg-slate-950'}`} />
            
            {/* Circular Frame Container */}
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                boxShadow: isLight 
                  ? '0 20px 40px -10px rgba(0,210,255,0.3)' 
                  : '0 20px 50px -10px rgba(0,210,255,0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden border-2 transition-colors duration-500 ${
                isLight ? 'border-sky-300 group-hover:border-sky-500 shadow-xl' : 'border-cyan-500/40 group-hover:border-cyan-400 shadow-[0_0_35px_rgba(0,210,255,0.3)]'
              }`}
            >
              <img
                src={activeHeroImage}
                alt="Syed Mohammed Pasha Quadri Portrait"
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 ease-out"
                id="developer-hero-image"
              />

              {/* Shimmer / Light Sweep Effect on Hover */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                whileHover={{ x: '200%', opacity: [0, 0.6, 0] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
              />

              {/* Ambient Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none ${
                isLight ? 'from-slate-200' : 'from-slate-950'
              }`} />
            </motion.div>

            {/* Sparkle Badge */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 z-30 p-2 rounded-full bg-cyan-500 text-black shadow-lg shadow-cyan-500/50 flex items-center justify-center"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
            </motion.div>
          </motion.div>

        </div>

      </div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
