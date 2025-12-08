import React, { useEffect, useState, useRef } from 'react';

const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isStartled, setIsStartled] = useState(false);
  
  const requestRef = useRef<number>(0);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const startleCooldown = useRef(false);

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
        
        // Calculate eye movement - Enhanced Dynamics
        const angle = Math.atan2(dy, dx);
        const maxEyeMove = 7; // Increased max range
        // Non-linear response: eyes move quickly even for slow speeds, then cap out
        const sensitivity = 0.5; 
        const eyeDist = Math.min(Math.pow(speed, 0.7) * sensitivity, maxEyeMove);
        
        if (speed > 0.1) {
            setEyeOffset({
                x: Math.cos(angle) * eyeDist,
                y: Math.sin(angle) * eyeDist
            });
        }

        // Calculate rotation (tilt) - Spiders tilt into the turn
        const targetRotation = dx * 0.4;
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
      // Startle Logic
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 80 && !startleCooldown.current) {
         setIsStartled(true);
         startleCooldown.current = true;
         
         // Reset startle state
         setTimeout(() => setIsStartled(false), 300);
         // Cooldown before next startle
         setTimeout(() => { startleCooldown.current = false; }, 1000);
      }
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
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
        {/* Cute Spider Character Container */}
        <div 
            className={`
                relative w-20 h-20 transition-all duration-300 ease-out
                ${!isMoving && !isHovering && !isStartled ? 'animate-float' : ''} 
                ${isHovering ? 'scale-110' : 'scale-100'}
                ${isStartled ? '-translate-y-8 scale-90' : 'translate-y-0'}
            `}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
                
                {/* Legs Group - Behind body */}
                <g stroke="#818cf8" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9">
                    {/* Left Legs */}
                    <path d={isStartled ? "M40,40 Q25,25 10,35" : "M40,45 Q20,30 5,40"} className={isMoving ? "animate-pulse" : ""} transition-all duration-200 />
                    <path d={isStartled ? "M35,50 Q20,55 10,65" : "M35,55 Q15,60 5,70"} transition-all duration-200 />
                    <path d={isStartled ? "M40,60 Q30,75 20,85" : "M40,65 Q25,80 15,90"} transition-all duration-200 />
                    <path d={isStartled ? "M45,30 Q30,15 15,20" : "M45,35 Q25,15 10,20"} transition-all duration-200 />

                    {/* Right Legs */}
                    <path d={isStartled ? "M60,40 Q75,25 90,35" : "M60,45 Q80,30 95,40"} className={isMoving ? "animate-pulse" : ""} transition-all duration-200 />
                    <path d={isStartled ? "M65,50 Q80,55 90,65" : "M65,55 Q85,60 95,70"} transition-all duration-200 />
                    <path d={isStartled ? "M60,60 Q70,75 80,85" : "M60,65 Q75,80 85,90"} transition-all duration-200 />
                    <path d={isStartled ? "M55,30 Q70,15 85,20" : "M55,35 Q75,15 90,20"} transition-all duration-200 />
                </g>

                {/* Silk Thread (Top) */}
                <path d="M50,0 L50,40" stroke="white" strokeWidth="1" opacity="0.2" strokeDasharray="4 2" />

                {/* Abdomen (Rear Body) */}
                <ellipse cx="50" cy="62" rx="18" ry="20" fill="#818cf8" fillOpacity="0.9" />
                
                {/* Abdomen Markings */}
                <path d="M50,55 L45,65 L50,75 L55,65 Z" fill="rgba(255,255,255,0.2)" />

                {/* Cephalothorax (Head) */}
                <circle cx="50" cy="42" r="14" fill="#818cf8" fillOpacity="1" />

                {/* Face Container - moves with offsets based on mouse movement */}
                <g transform={`translate(${50 + (isStartled ? 0 : eyeOffset.x)}, ${42 + (isStartled ? 0 : eyeOffset.y)})`}>
                     
                     {/* Accessory Small Eyes */}
                     <circle cx="-6" cy="-8" r="1.5" fill="white" opacity="0.6" />
                     <circle cx="6" cy="-8" r="1.5" fill="white" opacity="0.6" />

                     {/* Main Left Eye */}
                    <ellipse cx="-6" cy="1" rx={isHovering ? 5.5 : 4.5} ry={isHovering ? 5.5 : (isBlinking || isStartled ? 0.5 : 4.5)} fill="white" />
                    <circle cx="-6" cy="1" r={isBlinking || isStartled ? 0 : 1.5} fill="black" />
                    
                    {/* Main Right Eye */}
                    <ellipse cx="6" cy="1" rx={isHovering ? 5.5 : 4.5} ry={isHovering ? 5.5 : (isBlinking || isStartled ? 0.5 : 4.5)} fill="white" />
                    <circle cx="6" cy="1" r={isBlinking || isStartled ? 0 : 1.5} fill="black" />
                    
                    {/* Cute Fangs / Pedipalps */}
                    {!isBlinking && !isStartled && (
                       isHovering 
                        ? <path d="M-3,8 L0,11 L3,8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9" strokeLinecap="round" />
                        : <g opacity="0.7">
                            <path d="M-4,8 Q-3,11 -2,12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M4,8 Q3,11 2,12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </g>
                     )}
                     
                     {/* Startled Mouth (Small O) */}
                     {isStartled && (
                         <circle cx="0" cy="8" r="2" stroke="white" strokeWidth="1.5" fill="none" />
                     )}
                </g>
            </svg>
        </div>
    </div>
  );
};

export default CursorFollower;