import React, { useEffect, useRef, useState } from 'react';
import { TECH_STACK, SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger slightly earlier
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 reveal">
          <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
          <p className="text-muted mt-2">Tools and technologies I use to bring ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Tech Stack Pills (2/3 width on lg) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_STACK.map((group, idx) => (
              <div key={idx} className={`reveal reveal-delay-${(idx % 3) * 100} glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300`}>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <div 
                      key={tech}
                      className="group/item relative px-3 py-1.5 bg-surface border border-white/5 rounded-lg text-sm text-gray-300 hover:text-white hover:border-primary/30 transition-all cursor-default"
                    >
                      {tech}
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-xs text-white font-medium rounded opacity-0 group-hover/item:opacity-100 transition-all duration-200 transform translate-y-2 group-hover/item:translate-y-0 pointer-events-none whitespace-nowrap z-50 border border-white/10 shadow-xl">
                        {tech}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency Metrics (1/3 width on lg) */}
          <div className="lg:col-span-1 glass-panel p-8 rounded-2xl reveal reveal-delay-300">
             <h3 className="text-xl font-bold text-white mb-6">Proficiency Metrics</h3>
             <div className="space-y-6">
                {SKILLS_DATA.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{skill.subject}</span>
                      <span className="text-sm text-primary">{skill.A}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1500 ease-out"
                        style={{ width: visible ? `${skill.A}%` : '0%' }}
                      ></div>
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

export default Skills;