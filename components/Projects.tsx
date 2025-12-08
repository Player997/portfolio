import React from 'react';
import { ExternalLink, Github, ArrowUpRight, Terminal } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Projects</h2>
            <p className="text-muted">A selection of my recent work.</p>
          </div>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            View Github <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div 
              key={index}
              className={`reveal reveal-delay-${(index % 3) * 100} group relative glass-panel rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] hover:-translate-y-2 border border-white/5 hover:border-primary/30 flex flex-col transition-all duration-500`}
            >
              {/* Image / Preview Area with Code Editor Look */}
              <div className="h-56 bg-dark/80 relative flex flex-col overflow-hidden border-b border-white/5">
                 {/* Window Controls */}
                 <div className="h-8 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                   <div className="ml-auto text-[10px] text-gray-500 font-mono">App.tsx</div>
                 </div>
                 
                 {/* Code Content */}
                 <div className="flex-1 p-4 font-mono text-xs text-gray-400 overflow-hidden relative group-hover:text-gray-300 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10"></div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-400">{project.title.split(' ')[0]}</span> = () ={'>'} {'{'}</div>
                    <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                    <div className="pl-8 text-green-400">'Transforming Ideas'</div>
                    <div className="pl-4">);</div>
                    <div>{'}'}</div>
                    
                    {/* Floating Tech Icons Abstract */}
                    <div className="absolute bottom-4 right-4 z-20 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      <Terminal size={48} className="text-primary" />
                    </div>
                 </div>

                 {/* Hover Overlay Buttons (Desktop) */}
                 <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-4 z-30">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="View Code"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="View Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                 </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                   <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/10 text-muted uppercase tracking-wider">
                      {project.category}
                   </span>
                </div>

                <div className="flex-1">
                   <ul className="space-y-1 mb-4">
                     {project.description.map((desc, i) => (
                       <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                         <span className="text-primary mt-1.5 text-[6px] flex-shrink-0">●</span>
                         <span className="line-clamp-2">{desc}</span>
                       </li>
                     ))}
                   </ul>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-medium text-gray-400 bg-surface border border-white/5 px-2 py-1 rounded hover:text-white hover:border-primary/30 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links for Mobile/Quick Access */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors hover:underline"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors hover:underline"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center reveal">
             <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            View Github <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;