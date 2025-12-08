import React, { useState, useEffect } from 'react';
import { Home, User, Code, Cpu, Mail, FileText, Download } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 100, 
        behavior: 'smooth'
      });
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'About': return <User size={16} />;
      case 'Skills': return <Cpu size={16} />;
      case 'Projects': return <Code size={16} />;
      case 'Experience': return <Home size={16} />;
      case 'Contact': return <Mail size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <>
      {/* Desktop Floating Navbar */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex items-center gap-4">
        <nav className="glass-panel rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl shadow-black/50">
           {NAV_LINKS.map((link) => {
             const isActive = activeSection === link.href.substring(1);
             return (
               <a
                 key={link.name}
                 href={link.href}
                 onClick={(e) => handleNavClick(e, link.href)}
                 className={`
                   relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                   ${isActive 
                     ? 'text-white bg-white/10' 
                     : 'text-muted hover:text-white hover:bg-white/5'}
                 `}
               >
                 {link.name}
                 {isActive && (
                   <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                 )}
               </a>
             );
           })}
        </nav>
        
        {/* Resume Button Desktop */}
        <a 
          href="/Aditya_Verma_Resume.pdf" 
          target="_blank"
          className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2 text-muted hover:text-white hover:bg-white/10 transition-all active:scale-95 group border border-white/5 hover:border-primary/30"
          title="Download Resume"
        >
          <FileText size={18} className="group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm group-hover:text-white transition-colors">Resume</span>
        </a>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        <nav className="glass-panel rounded-2xl p-4 flex justify-between items-center shadow-2xl shadow-black/50">
          {NAV_LINKS.map((link) => {
             const isActive = activeSection === link.href.substring(1);
             return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive ? 'text-primary' : 'text-muted'}`}
              >
                {getIcon(link.name)}
                <span className="text-[10px]">{link.name}</span>
              </a>
            );
          })}
          {/* Mobile Resume Link */}
          <a
            href="/Aditya_Verma_Resume.pdf"
            target="_blank"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted hover:text-primary transition-colors"
          >
             <FileText size={16} />
             <span className="text-[10px]">Resume</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;