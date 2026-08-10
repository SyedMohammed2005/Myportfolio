import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Check,
  AlertCircle,
  FolderPlus,
  Award,
  FileText,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  Link as LinkIcon,
  Github as GithubIcon,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Skill } from '../types';
import developerPortrait from '../assets/images/mdportfolio.jpeg';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = '$Yed762005';

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    theme,
    projects,
    skills,
    customResume,
    heroImage,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
    updateResume,
    updateHeroImage,
    resetAllData,
  } = usePortfolio();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'resume' | 'homeImage'>('projects');

  // Hero Image input state
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Success toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Project Form state
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'fullstack' as Project['category'],
    description: '',
    longDescription: '',
    tagsInput: '',
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: true,
  });

  // Skill Form state
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'frontend' as Skill['category'],
    level: 85,
    iconName: 'Code',
  });

  // Resume Upload state
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeFileData, setResumeFileData] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Trigger Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasswordInput('');
      showToast('Authenticated successfully as Admin!');
    } else {
      setAuthError(true);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Image File Upload Handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Project
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'fullstack',
      description: '',
      longDescription: '',
      tagsInput: 'React, Node.js, Tailwind CSS',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/SyedMohammed2005/',
      image: '',
      featured: true,
    });
    setIsProjectFormOpen(true);
  };

  // Open Edit Project
  const handleOpenEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      description: p.description,
      longDescription: p.longDescription || '',
      tagsInput: p.tags.join(', '),
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      image: p.image,
      featured: p.featured,
    });
    setIsProjectFormOpen(true);
  };

  // Save Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      alert('Please fill out the title and description.');
      return;
    }

    const tagsArray = projectForm.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectData = {
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      longDescription: projectForm.longDescription || projectForm.description,
      tags: tagsArray.length > 0 ? tagsArray : ['React', 'JavaScript'],
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
      image: projectForm.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000',
      featured: projectForm.featured,
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectData);
      showToast('Project updated successfully!');
    } else {
      addProject(projectData);
      showToast('New project created and published!');
    }

    setIsProjectFormOpen(false);
  };

  // Save Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) {
      alert('Skill name is required.');
      return;
    }

    addSkill({
      name: skillForm.name,
      category: skillForm.category,
      level: Number(skillForm.level),
      iconName: skillForm.iconName || 'Code',
    });

    setSkillForm({
      name: '',
      category: 'frontend',
      level: 85,
      iconName: 'Code',
    });

    showToast(`Skill "${skillForm.name}" added successfully!`);
  };

  // Resume File Selected
  const handleResumeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a valid PDF file.');
        return;
      }
      setIsUploadingResume(true);
      setResumeFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setResumeFileData(base64Data);
        updateResume(base64Data, file.name);
        setIsUploadingResume(false);
        showToast('Resume PDF updated and saved successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
              : 'bg-[#09090e] border-slate-800 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          }`}
          id="settings-modal"
        >
          {/* Header Bar */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base tracking-tight flex items-center gap-2">
                  <span>Portfolio Settings & Admin Portal</span>
                  {isAuthenticated && (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                      Authenticated
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  Password protected management console
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Lock Admin Session"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              )}

              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-900'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
                id="close-settings-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification Banner */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-cyan-500 text-black px-4 py-2 font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto scrollbar-thin flex-1">
            
            {/* UNAUTHENTICATED PASSWORD SCREEN */}
            {!isAuthenticated ? (
              <div className="max-w-md mx-auto py-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.2)]">
                  <Unlock className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-display font-bold">
                    Admin Password Required
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enter your developer passkey to unlock project editing, skill management, and custom resume uploads.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError(false);
                      }}
                      placeholder="password to access"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none transition-all pr-10 ${
                        authError
                          ? 'border-red-500 bg-red-500/10 text-red-200'
                          : isLight
                          ? 'bg-slate-100 border-slate-300 text-slate-900 focus:border-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-white focus:border-cyan-400'
                      }`}
                      id="admin-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {authError && (
                    <div className="flex items-center gap-1.5 text-red-400 text-xs font-mono justify-center">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Incorrect passkey. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 cursor-pointer"
                    id="admin-login-submit"
                  >
                    Authenticate Console
                  </button>
                </form>
              </div>
            ) : (
              /* AUTHENTICATED PANEL CONTENT */
              <div className="space-y-6">
                
                {/* Navigation Tabs */}
                <div className={`flex border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`px-5 py-3 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'projects'
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>Projects ({projects.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`px-5 py-3 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'skills'
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Skills ({skills.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('resume')}
                    className={`px-5 py-3 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'resume'
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Resume</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('homeImage')}
                    className={`px-5 py-3 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'homeImage'
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Home Image</span>
                  </button>
                </div>

                {/* TAB 1: PROJECTS MANAGEMENT */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    
                    {/* Header Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="font-display font-bold text-lg">Manage Projects</h4>
                        <p className="text-xs text-slate-400">Add, edit, or remove portfolio showcase projects</p>
                      </div>

                      {!isProjectFormOpen && (
                        <button
                          onClick={handleOpenAddProject}
                          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Project</span>
                        </button>
                      )}
                    </div>

                    {/* PROJECT ADD / EDIT INLINE FORM */}
                    {isProjectFormOpen ? (
                      <form onSubmit={handleSaveProject} className={`p-5 rounded-xl border space-y-4 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                      }`}>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-800/40">
                          <h5 className="font-display font-bold text-sm text-cyan-400">
                            {editingProjectId ? 'Edit Project' : 'Create New Project'}
                          </h5>
                          <button
                            type="button"
                            onClick={() => setIsProjectFormOpen(false)}
                            className="text-xs font-mono text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Project Title *</label>
                            <input
                              type="text"
                              value={projectForm.title}
                              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                              placeholder="e.g. Pharmix AI Store"
                              required
                              className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                            <select
                              value={projectForm.category}
                              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as Project['category'] })}
                              className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                              }`}
                            >
                              <option value="fullstack">Fullstack</option>
                              <option value="ai">AI / Machine Learning</option>
                              <option value="frontend">Frontend</option>
                              <option value="backend">Backend</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Short Summary *</label>
                          <textarea
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            placeholder="Brief 1-2 sentence project overview..."
                            rows={2}
                            required
                            className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Detailed Technical Overview</label>
                          <textarea
                            value={projectForm.longDescription}
                            onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                            placeholder="Full architecture and feature breakdown..."
                            rows={3}
                            className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Technologies (Comma separated)</label>
                            <input
                              type="text"
                              value={projectForm.tagsInput}
                              onChange={(e) => setProjectForm({ ...projectForm, tagsInput: e.target.value })}
                              placeholder="React, Node.js, MongoDB, Gemini AI"
                              className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo Link</label>
                            <input
                              type="text"
                              value={projectForm.liveUrl}
                              onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                              placeholder="https://my-app.vercel.app"
                              className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Link</label>
                            <input
                              type="text"
                              value={projectForm.githubUrl}
                              onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                              placeholder="https://github.com/SyedMohammed2005/my-repo"
                              className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Project Image (URL or Upload)</label>
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={projectForm.image}
                                onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                                placeholder="Image URL or upload below..."
                                className={`flex-1 px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                                }`}
                              />
                              <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer text-xs font-mono flex items-center gap-1">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Browse</span>
                                <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="featured-checkbox"
                            checked={projectForm.featured}
                            onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-400"
                          />
                          <label htmlFor="featured-checkbox" className="text-xs font-mono text-slate-300 cursor-pointer">
                            Mark as Featured Project (shows at top of list)
                          </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800/40">
                          <button
                            type="button"
                            onClick={() => setIsProjectFormOpen(false)}
                            className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-display text-xs font-bold uppercase tracking-wider"
                          >
                            Save Project
                          </button>
                        </div>
                      </form>
                    ) : null}

                    {/* PROJECT LIST TABLE */}
                    <div className="space-y-3">
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 hover:border-cyan-500/40'
                              : 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-16 h-12 rounded-lg object-cover border border-slate-800"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-display font-bold text-sm">{p.title}</h5>
                                <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                  {p.category}
                                </span>
                                {p.featured && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase rounded bg-amber-500/20 text-amber-400">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{p.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => handleOpenEditProject(p)}
                              className="p-2 rounded-lg bg-slate-800/60 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                  deleteProject(p.id);
                                  showToast('Project removed.');
                                }
                              }}
                              className="p-2 rounded-lg bg-slate-800/60 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* TAB 2: SKILLS MANAGEMENT */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-lg">Manage Skills</h4>
                      <p className="text-xs text-slate-400">Add or remove technical skills showcased in the skills section</p>
                    </div>

                    {/* ADD SKILL FORM */}
                    <form onSubmit={handleAddSkill} className={`p-4 rounded-xl border space-y-4 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <h5 className="font-display font-bold text-xs text-cyan-400 uppercase tracking-wider">
                        Add New Technical Skill
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Skill Name *</label>
                          <input
                            type="text"
                            value={skillForm.name}
                            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                            placeholder="e.g. Next.js, Python, PostgreSQL"
                            required
                            className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                          <select
                            value={skillForm.category}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as Skill['category'] })}
                            className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="tools">Tools / Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Proficiency Level ({skillForm.level}%)</label>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={skillForm.level}
                            onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-display text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Skill</span>
                        </button>
                      </div>
                    </form>

                    {/* SKILL LIST BADGES */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {skills.map((s) => (
                        <div
                          key={s.name}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
                          }`}
                        >
                          <div>
                            <span className="font-display font-bold text-xs block">{s.name}</span>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase">{s.category} • {s.level}%</span>
                          </div>
                          <button
                            onClick={() => {
                              deleteSkill(s.name);
                              showToast(`Skill ${s.name} removed.`);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                            title="Delete skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* TAB 3: RESUME UPDATE */}
                {activeTab === 'resume' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-lg">Update Resume Document</h4>
                      <p className="text-xs text-slate-400">Upload a custom PDF resume to serve directly across the portfolio site</p>
                    </div>

                    <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <FileText className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h5 className="font-display font-bold text-sm">Upload New Resume PDF</h5>
                        <p className="text-xs text-slate-400">
                          Select a PDF file from your local machine. It will automatically update the "View Resume" viewer.
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <label className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-cyan-500/20">
                          <Upload className="w-4 h-4" />
                          <span>{isUploadingResume ? 'Uploading PDF...' : 'Choose PDF File'}</span>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeFileSelect}
                            disabled={isUploadingResume}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Current Status */}
                      {customResume ? (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between max-w-md mx-auto">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span>Active Resume: {customResume.name}</span>
                          </div>
                          <span className="text-[10px] text-emerald-300/80">Updated {customResume.updatedAt}</span>
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-slate-500 italic">
                          Currently using built-in interactive Syed Mohammed Pasha Quadri CV template.
                        </p>
                      )}
                    </div>

                    {/* Reset Button */}
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                      <span>Need to restore factory default data?</span>
                      <button
                        onClick={() => {
                          if (confirm('Reset all projects, skills, and resume data back to defaults?')) {
                            resetAllData();
                            showToast('All portfolio data reset to original defaults.');
                          }
                        }}
                        className="text-red-400 hover:text-red-300 font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset All Data</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* TAB 4: HOME IMAGE MANAGEMENT */}
                {activeTab === 'homeImage' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-display font-bold text-lg">Change Home Page Image</h4>
                        <p className="text-xs text-slate-400">Upload a new photo or provide an image URL for the main Hero section</p>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl border space-y-6 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      
                      {/* Image Preview */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800/40">
                        <div className="w-32 h-40 rounded-xl overflow-hidden border-2 border-cyan-500/40 flex-shrink-0 bg-slate-900 shadow-md">
                          <img
                            src={heroImage || developerPortrait}
                            alt="Current Home Hero Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2 text-center sm:text-left">
                          <h5 className="font-display font-bold text-sm">Active Hero Image</h5>
                          <p className="text-xs text-slate-400 max-w-sm">
                            {heroImage ? 'Using custom uploaded portrait image.' : 'Using default MERN developer generated portrait image.'}
                          </p>
                          {heroImage && (
                            <button
                              type="button"
                              onClick={() => {
                                updateHeroImage(null);
                                showToast('Reset home image to default portrait!');
                              }}
                              className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono transition-all cursor-pointer"
                            >
                              Reset to Default Image
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Option 1: File Upload */}
                      <div className="space-y-3">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                          Option 1: Upload Image File from Computer
                        </label>
                        <label className="inline-flex px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display text-xs font-bold uppercase tracking-wider items-center gap-2 cursor-pointer transition-all shadow-md">
                          <Upload className="w-4 h-4" />
                          <span>Choose New Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 8 * 1024 * 1024) {
                                  alert('Image size should be less than 8MB');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const result = reader.result as string;
                                  updateHeroImage(result);
                                  showToast('Home page image updated successfully!');
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Option 2: Image URL Input */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/40">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                          Option 2: Paste Direct Image URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            placeholder="https://example.com/my-portrait.jpg"
                            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (imageUrlInput.trim()) {
                                updateHeroImage(imageUrlInput.trim());
                                showToast('Home page image updated from URL!');
                                setImageUrlInput('');
                              }
                            }}
                            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Apply URL
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
