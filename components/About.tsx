import React, { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { MapPin, Code2, Brain } from 'lucide-react';

const About: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) - rect.width / 2;
    const y = (e.clientY - rect.top) - rect.height / 2;
    setMousePos({ x, y });
  };

  return (
    <section id="about" className="py-20 relative" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 reveal">
          <h2 className="text-3xl font-bold text-text">About Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          
          {/* Profile Image Card */}
          <div className="reveal md:col-span-1 md:row-span-2 glass-panel rounded-3xl p-2 relative overflow-hidden group border border-white/10 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
             <img 
                src="./profile.jpg" 
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
             />
          </div>

          {/* Bio Card - Large with Parallax */}
          <div className="reveal md:col-span-2 md:row-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
            
            {/* Parallax Background Container */}
            <div 
                className="absolute inset-[-10%] z-0 transition-transform duration-300 ease-out will-change-transform"
                style={{ 
                    transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)` 
                }}
            >
                {/* Intricate Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.07] dark:opacity-[0.07] transition-opacity" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(120, 120, 120, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 120, 120, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}
                ></div>

                {/* Floating Ethereal Orbs */}
                <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
                <div className="absolute bottom-[20%] left-[20%] w-56 h-56 bg-secondary/20 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-text mb-4 relative z-10">The Intersection of Logic & Creativity</h3>
            <p className="text-muted leading-relaxed relative z-10 font-medium text-lg">
              {PERSONAL_INFO.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-2 relative z-10">
               <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-text/70 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default">Problem Solver</span>
               <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-text/70 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default">Tech Enthusiast</span>
               <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-text/70 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default">Continuous Learner</span>
            </div>
          </div>

          {/* Location Card */}
          <div className="reveal reveal-delay-100 glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="w-full h-full absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform">
              <MapPin className="text-primary" size={28} />
            </div>
            <h4 className="text-text font-medium relative z-10">Based in</h4>
            <p className="text-muted text-sm relative z-10">{PERSONAL_INFO.location}</p>
          </div>

          {/* Focus Card */}
          <div className="reveal reveal-delay-200 glass-panel rounded-3xl p-6 flex flex-col justify-between group hover:border-secondary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                <Brain size={24} />
              </div>
              <span className="text-xs font-mono text-muted">CURRENT FOCUS</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-text mt-2">AI & Machine Learning</h4>
              <p className="text-sm text-muted mt-1">Specializing in predictive models and computer vision.</p>
            </div>
          </div>

          {/* Stack Summary Card */}
          <div className="reveal reveal-delay-300 glass-panel rounded-3xl p-6 flex flex-col justify-between group hover:border-blue-400/30 transition-colors">
            <div className="flex justify-between items-start">
               <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Code2 size={24} />
              </div>
              <span className="text-xs font-mono text-muted">CORE STACK</span>
            </div>
             <div className="flex flex-wrap gap-2 mt-4">
                {['React', 'Python', 'TensorFlow', 'Node.js', 'SQL'].map(tech => (
                  <span key={tech} className="px-2 py-1 bg-black/10 dark:bg-black/40 rounded text-xs text-text/80 border border-black/5 dark:border-white/5">
                    {tech}
                  </span>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;