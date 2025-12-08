import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import { GraduationCap, Award } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Education */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-text">Education</h2>
            </div>
            
            <div className="space-y-8 pl-2 border-l-2 border-black/5 dark:border-white/5 relative">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="relative pl-6 group">
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-dark border-2 border-muted group-hover:border-primary group-hover:scale-125 transition-all duration-300 z-10"></div>
                  
                  {/* Content Card */}
                  <div className="p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-black/10 dark:hover:border-white/10 hover:shadow-lg cursor-default">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">{edu.institution}</h3>
                      <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded">{edu.duration}</span>
                    </div>
                    <div className="text-md text-text/80 mb-2 font-medium">{edu.degree}</div>
                    <p className="text-sm text-muted">{edu.details} • {edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="reveal reveal-delay-200">
             <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                <Award size={24} />
              </div>
              <h2 className="text-2xl font-bold text-text">Certifications</h2>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-black/10 dark:hover:border-white/10 hover:shadow-lg cursor-default">
                  <div className="mt-1 min-w-[40px] h-10 flex items-center justify-center bg-surface rounded-full text-muted group-hover:text-white group-hover:bg-primary/80 transition-all duration-300 text-xs font-bold">
                    {cert.date.split(' ')[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text group-hover:text-secondary transition-colors">{cert.name}</h3>
                    <p className="text-sm text-muted">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;