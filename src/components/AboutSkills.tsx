import { useState } from 'react';
import { Cpu, Server, Database, Sparkles, User, Brain, Code2, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function AboutSkills() {
  const { skills, theme } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database'>('all');

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
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSkillDetails = (name: string) => {
    switch (name) {
      case 'React':
        return 'Building modular, highly performant, reactive single-page applications with hooks and virtual DOM optimization.';
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
      case 'MySQL':
        return 'Relational database schemas, normalized table keys, optimized join queries, and database transaction locks.';
      case 'Neon DB':
        return 'Serverless PostgreSQL, schema migrations, scalable cloud relational database storage, and quick query executions.';
      default:
        return 'Experienced in deploying and maintaining high-quality modules for complex web interfaces.';
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
            {(['all', 'frontend', 'backend', 'database'] as const).map((tab) => (
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
                {tab === 'all' ? 'All Skills' : `${tab} Stack`}
              </button>
            ))}
          </div>

          {/* Skills Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group shadow-sm ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-black hover:shadow-md hover:-translate-y-1'
                    : 'bg-[#08080c]/80 border-slate-800/80 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(0,210,255,0.15)]'
                }`}
                id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        {getCategoryIcon(skill.category)}
                      </div>
                      <span className={`font-display font-bold text-base tracking-tight ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>{skill.name}</span>
                    </div>
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
                      isLight
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'text-cyan-400 bg-cyan-950/40 border-cyan-500/20'
                    }`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className={`text-xs font-sans leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {getSkillDetails(skill.name)}
                  </p>
                </div>

                {/* Progress track */}
                <div className={`mt-5 pt-3 border-t ${isLight ? 'border-slate-100' : 'border-slate-900'}`}>
                  <div className={`h-1 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div
                      className="h-full bg-cyan-500 rounded-full group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

