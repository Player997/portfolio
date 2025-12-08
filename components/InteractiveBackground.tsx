import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const particleCount = Math.floor((width * height) / 15000); // Responsive count
    const connectionDistance = 150;
    const mouseDistance = 200;
    
    // State
    const mouse = { x: -1000, y: -1000 };
    
    // Colors
    const colors = ['rgba(129, 140, 248, 0.5)', 'rgba(192, 132, 252, 0.5)', 'rgba(255, 255, 255, 0.3)'];
    
    // Background Blobs (Ambient Light)
    class Blob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.radius = Math.random() * 200 + 300;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Very slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(129, 140, 248, 0.08)' : 'rgba(192, 132, 252, 0.08)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges with buffer
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

    // Particles (Stars/Nodes)
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Standard movement
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            // Gentle push/pull or just visual connection?
            // Let's do a slight attraction to create a "swarm" feel
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 1; // Strength
            const directionY = forceDirectionY * force * 1;
            
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

    const blobs = [new Blob(), new Blob(), new Blob()];
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw ambient blobs first (background layer)
      // We apply a blur filter contextually for blobs
      ctx.filter = 'blur(60px)';
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });
      ctx.filter = 'none';

      // Draw particles and connections
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw Connections
      connectParticles();
      
      requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      // Connect to mouse
      for (let a = 0; a < particles.length; a++) {
        const dx = mouse.x - particles[a].x;
        const dy = mouse.y - particles[a].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
           ctx.strokeStyle = `rgba(129, 140, 248, ${1 - distance / mouseDistance})`; // Fade out
           ctx.lineWidth = 1;
           ctx.beginPath();
           ctx.moveTo(particles[a].x, particles[a].y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.stroke();
        }
      }
    };

    animate();

    // Event Listeners
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
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default InteractiveBackground;