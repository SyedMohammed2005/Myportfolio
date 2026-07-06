import { useState } from 'react';
import { Cpu, Server, Database, Sparkles, User, Brain, Code2, Layers } from 'lucide-react';
import { portfolioData } from '../data';

export default function AboutSkills() {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database'>('all');

  const filteredSkills = portfolioData.skills.filter((skill) => {
    if (activeTab === 'all') return true;
    return skill.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-purple-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
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
    <section id="about" className="relative py-20 md:py-32 overflow-hidden border-t border-slate-900 bg-[#07070a]/40">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/3 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-24">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <User className="w-3.5 h-3.5" />
            <span>Developer.profile()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            About Me &amp; <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-base font-sans">
            A comprehensive overview of my professional trajectory, architectural philosophies, and the core technologies I employ to solve complex software problems.
          </p>
        </div>

        {/* About Grid - Bio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Card 1: Bio */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-[#09090e]/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Philosophy &amp; Passion</h3>
              </div>
              
              <div className="space-y-4 text-slate-400 font-sans leading-relaxed text-sm sm:text-base">
                <p>
                  As a self-motivated MERN Stack Developer, I bridge the gap between backend scalability and sleek, front-end visual perfection. I design applications with the philosophy that software should be mathematically efficient on the server and visually spectacular in the client.
                </p>
                <p>
                  My experience includes working on rich clones of global platforms, standalone full-stack tools (like career assistants powered by AI models), and active enterprise web portals. I am continuously exploring emerging tech stacks such as serverless Postgres (Neon DB) and edge computation interfaces.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-6 relative z-10 text-xs font-mono text-slate-500">
              <div>
                <span className="text-cyan-400 text-sm font-bold block">15+</span>
                <span>Completed Mockups</span>
              </div>
              <div>
                <span className="text-cyan-400 text-sm font-bold block">5+</span>
                <span>Full-Scale Projects</span>
              </div>
              <div>
                <span className="text-cyan-400 text-sm font-bold block">100%</span>
                <span>Responsive Delivery</span>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive metrics */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#09090e]/60 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Full-Stack Capability</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Frontend Architecture (UX/UI, React, Tailwind)</span>
                    <span className="text-cyan-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Backend &amp; API Orchestration (Node, Express)</span>
                    <span className="text-purple-400">86%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[86%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Databases &amp; Datastores (NoSQL &amp; Relational)</span>
                    <span className="text-emerald-400">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full w-[82%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 relative z-10">
              <Code2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs font-mono text-slate-400 leading-normal">
                <span className="text-white font-semibold">Active Status:</span> Currently developing <span className="text-teal-400">Pharmix</span>, a state-of-the-art medicine cart and automated prescription platform.
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
                    ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                    : 'bg-slate-950/20 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
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
                className="p-6 rounded-2xl bg-[#08080c]/80 border border-slate-800/80 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(0,210,255,0.15)] transition-all duration-300 flex flex-col justify-between group"
                id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <span className="font-display font-bold text-white text-base tracking-tight">{skill.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="text-slate-400 text-xs font-sans leading-normal">
                    {getSkillDetails(skill.name)}
                  </p>
                </div>

                {/* Progress track */}
                <div className="mt-5 pt-3 border-t border-slate-900">
                  <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-500"
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
