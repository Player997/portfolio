import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { MapPin, Globe, Code2, Brain } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 reveal">
          <h2 className="text-3xl font-bold text-white">About Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          
          {/* Bio Card - Large */}
          <div className="reveal md:col-span-2 md:row-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500"></div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">The Intersection of Logic & Creativity</h3>
            <p className="text-gray-300 leading-relaxed relative z-10">
              {PERSONAL_INFO.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 relative z-10">
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted">Problem Solver</span>
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted">Tech Enthusiast</span>
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted">Continuous Learner</span>
            </div>
          </div>

          {/* Location Card */}
          <div className="reveal reveal-delay-100 glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="w-full h-full absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform">
              <MapPin className="text-primary" size={28} />
            </div>
            <h4 className="text-white font-medium relative z-10">Based in</h4>
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
              <h4 className="text-xl font-bold text-white mt-2">AI & Machine Learning</h4>
              <p className="text-sm text-gray-400 mt-1">Specializing in predictive models and computer vision.</p>
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
                  <span key={tech} className="px-2 py-1 bg-black/40 rounded text-xs text-gray-300 border border-white/5">
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