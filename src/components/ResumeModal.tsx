import { useState, useEffect } from 'react';
import { X, Printer, FileText, Download, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { customResume, theme } = usePortfolio();
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'custom' | 'default'>('custom');

  // Convert Base64 dataUrl to Blob URL when customResume changes
  useEffect(() => {
    if (customResume?.dataUrl) {
      if (customResume.dataUrl.startsWith('data:')) {
        try {
          const parts = customResume.dataUrl.split(',');
          const mimeMatch = parts[0].match(/:(.*?);/);
          const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
          const bstr = atob(parts[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const url = URL.createObjectURL(blob);
          setPdfBlobUrl(url);
          return () => {
            URL.revokeObjectURL(url);
          };
        } catch (e) {
          console.error('Error creating blob URL:', e);
          setPdfBlobUrl(customResume.dataUrl);
        }
      } else {
        setPdfBlobUrl(customResume.dataUrl);
      }
    } else {
      setPdfBlobUrl(null);
    }
  }, [customResume]);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  const isLight = theme === 'light';
  const showCustomResume = customResume && viewMode === 'custom';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
          id="resume-modal-backdrop"
        >
          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative w-full max-w-4xl border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-auto max-h-[92vh] ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#09090e] border-slate-800 text-white'
            }`}
            id="resume-modal"
          >
            {/* Top Action Header Bar with Back Button */}
            <div className={`flex items-center justify-between p-3.5 sm:p-4 border-b relative z-10 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/60 border-slate-900'
            }`}>
              <div className="flex items-center gap-3">
                {/* Back Button */}
                <button
                  onClick={onClose}
                  className={`px-3 py-1.5 rounded-lg border font-display text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-800 hover:bg-black hover:text-white hover:border-black shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-400'
                  }`}
                  id="resume-back-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {/* View switcher if custom resume exists */}
                {customResume && (
                  <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
                    <button
                      onClick={() => setViewMode('custom')}
                      className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] transition-all cursor-pointer ${
                        viewMode === 'custom'
                          ? 'bg-cyan-500 text-black shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Uploaded PDF
                    </button>
                    <button
                      onClick={() => setViewMode('default')}
                      className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] transition-all cursor-pointer ${
                        viewMode === 'default'
                          ? 'bg-cyan-500 text-black shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Structured CV
                    </button>
                  </div>
                )}

                {!customResume && (
                  <div className="hidden sm:flex items-center gap-2 border-l border-slate-300/40 pl-3 dark:border-slate-800">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Syed_Mohammed_Pasha_Quadri_CV.pdf</span>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                {customResume ? (
                  <a
                    href={pdfBlobUrl || customResume.dataUrl}
                    download={customResume.name}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                    title="Print or save as PDF"
                    id="print-resume-btn"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Print / Save PDF</span>
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isLight ? 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-black hover:text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  id="close-resume-modal"
                  title="Close Resume"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Custom Resume PDF viewer IF custom resume uploaded AND custom mode selected */}
            {showCustomResume ? (
              <div className="p-8 sm:p-12 flex-1 flex flex-col items-center justify-center bg-slate-950 text-center space-y-6 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                  <FileText className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-md">
                  <h3 className="text-xl font-display font-bold text-white tracking-wide">
                    Custom PDF Resume Uploaded
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 truncate max-w-xs mx-auto bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                    {customResume.name}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed pt-2">
                    Click the button below to view and open your PDF resume in a new browser window.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-sm">
                  <a
                    href={pdfBlobUrl || customResume.dataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_-5px_rgba(0,210,255,0.4)] cursor-pointer"
                    id="open-pdf-new-window-btn"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open PDF in New Window</span>
                  </a>

                  <a
                    href={pdfBlobUrl || customResume.dataUrl}
                    download={customResume.name}
                    className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-800 transition-all cursor-pointer"
                    id="download-pdf-modal-btn"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Printable & Interactive Scrollable Area */
              <div className="p-4 sm:p-6 md:p-8 max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent print-container">
                {/* Official Resume Sheet styling matching exact uploaded document */}
                <div className={`border rounded-xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto space-y-6 text-left font-sans print:border-none print:p-0 print:bg-white print:text-black shadow-lg relative ${
                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#08080c] border-slate-800 text-slate-200'
                }`}>
                  
                  {/* Title Header */}
                  <div className="text-center space-y-2 pb-4 border-b border-slate-300 dark:border-slate-800">
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                      SYED MOHAMMED PASHA QUADRI
                    </h1>
                    
                    {/* Phone & Email & Location */}
                    <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <a href="tel:+916303321580" className="hover:text-blue-600 dark:hover:text-cyan-400">
                        +91 6303321580
                      </a>
                      <span>|</span>
                      <a href="mailto:syedmdpashaquadri2005@gmail.com" className="hover:text-blue-600 dark:hover:text-cyan-400 font-medium">
                        syedmdpashaquadri2005@gmail.com
                      </a>
                      <span>|</span>
                      <span>Hyderabad, India</span>
                    </div>

                    {/* Social Profile Links */}
                    <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs text-blue-700 dark:text-cyan-400 font-sans pt-0.5">
                      <a
                        href="https://www.linkedin.com/in/syed-mohammed-pasha-quadri-0a56202b4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        LinkedIn: linkedin.com/in/syed-mohammed
                      </a>
                      <span>|</span>
                      <a
                        href="https://github.com/SyedMohammed2005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        GitHub: github.com/SyedMohammed2005
                      </a>
                      <span>|</span>
                      <a
                        href="https://myportfolio-kappa-smoky.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Portfolio: myportfolio-kappa-smoky.vercel.app
                      </a>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-cyan-400 uppercase tracking-wider border-b border-slate-300 dark:border-slate-800 pb-1">
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-300 text-justify">
                      Motivated Computer Science & Engineering student specializing in full-stack MERN development, backend server architecture, and software quality assurance. Experienced in building scalable web applications, designing RESTful APIs, deploying cloud integrations, and executing systematic manual testing. Sustains a 92.2% cumulative academic average (A1 Distinction) with zero backlogs.
                    </p>
                  </div>

                  {/* Education Section */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-cyan-400 uppercase tracking-wider border-b border-slate-300 dark:border-slate-800 pb-1">
                      EDUCATION
                    </h2>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                        <div>Shadan College of Engineering and Technology</div>
                        <div className="font-mono text-xs text-slate-700 dark:text-slate-400 font-normal">2023 – May 2027 (Expected)</div>
                      </div>
                      <div className="text-xs italic text-slate-700 dark:text-slate-300">
                        Bachelor of Technology (B.Tech) in Computer Science and Engineering • Hyderabad, India
                      </div>
                      <ul className="list-disc pl-5 text-xs text-slate-800 dark:text-slate-300 space-y-0.5 pt-0.5">
                        <li>
                          <strong>Academic Performance:</strong> Current Cumulative Average of 92.2% (Graduating with A1 Distinction, Zero Backlogs).
                        </li>
                        <li>
                          <strong>Core Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems, Computer Networks.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Technical Skills Section */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-cyan-400 uppercase tracking-wider border-b border-slate-300 dark:border-slate-800 pb-1">
                      TECHNICAL SKILLS
                    </h2>
                    <ul className="list-disc pl-5 text-xs text-slate-800 dark:text-slate-300 space-y-1">
                      <li>
                        <strong>Languages & Core:</strong> JavaScript (ES6+), HTML5, CSS3, SQL, Data Structures & Algorithms
                      </li>
                      <li>
                        <strong>Frontend Architecture:</strong> React.js, Next.js, Responsive UI Design, State Management
                      </li>
                      <li>
                        <strong>Backend & Cloud:</strong> Node.js, Express.js, RESTful APIs, Server Architecture, Vercel Deployment
                      </li>
                      <li>
                        <strong>Databases:</strong> MongoDB, Neon DB (Serverless PostgreSQL), Database Optimization
                      </li>
                      <li>
                        <strong>Quality Assurance:</strong> Manual Testing, Test Case Execution, Bug Tracking, Functional Testing, Defect Lifecycle Management
                      </li>
                      <li>
                        <strong>Developer Tools & Auth:</strong> Git, GitHub, VS Code, Postman, JWT Authentication, Clerk Auth
                      </li>
                    </ul>
                  </div>

                  {/* Technical Projects Section */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-cyan-400 uppercase tracking-wider border-b border-slate-300 dark:border-slate-800 pb-1">
                      TECHNICAL PROJECTS
                    </h2>

                    {/* Project 1: Pharmix */}
                    <div className="space-y-1 text-xs text-slate-800 dark:text-slate-300">
                      <div className="font-bold text-slate-900 dark:text-white">
                        Pharmix – AI Pharmacy Management System <span className="font-normal text-blue-700 dark:text-cyan-400">[Next.js, Node.js, Neon DB, MongoDB, Gemini API]</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>
                          <strong>What it Solves:</strong> Eliminates stockouts, overstocking, and inventory tracking errors in pharmacy supply chains.
                        </li>
                        <li>Engineered automated sales and supply forecasting agents to accurately analyze pharmaceutical sales patterns.</li>
                        <li>Designed secure database architectures using Neon DB and MongoDB to handle real-time sales reporting and inventory tracking pipelines.</li>
                      </ul>
                    </div>

                    {/* Project 2: Sensai */}
                    <div className="space-y-1 text-xs text-slate-800 dark:text-slate-300">
                      <div className="font-bold text-slate-900 dark:text-white">
                        Sensai – AI Career Coach <span className="font-normal text-blue-700 dark:text-cyan-400">[Next.js, React.js, Clerk Auth, Gemini API]</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>
                          <strong>What it Solves:</strong> Bridges career preparation gaps for job seekers through automated learning roadmaps and interview simulations.
                        </li>
                        <li>Integrated Gemini API engines to power personalized learning roadmaps, dynamic industry insights, and cover letter generation.</li>
                        <li>Programmed backend systems powering interactive tools including an AI Resume Builder and real-time mock interview simulator using Clerk Auth.</li>
                      </ul>
                    </div>

                    {/* Project 3: Spotify Clone */}
                    <div className="space-y-1 text-xs text-slate-800 dark:text-slate-300">
                      <div className="font-bold text-slate-900 dark:text-white">
                        Spotify Clone <span className="font-normal text-blue-700 dark:text-cyan-400">[HTML5, CSS3, JavaScript, Vercel]</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>
                          <strong>What it Solves:</strong> Delivers a fast, responsive, web-accessible music streaming layout without external framework dependencies.
                        </li>
                        <li>Developed responsive interface leveraging semantic HTML5/CSS3; used JS for audio player controls and dynamic playlist loading.</li>
                        <li>Optimized web assets for rapid rendering and successfully deployed the web application architecture onto Vercel.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Certifications & Achievements */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-cyan-400 uppercase tracking-wider border-b border-slate-300 dark:border-slate-800 pb-1">
                      CERTIFICATIONS & ACHIEVEMENTS
                    </h2>
                    <ul className="list-disc pl-5 text-xs text-slate-800 dark:text-slate-300 space-y-1">
                      <li>
                        <strong>Node.js, Express & MongoDB Certification:</strong> Knowledge Gate • <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-cyan-400 underline">Credential Link (ID: 5ED548BF)</a> – Certified in server-side architecture, REST API design, and MongoDB management.
                      </li>
                      <li>
                        <strong>Full-Stack Web Development:</strong> Completed comprehensive hands-on training focused on modern MERN stack development and Next.js production deployments.
                      </li>
                      <li>
                        <strong>Academic Distinction (A1):</strong> Achieved and sustained a 92.2% cumulative grade point average with zero backlogs across all semesters.
                      </li>
                    </ul>
                  </div>

                  {/* Extracurricular & Leadership */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-cyan-400 uppercase tracking-wider border-b border-slate-300 dark:border-slate-800 pb-1">
                      EXTRACURRICULAR & LEADERSHIP ACTIVITIES
                    </h2>
                    <ul className="list-disc pl-5 text-xs text-slate-800 dark:text-slate-300 space-y-1">
                      <li>
                        <strong>Technical Mentor:</strong> Assisted peers in troubleshooting full-stack code issues and version control during college lab sessions and hackathons.
                      </li>
                      <li>
                        <strong>Open Source Contributor:</strong> Actively publish functional software repositories and maintain open-source projects on GitHub.
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {/* Custom Print Styles */}
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                .print-container, .print-container * {
                  visibility: visible;
                }
                .print-container {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  max-height: none !important;
                  overflow: visible !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
                #resume-modal {
                  border: none !important;
                  box-shadow: none !important;
                  background: transparent !important;
                  margin: 0 !important;
                  max-width: none !important;
                }
              }
            `}</style>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


