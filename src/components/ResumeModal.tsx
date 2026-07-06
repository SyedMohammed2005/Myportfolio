import { X, Printer, Mail, Phone, MapPin, Linkedin, Github, Globe, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-[#09090e] border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-8"
            id="resume-modal"
          >
            {/* Top Action Header Bar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-900 bg-slate-950/40 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume_Viewer_Active.exe</span>
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  title="Print or save as PDF"
                  id="print-resume-btn"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                  id="close-resume-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable & Interactive Scrollable Area */}
            <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent print-container">
              {/* Clean layout mimicking the actual PDF, with subtle responsive spacing and crisp contrast */}
              <div className="bg-[#050508] border border-slate-900 rounded-xl p-6 md:p-10 max-w-3xl mx-auto space-y-8 text-left text-slate-300 font-sans print:border-none print:p-0 print:bg-white print:text-black shadow-inner relative">
                
                {/* Tech Scanlines - subtle decorative element */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,210,255,0.005)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none rounded-xl print:hidden" />
                
                {/* Header Information */}
                <div className="text-center space-y-3 pb-6 border-b border-slate-900 print:border-slate-200">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight print:text-black uppercase">
                    Syed Mohammed Pasha Quadri
                  </h1>
                  
                  {/* Contact Chips */}
                  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-mono print:text-slate-600">
                    <a href="tel:+916303321580" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <Phone className="w-3 h-3 text-cyan-500 print:text-slate-600" />
                      <span>+91 6303321580</span>
                    </a>
                    <span className="hidden sm:inline text-slate-800 print:text-slate-300">•</span>
                    <a href="mailto:syedmdpashaquadri2005@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <Mail className="w-3 h-3 text-cyan-500 print:text-slate-600" />
                      <span>syedmdpashaquadri2005@gmail.com</span>
                    </a>
                    <span className="hidden sm:inline text-slate-800 print:text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-500 print:text-slate-600" />
                      <span>Hyderabad, India</span>
                    </span>
                  </div>

                  {/* Social Profile Links */}
                  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-mono text-cyan-400 print:text-slate-700 pt-1">
                    <a
                      href="https://linkedin.com/in/syed-mohammed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-2 decoration-cyan-500/30"
                    >
                      <Linkedin className="w-3 h-3 text-cyan-400 print:text-slate-600" />
                      <span>linkedin.com/in/syed-mohammed</span>
                    </a>
                    <span className="hidden sm:inline text-slate-800 print:text-slate-300">•</span>
                    <a
                      href="https://github.com/SyedMohammed2005"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-2 decoration-cyan-500/30"
                    >
                      <Github className="w-3 h-3 text-cyan-400 print:text-slate-600" />
                      <span>github.com/SyedMohammed2005</span>
                    </a>
                    <span className="hidden sm:inline text-slate-800 print:text-slate-300">•</span>
                    <a
                      href="https://my-portfolio-plum-two-96.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-2 decoration-cyan-500/30"
                    >
                      <Globe className="w-3 h-3 text-cyan-400 print:text-slate-600" />
                      <span>my-portfolio-plum-two-96.vercel.app</span>
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-3">
                  <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-l-2 border-cyan-500 pl-3 print:text-black print:border-black print:text-base">
                    Professional Summary
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 print:text-slate-700 leading-relaxed font-sans text-justify">
                    Highly motivated and technically proficient Computer Science & Engineering student specializing in full-stack
                    MERN development and Artificial Intelligence integration. Experienced in architecting production-ready web
                    applications, integrating LLM workflows via the Gemini API, and implementing machine learning solutions for
                    predictive analysis. Combines exceptional academic standing (92.2% average with A1 Distinction) with hands-on
                    technical execution to engineer clean, efficient, and scalable user-centric software.
                  </p>
                </div>

                {/* Education Section */}
                <div className="space-y-3">
                  <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-l-2 border-cyan-500 pl-3 print:text-black print:border-black print:text-base">
                    Education
                  </h2>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start text-xs sm:text-sm">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                          Shadan College of Engineering and Technology
                        </h3>
                        <p className="text-xs text-slate-400 print:text-slate-600 italic">
                          Bachelor of Technology (B.Tech) in Computer Science and Engineering • Hyderabad, India
                        </p>
                      </div>
                      <span className="text-xs font-mono text-cyan-400/80 print:text-slate-700 font-semibold sm:text-right mt-1 sm:mt-0">
                        2023 – May 2027 (Expected)
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-400 print:text-slate-700 space-y-1">
                      <li>
                        <strong>Academic Performance:</strong> Current Cumulative Average of <strong className="text-white print:text-black font-semibold">92.2%</strong> (Graduating with A1 Distinction).
                      </li>
                      <li>
                        <strong>Status:</strong> Clear track record with <strong className="text-white print:text-black font-semibold">zero backlogs</strong> across all academic semesters.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Technical Skills Section */}
                <div className="space-y-3">
                  <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-l-2 border-cyan-500 pl-3 print:text-black print:border-black print:text-base">
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-cyan-400/90 print:text-black font-bold uppercase tracking-wider block">Frontend Architecture:</span>
                      <span className="text-slate-400 print:text-slate-700">HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Responsive UI Design</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-cyan-400/90 print:text-black font-bold uppercase tracking-wider block">Backend & Cloud:</span>
                      <span className="text-slate-400 print:text-slate-700">Node.js, Express.js, RESTful APIs, Server Architecture, Vercel Deployment</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-cyan-400/90 print:text-black font-bold uppercase tracking-wider block">Databases:</span>
                      <span className="text-slate-400 print:text-slate-700">MongoDB, Neon DB (Serverless PostgreSQL), Database Optimization</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-cyan-400/90 print:text-black font-bold uppercase tracking-wider block">AI & Machine Learning:</span>
                      <span className="text-slate-400 print:text-slate-700">Generative AI Integration, Gemini API Prompt Engineering, ML-Driven Demand Forecasting, Data Analysis</span>
                    </div>
                    <div className="space-y-2 md:col-span-2 border-t border-slate-900/40 print:border-slate-100 pt-2">
                      <span className="font-mono text-cyan-400/90 print:text-black font-bold uppercase tracking-wider block">Developer Tools:</span>
                      <span className="text-slate-400 print:text-slate-700">Git, GitHub, VS Code, Postman, JWT Authentication, Clerk Auth</span>
                    </div>
                  </div>
                </div>

                {/* Technical Projects Section */}
                <div className="space-y-4">
                  <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-l-2 border-cyan-500 pl-3 print:text-black print:border-black print:text-base">
                    Technical Projects
                  </h2>

                  {/* Project 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                          Pharmix: AI Pharmacy Management System
                        </h3>
                        <p className="text-xs text-slate-400 print:text-slate-600 italic">
                          Full-Stack Developer & ML Specialist
                        </p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400/90 print:text-slate-700 font-semibold uppercase tracking-wider">
                        Ongoing
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-400 print:text-slate-700 space-y-1 text-justify">
                      <li>Engineering an intelligent pharmacy management platform that utilizes machine learning algorithms to optimize medical inventory and logistics.</li>
                      <li>Implementing ML-driven demand and supply forecasting models to accurately analyze pharmaceutical sales patterns and minimize overstock or stockouts.</li>
                      <li>Designing secure database architectures using Neon DB and MongoDB to handle real-time sales reporting and inventory analysis pipelines.</li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                          Sensai: AI Career Coach
                        </h3>
                        <p className="text-xs text-slate-400 print:text-slate-600 italic">
                          Full-Stack Engineer & AI Developer
                        </p>
                      </div>
                      <span className="text-xs font-mono text-cyan-400/90 print:text-slate-700 font-semibold uppercase tracking-wider">
                        Completed
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-400 print:text-slate-700 space-y-1 text-justify">
                      <li>Built a comprehensive career accelerator platform incorporating Next.js, React.js, and Clerk for authentication.</li>
                      <li>Integrated the Gemini API to develop AI engines for automated, personalized learning roadmap generation and dynamic industry insights.</li>
                      <li>Programmed backend systems powering interactive features including an AI Resume Builder, automated Cover Letter Generator, and real-time mock interview performance simulator.</li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                          Spotify Clone
                        </h3>
                        <p className="text-xs text-slate-400 print:text-slate-600 italic">
                          Frontend Developer
                        </p>
                      </div>
                      <span className="text-xs font-mono text-cyan-400/90 print:text-slate-700 font-semibold uppercase tracking-wider">
                        Completed
                      </span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-slate-400 print:text-slate-700 space-y-1 text-justify">
                      <li>Developed a highly responsive and pixel-perfect clone of the Spotify web interface leveraging semantic HTML5 and modern CSS techniques.</li>
                      <li>Utilized core JavaScript functions to govern client-side state management, customized audio play/pause modules, and dynamic playlist track loading.</li>
                      <li>Optimized web assets for rapid rendering and successfully deployed the web application architecture onto Vercel.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Custom Print Styles to inject only during print */}
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
                /* Hide everything in the modal frame header */
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
