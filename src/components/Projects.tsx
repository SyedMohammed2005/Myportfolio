import { useState } from 'react';
import { ExternalLink, Github, Code, Sparkles, FolderGit2, X, Check, Search, SlidersHorizontal, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'frontend' | 'ai'>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Define key technologies for filtering based on existing project tags
  const keyTechnologies = ['all', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Gemini AI'];

  const filteredProjects = portfolioData.projects.filter((project) => {
    // Category filter
    const matchesCategory = filter === 'all' || project.category === filter;

    // Tech filter
    const matchesTech = selectedTech === 'all' || project.tags.some(tag => 
      tag.toLowerCase() === selectedTech.toLowerCase() ||
      (selectedTech === 'Gemini AI' && tag.toLowerCase().includes('gemini'))
    );

    // Search filter (searches title, description, long description, and tech tags)
    const matchesSearch = !searchTerm.trim() || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.longDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesTech && matchesSearch;
  });

  const clearAllFilters = () => {
    setFilter('all');
    setSelectedTech('all');
    setSearchTerm('');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai':
        return 'border-purple-500/30 text-purple-400 bg-purple-950/30';
      case 'fullstack':
        return 'border-emerald-500/30 text-emerald-400 bg-emerald-950/30';
      case 'frontend':
        return 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30';
      default:
        return 'border-slate-800 text-slate-400 bg-slate-900/40';
    }
  };

  const getFeatures = (projectId: number) => {
    switch (projectId) {
      case 1: // Sensai
        return [
          'Conversational mock technical interviews with real-time scoring.',
          'Intelligent PDF resume parser extracting strengths and flaws.',
          'Dynamic generation of personalized career progression roadmaps.',
          'Seamless local storage syncing and feedback storage engine.',
        ];
      case 2: // Pharmix
        return [
          'Secure doctor prescription image upload and storage system.',
          'Ailment-grouped medical inventory explorer and instant carts.',
          'Prescription validation workflow tracking order approval state.',
          'Full administrator catalog dashboard and customer shipment updates.',
        ];
      case 3: // Spotify
        return [
          'Robust React custom Web Audio player executing flawless track hooks.',
          'Dual play/pause triggers and interactive seeking bar durations.',
          'Volume level multipliers, song looping, and playlist queue systems.',
          'Immersive dark design with glassmorphic sliding navigation panels.',
        ];
      case 4: // Netflix
        return [
          'TMDB API queries pulling active, trending, and genre playlists.',
          'Dynamic video trailers played instantly inside a responsive overlay.',
          'Custom sliding carousel cards supporting smooth touch and drag gestures.',
          'High-contrast billboard background headers with custom fades.',
        ];
      case 5: // Amazon
        return [
          'Dynamic item cart with quantity addition and item removals.',
          'Subtotal calculators reacting instantly to checkout steps.',
          'Custom star ratings and keyword filters in product search bars.',
          'Optimized e-commerce responsive item listing cards.',
        ];
      default:
        return ['High performance responsive layout', 'Clean modular code structure', 'Advanced CSS styling'];
    }
  };

  return (
    <section id="projects" className="relative py-20 md:py-32 border-t border-slate-900 bg-transparent">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/2 blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/2 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Developer.projects()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Applications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-base font-sans">
            A curated selection of deep-dive full-stack applications, interactive clones, and artificial intelligence wrappers illustrating complex architectures.
          </p>
        </div>

        {/* Search & Filtering Control Panel */}
        <div className="w-full max-w-4xl mx-auto mb-16 bg-[#09090e]/60 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/1 to-transparent pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            {/* Top Row: Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4 text-cyan-400/80" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects by name, description, or technology tag (e.g., React, Gemini AI, MongoDB)..."
                className="w-full pl-11 pr-11 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all duration-300 font-sans shadow-inner"
                id="project-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white transition-colors cursor-pointer"
                  id="clear-search-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bottom Row: Category and Tech filters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Category Filter Buttons */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                  <Filter className="w-3 h-3 text-cyan-400" />
                  <span>Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'fullstack', 'frontend', 'ai'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none cursor-pointer border ${
                        filter === cat
                          ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(0,210,255,0.15)]'
                          : 'bg-slate-950/30 border-slate-900 text-slate-500 hover:text-white hover:border-slate-800'
                      }`}
                      id={`project-filter-${cat}`}
                    >
                      {cat === 'all' ? 'All' : cat === 'ai' ? 'AI' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Filter Chips */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                  <SlidersHorizontal className="w-3 h-3 text-purple-400" />
                  <span>Key Technology</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {keyTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-medium tracking-wide transition-all duration-200 focus:outline-none cursor-pointer border ${
                        selectedTech === tech
                          ? 'bg-purple-500/10 border-purple-400 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                          : 'bg-slate-950/30 border-slate-900 text-slate-500 hover:text-white hover:border-slate-800'
                      }`}
                      id={`project-tech-filter-${tech}`}
                    >
                      {tech === 'all' ? 'All Tech' : tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Reset Status */}
            {(filter !== 'all' || selectedTech !== 'all' || searchTerm) && (
              <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span>
                    Showing <strong className="text-white">{filteredProjects.length}</strong> of{' '}
                    <strong className="text-white">{portfolioData.projects.length}</strong> projects matching active criteria
                  </span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                  id="reset-filters-btn"
                >
                  <X className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Project Cards Area */}
        {filteredProjects.length === 0 ? (
          <div className="w-full max-w-md mx-auto text-center py-16 px-6 bg-[#09090e]/60 border border-slate-800 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-display font-bold text-lg">No projects match your search</h4>
              <p className="text-slate-400 text-sm font-sans">Try refining your keyword query or resetting your active filters.</p>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-cyan-400 text-black text-xs font-display font-bold uppercase tracking-wider rounded-xl hover:bg-cyan-300 transition-colors cursor-pointer inline-flex items-center gap-1"
              id="empty-state-reset-btn"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  key={project.id}
                  className="group rounded-2xl bg-[#09090e]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)]"
                  id={`project-card-${project.id}`}
                >
                  {/* Card Image and Interactive 3D Flip Overlay */}
                  <div className="relative aspect-[16/10] [perspective:1000px] border-b border-slate-900 overflow-hidden">
                    <div className="w-full h-full relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      
                      {/* Front Side: Rich Mockup Visual */}
                      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-10">
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Visual overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                        
                        {/* Category Badge */}
                        <span className={`absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md border tracking-wider ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>

                        {/* Interactive Flip Hint */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-black/75 border border-slate-800 text-[9px] font-mono font-medium text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                          <span>Hover to Flip Spec</span>
                        </div>

                        {/* Micro Scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,210,255,0.015)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />
                      </div>

                      {/* Back Side: Cyber Spec sheet & Console Log */}
                      <div className="absolute inset-0 w-full h-full bg-[#050508] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] z-0 border border-cyan-500/20">
                        {/* Dynamic glow grids */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,210,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_75%)] pointer-events-none" />
                        
                        <div className="relative z-10 space-y-3 font-mono">
                          <div className="flex justify-between items-center text-[10px] text-cyan-400 border-b border-cyan-500/10 pb-2">
                            <span className="font-bold tracking-widest uppercase">System Stats</span>
                            <span className="animate-pulse text-emerald-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              VERIFIED
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 text-left text-[10px] text-slate-400">
                            <p className="line-clamp-1"><span className="text-purple-400 font-semibold"># STACK:</span> {project.tags.join(', ')}</p>
                            <p><span className="text-cyan-400 font-semibold"># TYPE:</span> {project.category.toUpperCase()} COMPILATION</p>
                            <p><span className="text-yellow-400 font-semibold"># ENGINE:</span> VITE + REACT V18</p>
                            <p className="line-clamp-1"><span className="text-emerald-400 font-semibold"># REPO:</span> {project.githubUrl.replace('https://github.com/', '')}</p>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 p-2 rounded bg-cyan-950/20 border border-cyan-500/10 text-cyan-400 text-[9px] font-mono leading-tight text-left">
                          <Code className="w-3 h-3 flex-shrink-0 text-cyan-400" />
                          <span>MERN Architecture compiled. Click Demo to test real integration.</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech tags list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800/60 text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        id={`project-details-${project.id}`}
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Deep-dive Code</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 active:scale-95 transition-all duration-200 cursor-pointer"
                          title="View GitHub Repository"
                          id={`project-github-link-${project.id}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-lg bg-cyan-400 text-black font-display text-[11px] font-bold uppercase tracking-wider hover:bg-cyan-300 active:scale-95 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                          id={`project-live-link-${project.id}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Project Detailed Deep-Dive Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div
              className="relative w-full max-w-2xl bg-[#09090f] border border-cyan-500/20 rounded-2xl shadow-[0_0_50px_rgba(0,210,255,0.15)] overflow-hidden animate-fade-in"
              id="project-detail-modal"
            >
              {/* Modal Header/Banner */}
              <div className="relative aspect-[21/9] bg-slate-950 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-slate-950/30 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close modal"
                  id="modal-close-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Contents */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Title & Tags */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-semibold uppercase rounded-md border tracking-wider ${getCategoryColor(selectedProject.category)}`}>
                      {selectedProject.category}
                    </span>
                    {selectedProject.featured && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-semibold uppercase bg-amber-950/30 border border-amber-500/30 text-amber-400 rounded-md tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Long Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Project Summary</h4>
                  <p className="text-slate-400 text-sm font-sans leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Key Features Checkbox */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest">Key Features &amp; Modules</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans text-slate-300">
                    {getFeatures(selectedProject.id).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#0c0c14] p-2.5 rounded-lg border border-slate-900">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Stack Badges */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Complete Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="pt-6 border-t border-slate-900 flex items-center justify-end gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
                    id="modal-github-btn"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Code</span>
                  </a>

                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-display font-bold uppercase tracking-wider hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.3)] active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                    id="modal-demo-btn"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
