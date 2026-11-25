import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, FileText, Download, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_RESUME_PDF_PATH = '/assets/aistudio/RESUME.syed_4ea71b31.pdf';

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

  // Listen for Escape key to close modal and lock background scroll
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
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  const isLight = theme === 'light';
  const showCustomResume = customResume && viewMode === 'custom';

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          data-scroll-prevent
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md"
          id="resume-modal-backdrop"
        >
          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative w-full max-w-4xl border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[92dvh] max-h-[92dvh] ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#09090e] border-slate-800 text-white'
            }`}
            id="resume-modal"
          >
            {/* Top Action Header Bar with Back Button */}
            <div className={`shrink-0 flex items-center justify-between gap-2 p-3 sm:p-4 border-b relative z-10 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/90 border-slate-800'
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                {/* Back Button */}
                <button
                  onClick={onClose}
                  className={`shrink-0 px-3 py-1.5 rounded-lg border font-display text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-800 hover:bg-black hover:text-white hover:border-black shadow-sm'
                      : 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-400'
                  }`}
                  id="resume-back-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {/* View switcher if custom resume exists */}
                {customResume && (
                  <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs ${
                    isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-slate-900 border-slate-800'
                  }`}>
                    <button
                      onClick={() => setViewMode('custom')}
                      className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] transition-all cursor-pointer ${
                        viewMode === 'custom'
                          ? 'bg-cyan-500 text-black shadow-sm'
                          : isLight
                          ? 'text-slate-700 hover:text-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Uploaded PDF
                    </button>
                    <button
                      onClick={() => setViewMode('default')}
                      className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] transition-all cursor-pointer ${
                        viewMode === 'default'
                          ? 'bg-cyan-500 text-black shadow-sm'
                          : isLight
                          ? 'text-slate-700 hover:text-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Structured CV
                    </button>
                  </div>
                )}

                {!customResume && (
                  <div className={`hidden sm:flex items-center gap-2 border-l pl-3 min-w-0 ${
                    isLight ? 'border-slate-300' : 'border-slate-800'
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                    <span className={`font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 truncate ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <FileText className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span className="truncate">Syed_Mohammed_Pasha_Quadri_CV.pdf</span>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {customResume ? (
                  <a
                    href={pdfBlobUrl || customResume.dataUrl}
                    download={customResume.name}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </a>
                ) : (
                  <>
                    <a
                      href={DEFAULT_RESUME_PDF_PATH}
                      download="Syed_Mohammed_Pasha_Quadri_Resume.pdf"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      id="download-default-pdf-btn"
                      title="Download PDF Resume"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download PDF</span>
                    </a>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      title="Print or save as PDF"
                      id="print-resume-btn"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                  </>
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
              <div
                data-scroll-prevent
                className="p-8 sm:p-12 flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-center justify-center bg-slate-950 text-center space-y-6"
              >
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
              <div
                data-scroll-prevent
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8 print-container"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Official Resume Sheet styling: crisp white paper with solid black headings & text */}
                <div className="bg-white border border-slate-300 text-black rounded-xl p-5 sm:p-8 md:p-10 max-w-3xl mx-auto space-y-5 text-left font-sans print:border-none print:p-0 print:bg-white print:text-black shadow-lg relative">
                  
                  {/* Title Header */}
                  <div className="text-center space-y-1.5 pb-4 border-b border-slate-400">
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-black uppercase">
                      SYED MOHAMMED PASHA QUADRI
                    </h1>
                    
                    {/* Location & Phone & Email */}
                    <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs text-black font-sans">
                      <span>Hyderabad, India</span>
                      <span>|</span>
                      <a href="tel:+916303321580" className="hover:text-blue-700 hover:underline">
                        +91 6303321580
                      </a>
                      <span>|</span>
                      <a href="mailto:syedmdpashaquadri2005@gmail.com" className="hover:text-blue-700 hover:underline font-medium">
                        syedmdpashaquadri2005@gmail.com
                      </a>
                    </div>

                    {/* Social Profile Links */}
                    <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs text-black font-sans pt-0.5">
                      <a
                        href="https://www.linkedin.com/in/syed-mohammed-pasha-quadri-264530397/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        LinkedIn: linkedin.com/in/syed-mohammed-pasha-quadri-264530397
                      </a>
                      <span>|</span>
                      <a
                        href="https://github.com/SyedMohammed2005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        GitHub: github.com/SyedMohammed2005
                      </a>
                      <span>|</span>
                      <a
                        href="https://myportfolio-kappa-smoky.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        Portfolio: myportfolio-kappa-smoky.vercel.app
                      </a>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-500 pb-1">
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-black text-justify">
                      Computer Science &amp; Engineering undergraduate (92.2% cumulative average, A1 Distinction) specializing in full-stack MERN development, RESTful API design, and AI-integrated web applications. Experienced in building scalable backend architectures, relational and NoSQL database pipelines, and automated CI/CD workflows, alongside systematic manual quality assurance testing.
                    </p>
                  </div>

                  {/* Education Section */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-500 pb-1">
                      EDUCATION
                    </h2>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start text-xs sm:text-[13px] font-bold text-black">
                        <div>Shadan College of Engineering and Technology</div>
                        <div className="text-xs text-black font-bold">Hyderabad, India</div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start text-xs text-black">
                        <div className="font-semibold">Bachelor of Technology (B.Tech) in Computer Science and Engineering</div>
                        <div className="font-semibold">2023 – May 2027 (Expected)</div>
                      </div>
                      <ul className="list-disc pl-5 text-xs text-black space-y-0.5 pt-0.5">
                        <li>
                          <strong>Academic Standing:</strong> 92.2% Cumulative Average (A1 Distinction, Zero Backlogs).
                        </li>
                        <li>
                          <strong>Relevant Coursework:</strong> Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems, Computer Networks.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Technical Skills Section */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-500 pb-1">
                      TECHNICAL SKILLS
                    </h2>
                    <ul className="list-disc pl-5 text-xs text-black space-y-1">
                      <li>
                        <strong>Languages &amp; Core:</strong> JavaScript (ES6+), Java, SQL, HTML5, CSS3, Data Structures &amp; Algorithms
                      </li>
                      <li>
                        <strong>Frontend Development:</strong> React.js, Next.js, Responsive UI Design, State Management
                      </li>
                      <li>
                        <strong>Backend &amp; Cloud:</strong> Node.js, Express.js, RESTful APIs, Server Architecture, Vercel
                      </li>
                      <li>
                        <strong>Databases:</strong> MongoDB, Neon DB (Serverless PostgreSQL), Database Schema Design &amp; Optimization
                      </li>
                      <li>
                        <strong>Quality Assurance:</strong> Manual Testing, Test Case Execution, Functional Testing, Bug Tracking, Defect Lifecycle Management
                      </li>
                      <li>
                        <strong>Developer Tools &amp; Auth:</strong> Git, GitHub, GitHub Actions, Postman, VS Code, JWT Authentication, Clerk Auth
                      </li>
                    </ul>
                  </div>

                  {/* Technical Projects Section */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-500 pb-1">
                      TECHNICAL PROJECTS
                    </h2>

                    {/* Project 1: CodeJ */}
                    <div className="space-y-1 text-xs text-black">
                      <div className="flex flex-col sm:flex-row justify-between items-start font-bold text-black">
                        <div>CodeJ – AI Java Compiler &amp; Visualizer</div>
                        <div className="font-semibold text-black">Recent</div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start text-xs italic text-black">
                        <div>Full-Stack &amp; AI Developer Tool</div>
                        <div>Java, Next.js, Node.js, Gemini API, GitHub Actions</div>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Architected an interactive web-based compiler and runtime execution environment for Java applications.</li>
                        <li>Integrated Gemini API to analyze source code, explain execution logic step-by-step, diagnose runtime errors, and visualize program data flow.</li>
                        <li>Configured automated build validation, code linting, and continuous repository synchronization via GitHub Actions.</li>
                      </ul>
                    </div>

                    {/* Project 2: Pharmix */}
                    <div className="space-y-1 text-xs text-black">
                      <div className="flex flex-col sm:flex-row justify-between items-start font-bold text-black">
                        <div>Pharmix – AI Pharmacy Management System</div>
                        <div className="font-semibold text-black">Ongoing</div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start text-xs italic text-black">
                        <div>Healthcare Inventory &amp; Cloud Platform</div>
                        <div>Next.js, Node.js, Neon DB, Gemini API</div>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Engineered automated sales and supply forecasting agents using Gemini API to analyze pharmaceutical demand patterns and reduce stockouts and overstocking.</li>
                        <li>Designed a relational database architecture using Neon DB (PostgreSQL) to support real-time sales reporting and inventory tracking pipelines.</li>
                      </ul>
                    </div>

                    {/* Project 3: Sensai */}
                    <div className="space-y-1 text-xs text-black">
                      <div className="flex flex-col sm:flex-row justify-between items-start font-bold text-black">
                        <div>Sensai – AI Career Coach</div>
                        <div className="font-semibold text-black">Completed</div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start text-xs italic text-black">
                        <div>Full-Stack Career Preparation Platform</div>
                        <div>Next.js, React.js, Clerk Auth, Gemini API</div>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Integrated Gemini API workflows to generate personalized learning roadmaps, dynamic industry insights, and tailored cover letters.</li>
                        <li>Built secure multi-user backend services with Clerk Auth powering an AI Resume Builder and an interactive mock interview simulator.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Leadership & Open-Source Experience */}
                  <div className="space-y-2.5">
                    <h2 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-500 pb-1">
                      LEADERSHIP &amp; OPEN-SOURCE EXPERIENCE
                    </h2>

                    <div className="space-y-1 text-xs text-black">
                      <div className="flex flex-col sm:flex-row justify-between items-start font-bold text-black">
                        <div>Technical Mentor – Campus Tech Club</div>
                        <div className="font-semibold text-black">2023 – Present | Hyderabad, India</div>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Mentored peers in debugging full-stack JavaScript/Node.js applications, API integration, and Git version control during lab sessions and hackathons.</li>
                      </ul>
                    </div>

                    <div className="space-y-1 text-xs text-black">
                      <div className="flex flex-col sm:flex-row justify-between items-start font-bold text-black">
                        <div>Open-Source Contributor – GitHub</div>
                        <div className="font-semibold text-black">2023 – Present | Remote</div>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Published and maintained functional full-stack repositories, developer utilities, and reusable UI components on GitHub.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Certifications & Achievements */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-500 pb-1">
                      CERTIFICATIONS &amp; ACHIEVEMENTS
                    </h2>
                    <ul className="list-disc pl-5 text-xs text-black space-y-1">
                      <li>
                        <strong>Node.js, Express &amp; MongoDB Certification:</strong> Knowledge Gate (Credential ID: 5ED548BF) – Server-side architecture, REST API design, and MongoDB management.
                      </li>
                      <li>
                        <strong>Full-Stack Web Development:</strong> Hands-on training in modern MERN stack engineering and Next.js production deployments.
                      </li>
                      <li>
                        <strong>Academic Distinction (A1):</strong> Sustained a 92.2% cumulative academic average with zero backlogs across all semesters.
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
    </AnimatePresence>,
    document.body
  );
}
