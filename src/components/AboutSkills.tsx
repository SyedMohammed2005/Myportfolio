import { useState } from 'react';
import { Cpu, Server, Database, Wrench, Sparkles, User, Brain, Code2, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function AboutSkills() {
  const { skills, theme } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tools'>('all');

  const isLight = theme === 'light';

  const filteredSkills = skills.filter((skill) => {
    if (activeTab === 'all') return true;
    return skill.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Cpu className="w-4 h-4 text-cyan-500" />;
      case 'backend':
        return <Server className="w-4 h-4 text-purple-500" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSkillDetails = (name: string) => {
    switch (name) {
      case 'React':
        return 'Building modular, highly performant, reactive single-page applications with hooks and virtual DOM optimization.';
      case 'Next.js':
        return 'Full-stack React framework with App Router, SSR/SSG rendering, API routes, and optimized production deployments.';
      case 'JavaScript':
        return 'Advanced ES6+ capabilities, asynchronous routines, promise engines, and lightweight state managers.';
      case 'Tailwind CSS':
        return 'Responsive utility architectures, custom configurations, theme extensions, and layout grid scaling.';
      case 'HTML5 / CSS3':
        return 'Semantic page grids, flex layouts, raw CSS variables, keyframe animations, and cross-browser accessibility.';
      case 'Node.js':
        return 'Scalable server-side event loops, package management, native stream processes, and microservices.';
      case 'Express.js':
        return 'Fast RESTful APIs, routing mechanisms, middleware configurations, error handlers, and controller patterns.';
      case 'MongoDB':
        return 'NoSQL document modeling, indexing protocols, aggregation pipelines, and secure database cluster instances.';
      case 'PostgreSQL':
        return 'Relational database architecture, complex joins, indexing, ACID transactions, and scalable cloud Postgres instances.';
      case 'SQL':
        return 'Structured querying, normalized table schemas, subqueries, aggregations, and relational data optimization.';
      case 'Git':
        return 'Distributed version control, branching workflows, interactive rebasing, merge conflict resolution, and commit hygiene.';
      case 'GitHub':
        return 'Pull request reviews, collaborative issue tracking, repository automation, and CI/CD deployment workflows.';
      case 'Postman':
        return 'REST API testing, environment variables, automated collection runners, auth headers, and endpoint debugging.';
      default:
        return 'Experienced in deploying and maintaining high-quality modules for complex web interfaces.';
    }
  };

  const getSkillVisualTheme = (name: string, category: string) => {
    const key = name.toLowerCase();

    if (key.includes('react')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-sky-50/70 to-cyan-100/60'
          : 'bg-gradient-to-br from-[#08080c]/95 via-cyan-950/25 to-sky-950/35',
        glow: 'bg-cyan-500/20',
        watermarkColor: isLight ? 'text-cyan-600' : 'text-cyan-400',
        barGradient: 'from-cyan-400 to-sky-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" strokeWidth="3.5" />
            <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" strokeWidth="3.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" strokeWidth="3.5" transform="rotate(120 50 50)" />
          </svg>
        ),
      };
    }

    if (key.includes('next')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-slate-100/90 to-zinc-200/70'
          : 'bg-gradient-to-br from-[#08080c]/95 via-slate-900/60 to-zinc-900/70',
        glow: isLight ? 'bg-slate-400/20' : 'bg-white/15',
        watermarkColor: isLight ? 'text-slate-800' : 'text-white',
        barGradient: isLight ? 'from-slate-700 to-slate-900' : 'from-slate-200 to-cyan-400',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="4" />
            <path d="M35 68V33L74 79" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M65 33V56" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
          </svg>
        ),
      };
    }

    if (key.includes('javascript') || key === 'js') {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-amber-50/75 to-yellow-100/65'
          : 'bg-gradient-to-br from-[#08080c]/95 via-amber-950/20 to-yellow-950/30',
        glow: 'bg-amber-400/20',
        watermarkColor: isLight ? 'text-amber-600' : 'text-amber-400',
        barGradient: 'from-amber-400 to-yellow-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="14" y="14" width="72" height="72" rx="14" stroke="currentColor" strokeWidth="4" />
            <path d="M44 42V65C44 70 40 73 35 73C31 73 28 71 27 68" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M72 46C70 43 66 41 62 41C57 41 53 44 53 49C53 54 57 55 63 57C69 59 73 61 73 66C73 71 68 74 62 74C56 74 52 71 50 67" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
          </svg>
        ),
      };
    }

    if (key.includes('tailwind')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-sky-50/80 to-teal-100/65'
          : 'bg-gradient-to-br from-[#08080c]/95 via-sky-950/25 to-teal-950/35',
        glow: 'bg-sky-400/20',
        watermarkColor: isLight ? 'text-sky-600' : 'text-sky-400',
        barGradient: 'from-sky-400 to-teal-400',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M26 42C30 29 39 24 50 24C64 24 66 34 73 36C78 37 82 35 86 31C82 44 73 49 62 49C48 49 46 39 39 37C34 36 30 38 26 42Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M14 68C18 55 27 50 38 50C52 50 54 60 61 62C66 63 70 61 74 57C70 70 61 75 50 75C36 75 34 65 27 63C22 62 18 64 14 68Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        ),
      };
    }

    if (key.includes('html') || key.includes('css')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-orange-50/75 to-blue-100/55'
          : 'bg-gradient-to-br from-[#08080c]/95 via-orange-950/20 to-blue-950/30',
        glow: 'bg-orange-500/20',
        watermarkColor: isLight ? 'text-orange-600' : 'text-orange-400',
        barGradient: 'from-orange-400 to-blue-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M34 32L14 50L34 68" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M66 32L86 50L66 68" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M56 24L44 76" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        ),
      };
    }

    if (key.includes('node')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-emerald-50/75 to-green-100/65'
          : 'bg-gradient-to-br from-[#08080c]/95 via-emerald-950/25 to-green-950/35',
        glow: 'bg-emerald-500/20',
        watermarkColor: isLight ? 'text-emerald-600' : 'text-emerald-400',
        barGradient: 'from-emerald-400 to-green-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
            <path d="M36 62V38L64 62V38" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };
    }

    if (key.includes('express')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-purple-50/75 to-fuchsia-100/60'
          : 'bg-gradient-to-br from-[#08080c]/95 via-purple-950/25 to-fuchsia-950/30',
        glow: 'bg-purple-500/20',
        watermarkColor: isLight ? 'text-purple-600' : 'text-purple-400',
        barGradient: 'from-purple-400 to-fuchsia-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="24" cy="30" r="8" stroke="currentColor" strokeWidth="4" />
            <circle cx="76" cy="50" r="8" stroke="currentColor" strokeWidth="4" />
            <circle cx="24" cy="70" r="8" stroke="currentColor" strokeWidth="4" />
            <path d="M32 30H50L68 50M32 70H50L68 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };
    }

    if (key.includes('mongo')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-emerald-50/80 to-lime-100/60'
          : 'bg-gradient-to-br from-[#08080c]/95 via-emerald-950/25 to-lime-950/25',
        glow: 'bg-emerald-500/20',
        watermarkColor: isLight ? 'text-emerald-600' : 'text-emerald-400',
        barGradient: 'from-emerald-400 to-lime-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 14C66 30 72 48 68 65C65 77 56 83 50 86C44 83 35 77 32 65C28 48 34 30 50 14Z" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
            <path d="M50 26V88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ),
      };
    }

    if (key.includes('postgres')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-blue-50/80 to-indigo-100/65'
          : 'bg-gradient-to-br from-[#08080c]/95 via-blue-950/25 to-indigo-950/35',
        glow: 'bg-blue-500/20',
        watermarkColor: isLight ? 'text-blue-600' : 'text-blue-400',
        barGradient: 'from-blue-400 to-indigo-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <ellipse cx="50" cy="26" rx="28" ry="11" stroke="currentColor" strokeWidth="4" />
            <path d="M22 26V50C22 56 34.5 61 50 61C65.5 61 78 56 78 50V26" stroke="currentColor" strokeWidth="4" />
            <path d="M22 50V74C22 80 34.5 85 50 85C65.5 85 78 80 78 74V50" stroke="currentColor" strokeWidth="4" />
          </svg>
        ),
      };
    }

    if (key === 'sql' || key.includes('sql')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-teal-50/80 to-cyan-100/60'
          : 'bg-gradient-to-br from-[#08080c]/95 via-teal-950/25 to-cyan-950/35',
        glow: 'bg-teal-500/20',
        watermarkColor: isLight ? 'text-teal-600' : 'text-teal-400',
        barGradient: 'from-teal-400 to-cyan-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="16" y="20" width="68" height="60" rx="10" stroke="currentColor" strokeWidth="4" />
            <line x1="16" y1="38" x2="84" y2="38" stroke="currentColor" strokeWidth="4" />
            <line x1="16" y1="58" x2="84" y2="58" stroke="currentColor" strokeWidth="4" />
            <line x1="44" y1="38" x2="44" y2="80" stroke="currentColor" strokeWidth="4" />
          </svg>
        ),
      };
    }

    if (key === 'git') {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-orange-50/80 to-red-100/60'
          : 'bg-gradient-to-br from-[#08080c]/95 via-orange-950/25 to-red-950/25',
        glow: 'bg-orange-500/20',
        watermarkColor: isLight ? 'text-orange-600' : 'text-orange-400',
        barGradient: 'from-orange-400 to-red-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="32" cy="24" r="9" stroke="currentColor" strokeWidth="4.5" />
            <circle cx="32" cy="76" r="9" stroke="currentColor" strokeWidth="4.5" />
            <circle cx="70" cy="48" r="9" stroke="currentColor" strokeWidth="4.5" />
            <path d="M32 33V67" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M32 34C32 46 46 48 61 48" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        ),
      };
    }

    if (key.includes('github')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-indigo-50/75 to-slate-200/70'
          : 'bg-gradient-to-br from-[#08080c]/95 via-indigo-950/25 to-slate-900/60',
        glow: 'bg-indigo-500/20',
        watermarkColor: isLight ? 'text-indigo-600' : 'text-indigo-300',
        barGradient: 'from-indigo-400 to-purple-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="4" strokeDasharray="6 6" />
            <circle cx="34" cy="36" r="7" stroke="currentColor" strokeWidth="4" />
            <circle cx="66" cy="36" r="7" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="68" r="7" stroke="currentColor" strokeWidth="4" />
            <path d="M39 41L46 62M61 41L54 62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ),
      };
    }

    if (key.includes('postman')) {
      return {
        gradient: isLight
          ? 'bg-gradient-to-br from-white via-amber-50/80 to-orange-100/65'
          : 'bg-gradient-to-br from-[#08080c]/95 via-orange-950/25 to-amber-950/30',
        glow: 'bg-orange-500/20',
        watermarkColor: isLight ? 'text-orange-600' : 'text-orange-400',
        barGradient: 'from-orange-400 to-amber-500',
        watermark: (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="4" />
            <path d="M36 62L66 34M66 34H47M66 34V53" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="34" cy="64" r="6" fill="currentColor" />
          </svg>
        ),
      };
    }

    // Category fallback for any custom skills added via Settings
    switch (category) {
      case 'frontend':
        return {
          gradient: isLight ? 'bg-gradient-to-br from-white to-cyan-50/80' : 'bg-gradient-to-br from-[#08080c]/95 to-cyan-950/25',
          glow: 'bg-cyan-500/15',
          watermarkColor: isLight ? 'text-cyan-600' : 'text-cyan-400',
          barGradient: 'from-cyan-400 to-purple-500',
          watermark: (
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <rect x="18" y="22" width="64" height="56" rx="10" stroke="currentColor" strokeWidth="4" />
              <path d="M38 42L28 50L38 58M62 42L72 50L62 58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
        };
      case 'backend':
        return {
          gradient: isLight ? 'bg-gradient-to-br from-white to-purple-50/80' : 'bg-gradient-to-br from-[#08080c]/95 to-purple-950/25',
          glow: 'bg-purple-500/15',
          watermarkColor: isLight ? 'text-purple-600' : 'text-purple-400',
          barGradient: 'from-purple-400 to-cyan-400',
          watermark: (
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <rect x="18" y="20" width="64" height="24" rx="6" stroke="currentColor" strokeWidth="4" />
              <rect x="18" y="56" width="64" height="24" rx="6" stroke="currentColor" strokeWidth="4" />
              <circle cx="32" cy="32" r="3" fill="currentColor" />
              <circle cx="32" cy="68" r="3" fill="currentColor" />
            </svg>
          ),
        };
      case 'database':
        return {
          gradient: isLight ? 'bg-gradient-to-br from-white to-emerald-50/80' : 'bg-gradient-to-br from-[#08080c]/95 to-emerald-950/25',
          glow: 'bg-emerald-500/15',
          watermarkColor: isLight ? 'text-emerald-600' : 'text-emerald-400',
          barGradient: 'from-emerald-400 to-cyan-400',
          watermark: (
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <ellipse cx="50" cy="28" rx="28" ry="11" stroke="currentColor" strokeWidth="4" />
              <path d="M22 28V72C22 78 34.5 83 50 83C65.5 83 78 78 78 72V28" stroke="currentColor" strokeWidth="4" />
            </svg>
          ),
        };
      default:
        return {
          gradient: isLight ? 'bg-gradient-to-br from-white to-amber-50/80' : 'bg-gradient-to-br from-[#08080c]/95 to-amber-950/25',
          glow: 'bg-amber-500/15',
          watermarkColor: isLight ? 'text-amber-600' : 'text-amber-400',
          barGradient: 'from-amber-400 to-orange-500',
          watermark: (
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="4" strokeDasharray="8 6" />
              <circle cx="50" cy="50" r="9" stroke="currentColor" strokeWidth="4" />
            </svg>
          ),
        };
    }
  };

  return (
    <section id="about" className={`relative py-20 md:py-32 overflow-hidden border-t ${
      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#07070a]/40 border-slate-900'
    }`}>
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-24">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs uppercase tracking-widest ${
            isLight ? 'bg-sky-100 border-sky-300 text-sky-800' : 'bg-cyan-950/40 border-cyan-500/20 text-cyan-400'
          }`}>
            <User className="w-3.5 h-3.5" />
            <span>Developer.profile()</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            About Me &amp; <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className={`max-w-2xl text-base font-sans ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            A comprehensive overview of my professional trajectory, architectural philosophies, and the core technologies I employ to solve complex software problems.
          </p>
        </div>

        {/* About Grid - Bio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Card 1: Bio */}
          <div className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-md ${
            isLight
              ? 'bg-white border-slate-200 hover:border-black hover:shadow-lg'
              : 'bg-[#09090e]/60 border-slate-800/80 hover:border-cyan-500/30'
          } lg:col-span-7`}>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isLight ? 'bg-sky-50 border-sky-200 text-sky-600' : 'bg-cyan-950/60 border-cyan-500/20 text-cyan-400'
                }`}>
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-display font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Philosophy &amp; Passion</h3>
              </div>
              
              <div className={`space-y-4 font-sans leading-relaxed text-sm sm:text-base ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <p>
                  As a self-motivated MERN Stack Developer, I bridge the gap between backend scalability and sleek, front-end visual perfection. I design applications with the philosophy that software should be mathematically efficient on the server and visually spectacular in the client.
                </p>
                <p>
                  My experience includes working on rich clones of global platforms, standalone full-stack tools (like career assistants powered by AI models), and active enterprise web portals. I am continuously exploring emerging tech stacks such as serverless Postgres (Neon DB) and edge computation interfaces.
                </p>
              </div>
            </div>
            
            <div className={`mt-8 pt-6 border-t flex items-center gap-6 relative z-10 text-xs font-mono ${
              isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800/60 text-slate-500'
            }`}>
              <div>
                <span className="text-cyan-500 text-sm font-bold block">15+</span>
                <span>Completed Mockups</span>
              </div>
              <div>
                <span className="text-cyan-500 text-sm font-bold block">5+</span>
                <span>Full-Scale Projects</span>
              </div>
              <div>
                <span className="text-cyan-500 text-sm font-bold block">100%</span>
                <span>Responsive Delivery</span>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive metrics */}
          <div className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-md lg:col-span-5 ${
            isLight
              ? 'bg-white border-slate-200 hover:border-black hover:shadow-lg'
              : 'bg-[#09090e]/60 border-slate-800/80 hover:border-purple-500/30'
          }`}>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isLight ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-purple-950/60 border-purple-500/20 text-purple-400'
                }`}>
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-display font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Full-Stack Capability</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className={`flex justify-between text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>Frontend Architecture (UX/UI, React, Tailwind)</span>
                    <span className="text-cyan-500 font-bold">92%</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={`flex justify-between text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>Backend &amp; API Orchestration (Node, Express)</span>
                    <span className="text-purple-500 font-bold">86%</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[86%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={`flex justify-between text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>Databases &amp; Datastores (NoSQL &amp; Relational)</span>
                    <span className="text-emerald-500 font-bold">82%</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full w-[82%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-xl border flex items-start gap-3 relative z-10 ${
              isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950/80 border-slate-800'
            }`}>
              <Code2 className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <div className={`text-xs font-mono leading-normal ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Active Status:</span> Currently developing <span className="text-teal-500 font-bold">Pharmix</span>, a state-of-the-art medicine cart and automated prescription platform.
              </div>
            </div>
          </div>

        </div>

        {/* Skills Filtering and Grid */}
        <span id="skills" className="block scroll-mt-24" />
        <div className="space-y-8 pt-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {(['all', 'frontend', 'backend', 'database', 'tools'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer border ${
                  activeTab === tab
                    ? 'bg-cyan-500/10 border-cyan-400 text-cyan-500 shadow-sm'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-black hover:text-white hover:border-black'
                    : 'bg-slate-950/20 border-slate-800 text-slate-400 hover:text-white'
                }`}
                id={`skills-tab-${tab}`}
              >
                {tab === 'all' ? 'All Skills' : tab === 'tools' ? 'Tools' : `${tab} Stack`}
              </button>
            ))}
          </div>

          {/* Skills Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => {
              const visual = getSkillVisualTheme(skill.name, skill.category);
              return (
                <div
                  key={skill.name}
                  className={`relative overflow-hidden p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group shadow-sm ${
                    visual.gradient
                  } ${
                    isLight
                      ? 'border-slate-200 hover:border-black hover:shadow-md hover:-translate-y-1'
                      : 'border-slate-800/80 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(0,210,255,0.15)]'
                  }`}
                  id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {/* Subtle Tech Grid Texture */}
                  <div
                    className={`pointer-events-none absolute inset-0 ${
                      isLight
                        ? 'bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)]'
                        : 'bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]'
                    } [background-size:16px_16px] opacity-60`}
                  />

                  {/* Ambient Corner Glow */}
                  <div
                    className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 opacity-50 group-hover:opacity-90 ${visual.glow}`}
                  />

                  {/* Related Tech SVG Background Watermark */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none select-none absolute -bottom-3 -right-3 w-28 h-28 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 ${
                      visual.watermarkColor
                    } ${
                      isLight
                        ? 'opacity-[0.10] group-hover:opacity-[0.18]'
                        : 'opacity-[0.12] group-hover:opacity-[0.22]'
                    }`}
                  >
                    {visual.watermark}
                  </div>

                  <div className="space-y-4 relative z-10">
                    {/* Card Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center backdrop-blur-sm ${
                          isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                        }`}>
                          {getCategoryIcon(skill.category)}
                        </div>
                        <span className={`font-display font-bold text-base tracking-tight ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>{skill.name}</span>
                      </div>
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border backdrop-blur-sm ${
                        isLight
                          ? 'bg-white/85 text-sky-700 border-sky-200'
                          : 'text-cyan-400 bg-cyan-950/50 border-cyan-500/20'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Card Description */}
                    <p className={`text-xs font-sans leading-normal ${isLight ? 'text-slate-700' : 'text-slate-300/90'}`}>
                      {getSkillDetails(skill.name)}
                    </p>
                  </div>

                  {/* Progress track */}
                  <div className={`mt-5 pt-3 border-t relative z-10 ${isLight ? 'border-slate-200/70' : 'border-slate-800/70'}`}>
                    <div className={`h-1 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200/80' : 'bg-slate-900/90'}`}>
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${visual.barGradient} transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
