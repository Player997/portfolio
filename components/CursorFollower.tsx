import React, { useEffect, useState, useRef } from 'react';

const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const requestRef = useRef<number>(0);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Blinking logic
  useEffect(() => {
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextBlink = Math.random() * 3000 + 2000; // 2-5s interval
      blinkTimeoutRef.current = setTimeout(triggerBlink, nextBlink);
    };
    
    blinkTimeoutRef.current = setTimeout(triggerBlink, 2000);
    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    }
  }, []);
  
  // Smooth follow logic with Tilt
  useEffect(() => {
    const updatePosition = () => {
      setPosition(prev => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        
        const speed = Math.sqrt(dx * dx + dy * dy);
        setIsMoving(speed > 1);
        
        // Calculate eye movement
        const angle = Math.atan2(dy, dx);
        const maxEyeMove = 6;
        const eyeDist = Math.min(speed * 0.15, maxEyeMove);
        
        if (speed > 0.5) {
            setEyeOffset({
                x: Math.cos(angle) * eyeDist,
                y: Math.sin(angle) * eyeDist
            });
        }

        // Calculate rotation (tilt)
        const targetRotation = dx * 0.5;
        const clampedRotation = Math.max(-25, Math.min(25, targetRotation));
        setRotation(r => r + (clampedRotation - r) * 0.1);

        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12
        };
      });
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    
    requestRef.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(requestRef.current);
  }, [targetPosition]);

  // Track mouse and hover state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');
        
      setIsHovering(isClickable);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[100] hidden md:block will-change-transform"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`
      }}
    >
        {/* Cute Ghost Character Container */}
        <div className={`relative w-12 h-12 transition-transform duration-300 ${!isMoving && !isHovering ? 'animate-float' : ''} ${isHovering ? 'scale-110' : 'scale-100'}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
                {/* Body with soft tail */}
                <path d="M10,50 Q10,10 50,10 T90,50 V80 Q90,95 75,95 Q65,95 65,85 Q65,95 50,95 Q35,95 35,85 Q35,95 25,95 Q10,95 10,80 Z" fill="#818cf8" fillOpacity="0.8" />
                
                {/* Face Container - moves with offsets */}
                <g transform={`translate(${50 + eyeOffset.x}, ${45 + eyeOffset.y})`}>
                     {/* Left Eye - Expands when hovering */}
                    <ellipse cx="-16" cy="0" rx={isHovering ? 9 : 7} ry={isHovering ? 9 : (isBlinking ? 1 : 8)} fill="white" transition-all />
                    <circle cx="-16" cy="0" r={isBlinking ? 0 : 3} fill="black" />
                    
                    {/* Right Eye - Expands when hovering */}
                    <ellipse cx="16" cy="0" rx={isHovering ? 9 : 7} ry={isHovering ? 9 : (isBlinking ? 1 : 8)} fill="white" transition-all />
                    <circle cx="16" cy="0" r={isBlinking ? 0 : 3} fill="black" />
                    
                    {/* Blushing Cheeks */}
                    <circle cx="-20" cy="14" r="5" fill="#ffb6c1" opacity="0.6" />
                    <circle cx="20" cy="14" r="5" fill="#ffb6c1" opacity="0.6" />

                     {/* Mouth: Smile usually, 'O' shape when hovering */}
                     {!isBlinking && (
                       isHovering 
                        ? <circle cx="0" cy="10" r="4" fill="white" opacity="0.8" /> // 'O' mouth
                        : <path d="M-5,8 Q0,12 5,8" stroke="white" strokeWidth="2" fill="none" opacity="0.8" /> // Smile
                     )}
                </g>
            </svg>
        </div>
    </div>
  );
};

export default CursorFollower;