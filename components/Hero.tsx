import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, FileText, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["AI & ML Engineer", "Full Stack Developer", "Data Scientist", "Problem Solver"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before typing new
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 pb-10 overflow-hidden">
      
      {/* Background is now handled by InteractiveBackground component in App.tsx */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Status Badge */}
        <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-300 tracking-wide">AVAILABLE FOR WORK</span>
        </div>

        <h1 className="reveal reveal-delay-100 text-6xl md:text-8xl font-bold tracking-tight mb-6">
          <span className="text-text">Building the</span> <br />
          <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
            Future of Tech
          </span>
        </h1>

        <div className="reveal reveal-delay-200 h-8 mb-6 text-xl md:text-2xl font-mono text-primary/80">
           &lt; {text} <span className="animate-pulse">|</span> /&gt;
        </div>

        <p className="reveal reveal-delay-200 max-w-2xl text-xl text-muted leading-relaxed mb-10">
          Hi, I'm <span className="text-white font-semibold">{PERSONAL_INFO.name}</span>. 
          I bridge the gap between complex <span className="text-gray-300">Data Science</span> algorithms 
          and intuitive <span className="text-gray-300">Full Stack</span> experiences.
        </p>
        
        <div className="reveal reveal-delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
          <a 
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-dark font-semibold hover:bg-gray-200 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] w-full sm:w-auto"
          >
            See My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="/Aditya_Verma_Resume.pdf"
            target="_blank"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer w-full sm:w-auto"
          >
            <FileText size={18} />
            Resume
            <Download size={14} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
          </a>
        </div>

        <div className="reveal reveal-delay-300 mt-16 flex gap-6">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors hover:scale-110 duration-300">
            <Github size={24} />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors hover:scale-110 duration-300">
            <Linkedin size={24} />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-muted hover:text-white transition-colors hover:scale-110 duration-300">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;