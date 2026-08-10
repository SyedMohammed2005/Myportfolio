import { useState } from 'react';
import { ExternalLink, Github, Code, Sparkles, FolderGit2, X, Check, Search, SlidersHorizontal, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

export default function Projects() {
  const { projects, theme } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'frontend' | 'ai'>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isLight = theme === 'light';

  // Define key technologies for filtering based on existing project tags
  const keyTechnologies = ['all', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Gemini AI'];

  const filteredProjects = projects.filter((project) => {
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
        return isLight ? 'border-purple-300 text-purple-700 bg-purple-50' : 'border-purple-500/30 text-purple-400 bg-purple-950/30';
      case 'fullstack':
        return isLight ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-emerald-500/30 text-emerald-400 bg-emerald-950/30';
      case 'frontend':
        return isLight ? 'border-sky-300 text-sky-700 bg-sky-50' : 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30';
      default:
        return isLight ? 'border-slate-300 text-slate-700 bg-slate-100' : 'border-slate-800 text-slate-400 bg-slate-900/40';
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
    <section id="projects" className={`relative py-20 md:py-32 border-t ${
      isLight ? 'bg-slate-100/60 border-slate-200' : 'border-slate-900 bg-transparent'
    }`}>
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/3 blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/3 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs uppercase tracking-widest ${
            isLight ? 'bg-sky-100 border-sky-300 text-sky-800' : 'bg-cyan-950/40 border-cyan-500/20 text-cyan-400'
          }`}>
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Developer.projects()</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Featured <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Applications</span>
          </h2>
          <p className={`max-w-2xl text-base font-sans ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            A curated selection of deep-dive full-stack applications, interactive clones, and artificial intelligence wrappers illustrating complex architectures.
          </p>
        </div>

        {/* Search & Filtering Control Panel */}
        <div className={`w-full max-w-4xl mx-auto mb-16 border rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm shadow-md ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#09090e]/60 border-slate-800/80 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)]'
        }`}>
          <div className="space-y-6 relative z-10">
            {/* Top Row: Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4 text-cyan-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects by name, description, or technology tag (e.g., React, Gemini AI, MongoDB)..."
                className={`w-full pl-11 pr-11 py-3.5 border rounded-xl text-sm transition-all duration-300 font-sans ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    : 'bg-slate-950/80 border-slate-800/80 text-white placeholder-slate-500 focus:border-cyan-400'
                }`}
                id="project-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
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
                <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-1 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <Filter className="w-3 h-3 text-cyan-500" />
                  <span>Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'fullstack', 'frontend', 'ai'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none cursor-pointer border ${
                        filter === cat
                          ? 'bg-cyan-500/10 border-cyan-400 text-cyan-500 font-bold'
                          : isLight
                          ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-black hover:text-white hover:border-black'
                          : 'bg-slate-950/30 border-slate-900 text-slate-500 hover:text-white'
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
                <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-1 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <SlidersHorizontal className="w-3 h-3 text-purple-500" />
                  <span>Key Technology</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {keyTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-medium tracking-wide transition-all duration-200 focus:outline-none cursor-pointer border ${
                        selectedTech === tech
                          ? 'bg-purple-500/10 border-purple-400 text-purple-600 font-bold'
                          : isLight
                          ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-black hover:text-white hover:border-black'
                          : 'bg-slate-950/30 border-slate-900 text-slate-500 hover:text-white'
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
              <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
                isLight ? 'border-slate-200 text-slate-600' : 'border-slate-900/60 text-slate-400'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                  <span>
                    Showing <strong className={isLight ? 'text-slate-900' : 'text-white'}>{filteredProjects.length}</strong> of{' '}
                    <strong className={isLight ? 'text-slate-900' : 'text-white'}>{projects.length}</strong> projects matching active criteria
                  </span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-cyan-600 hover:text-cyan-800 transition-colors flex items-center gap-1 cursor-pointer font-bold"
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
          <div className={`w-full max-w-md mx-auto text-center py-16 px-6 border rounded-2xl space-y-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#09090e]/60 border-slate-800'
          }`}>
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-display font-bold text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>No projects match your search</h4>
              <p className={`text-sm font-sans ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Try refining your keyword query or resetting your active filters.</p>
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
                  className={`group rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden shadow-md ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-black hover:shadow-xl'
                      : 'bg-[#09090e]/80 border-slate-800/80 hover:border-cyan-500/40 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)]'
                  }`}
                  id={`project-card-${project.id}`}
                >
                  {/* Card Image and Interactive 3D Flip Overlay */}
                  <div className="relative aspect-[16/10] [perspective:1000px] border-b border-slate-200 dark:border-slate-900 overflow-hidden">
                    <div className="w-full h-full relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      
                      {/* Front Side: Rich Mockup Visual */}
                      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-10">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Visual overlay with gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t opacity-85 ${
                          isLight ? 'from-slate-900/60 via-transparent to-transparent' : 'from-slate-950 via-slate-950/20 to-transparent'
                        }`} />
                        
                        {/* Category Badge */}
                        <span className={`absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md border tracking-wider ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>

                        {/* Interactive Flip Hint */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-black/75 border border-slate-800 text-[9px] font-mono font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                          <span>Hover to Flip Spec</span>
                        </div>
                      </div>

                      {/* Back Side: Cyber Spec sheet & Console Log */}
                      <div className={`absolute inset-0 w-full h-full p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] z-0 border ${
                        isLight ? 'bg-slate-900 text-slate-100 border-sky-400' : 'bg-[#050508] border-cyan-500/20'
                      }`}>
                        <div className="relative z-10 space-y-3 font-mono">
                          <div className="flex justify-between items-center text-[10px] text-cyan-400 border-b border-cyan-500/20 pb-2">
                            <span className="font-bold tracking-widest uppercase">System Stats</span>
                            <span className="animate-pulse text-emerald-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              VERIFIED
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 text-left text-[10px] text-slate-300">
                            <p className="line-clamp-1"><span className="text-purple-400 font-semibold"># STACK:</span> {project.tags.join(', ')}</p>
                            <p><span className="text-cyan-400 font-semibold"># TYPE:</span> {project.category.toUpperCase()} COMPILATION</p>
                            <p><span className="text-yellow-400 font-semibold"># ENGINE:</span> VITE + REACT V18</p>
                            <p className="line-clamp-1"><span className="text-emerald-400 font-semibold"># REPO:</span> {project.githubUrl.replace('https://github.com/', '')}</p>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 p-2 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-[9px] font-mono leading-tight text-left">
                          <Code className="w-3 h-3 flex-shrink-0 text-cyan-400" />
                          <span>MERN Architecture compiled. Click Demo to test real integration.</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <h3 className={`text-lg font-display font-bold transition-colors duration-300 ${
                        isLight ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-400'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech tags list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 text-[10px] font-mono rounded border ${
                          isLight
                            ? 'bg-slate-100 border-slate-300 text-slate-700'
                            : 'bg-slate-900 border-slate-800/60 text-slate-400'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Buttons */}
                    <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                      isLight ? 'border-slate-200' : 'border-slate-900/60'
                    }`}>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className={`text-xs font-mono flex items-center gap-1 cursor-pointer font-semibold ${
                          isLight ? 'text-cyan-700 hover:text-slate-900' : 'text-cyan-400 hover:text-white'
                        }`}
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
                          className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                            isLight
                              ? 'bg-slate-100 border-slate-300 text-slate-700 hover:text-black hover:border-slate-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                          title="View GitHub Repository"
                          id={`project-github-link-${project.id}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-lg bg-cyan-400 text-black font-display text-[11px] font-bold uppercase tracking-wider hover:bg-cyan-300 active:scale-95 transition-all duration-200 flex items-center gap-1 cursor-pointer shadow-sm"
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
              className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden animate-fade-in ${
                isLight ? 'bg-white border-slate-300' : 'bg-[#09090f] border-cyan-500/20'
              }`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
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
                  <h3 className={`text-2xl font-display font-bold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Long Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Project Summary</h4>
                  <p className={`text-sm font-sans leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Key Features Checkbox */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest">Key Features &amp; Modules</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans">
                    {getFeatures(selectedProject.id).map((feat, i) => (
                      <li key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#0c0c14] border-slate-900 text-slate-300'
                      }`}>
                        <Check className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
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
                      <span key={tag} className={`px-2.5 py-1 text-[10px] font-mono rounded border ${
                        isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions bottom */}
                <div className={`pt-6 border-t flex items-center justify-end gap-3 ${
                  isLight ? 'border-slate-200' : 'border-slate-900'
                }`}>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2.5 rounded-xl border text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isLight
                        ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                    id="modal-github-btn"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Code</span>
                  </a>

                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-display font-bold uppercase tracking-wider hover:bg-cyan-300 shadow-sm active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
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

