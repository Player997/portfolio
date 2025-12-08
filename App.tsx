import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import CursorFollower from './components/CursorFollower';
import Preloader from './components/Preloader';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run intersection observer after loading is complete
    if (!loading) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });

      const hiddenElements = document.querySelectorAll('.reveal');
      hiddenElements.forEach((el) => observer.observe(el));

      return () => {
        hiddenElements.forEach((el) => observer.unobserve(el));
      };
    }
  }, [loading]);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary/30 cursor-default relative">
      <InteractiveBackground />
      <CursorFollower />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;