import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fullText = "System.init(Aditya_Verma_Portfolio)...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-dark flex flex-col items-center justify-center text-primary">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
        <Terminal size={64} className="relative z-10 animate-bounce" />
      </div>
      <div className="font-mono text-xl md:text-2xl h-8 relative">
        <span className="text-white">root@portfolio:~$</span> {text}
        <span className="animate-pulse">_</span>
      </div>
      
      <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-[width_2s_ease-in-out_forwards]" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default Preloader;