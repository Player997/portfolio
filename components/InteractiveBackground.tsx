import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  isDarkMode: boolean;
}

const InteractiveBackground: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const particleCount = Math.floor((width * height) / 15000); 
    const connectionDistance = 150;
    const mouseDistance = 200;
    
    // State
    const mouse = { x: -1000, y: -1000 };
    
    // Colors based on theme
    const getColors = () => {
      if (isDarkMode) {
        // Dark Mode: Pastel/Light colors for 'screen' blending
        return [
          'rgba(129, 140, 248, 0.6)', // Indigo 400
          'rgba(192, 132, 252, 0.6)', // Purple 400
          'rgba(255, 255, 255, 0.4)'  // White
        ];
      } else {
        // Light Mode: Saturated/Dark colors for visibility against white
        return [
          'rgba(79, 70, 229, 0.6)',   // Indigo 600
          'rgba(147, 51, 234, 0.6)',  // Purple 600
          'rgba(24, 24, 27, 0.4)'     // Zinc 900 (Dark Gray)
        ];
      }
    };
    
    let particleColors = getColors();

    class Blob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      angle: number;
      angleSpeed: number;

      constructor() {
        this.baseRadius = Math.random() * 150 + 250;
        this.radius = this.baseRadius;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.0; // Slower movement for blobs
        this.vy = (Math.random() - 0.5) * 1.0;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.002 + Math.random() * 0.005; 
        
        const choice = Math.random();
        
        if (isDarkMode) {
          // Dark Mode: Low opacity light blobs
          if (choice < 0.33) this.color = 'rgba(129, 140, 248, 0.15)';
          else if (choice < 0.66) this.color = 'rgba(192, 132, 252, 0.15)';
          else this.color = 'rgba(45, 212, 191, 0.15)'; // Teal accent
        } else {
          // Light Mode: Very low opacity, stronger colors (for multiply blend)
          if (choice < 0.33) this.color = 'rgba(99, 102, 241, 0.1)';
          else if (choice < 0.66) this.color = 'rgba(168, 85, 247, 0.1)';
          else this.color = 'rgba(20, 184, 166, 0.1)'; // Teal accent
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.angleSpeed;
        this.radius = this.baseRadius + Math.sin(this.angle) * 40;

        if (this.x < -this.radius) this.vx = Math.abs(this.vx);
        if (this.x > width + this.radius) this.vx = -Math.abs(this.vx);
        if (this.y < -this.radius) this.vy = Math.abs(this.vy);
        if (this.y > height + this.radius) this.vy = -Math.abs(this.vy);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5; // Slightly larger minimum size
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = (dx / distance) * force * 1; 
            const directionY = (dy / distance) * force * 1;
            this.x += directionX;
            this.y += directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const blobs = [new Blob(), new Blob(), new Blob(), new Blob(), new Blob()];
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Blobs
      // Screen for dark mode (adds light), Multiply for light mode (adds pigment/darkness)
      ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'multiply'; 
      ctx.filter = 'blur(80px)';
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';

      // Particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connections
      connectParticles();
      
      animationId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        const dx = mouse.x - particles[a].x;
        const dy = mouse.y - particles[a].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
           // Dynamic connection color
           let r, g, b;
           if (isDarkMode) {
             r = 129; g = 140; b = 248; // Indigo 400
           } else {
             r = 79; g = 70; b = 229; // Indigo 600
           }
           
           ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1 - distance / mouseDistance})`;
           ctx.lineWidth = 1;
           ctx.beginPath();
           ctx.moveTo(particles[a].x, particles[a].y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.stroke();
        }
      }
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]); // Re-run effect when theme changes to update colors

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveBackground;