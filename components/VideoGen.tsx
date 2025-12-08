import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Video, Loader2, Sparkles, AlertCircle, Play, Film } from 'lucide-react';

const VideoGen: React.FC = () => {
  const [prompt, setPrompt] = useState('A futuristic cyberpunk workspace with holographic code displays and neon lights');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const generateVideo = async () => {
    setLoading(true);
    setError(null);
    setVideoUrl(null);
    setStatus('Initializing AI...');

    try {
      // API Key Check
      const windowAny = window as any;
      if (windowAny.aistudio) {
          const hasKey = await windowAny.aistudio.hasSelectedApiKey();
          if (!hasKey) {
             setStatus('Waiting for API key selection...');
             await windowAny.aistudio.openSelectKey();
          }
      }

      // Safe access to process.env
      const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
      if (!apiKey) {
         throw new Error("API Key not found in environment variables");
      }

      // Initialize right before call to capture the key
      const ai = new GoogleGenAI({ apiKey });
      
      setStatus('Dreaming up visuals (this may take 1-2 minutes)...');
      
      // Request generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus('Rendering frames...');
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5s polling
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      if (operation.error) {
          throw new Error(operation.error.message || 'Video generation failed');
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error('No video URI returned');

      setStatus('Downloading video...');
      
      // Fetch with key
      const response = await fetch(`${downloadLink}&key=${apiKey}`);
      if (!response.ok) throw new Error('Failed to download video');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
           const windowAny = window as any;
           if (windowAny.aistudio) {
               await windowAny.aistudio.openSelectKey();
           }
           setError("Session expired or invalid key. Please try again.");
      } else {
           setError(err.message || "Something went wrong during generation.");
      }
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <section id="ai-demo" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              BETA FEATURE
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">AI Video Playground</h2>
          <p className="text-muted max-w-2xl mx-auto">
             Experience the power of Gemini Veo. Generate a short cinematic introduction or a visual concept for your next project right here.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-2xl p-1 shadow-2xl">
            <div className="bg-black/5 dark:bg-black/40 rounded-xl p-6 md:p-8">
              
              {/* Input Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-secondary" /> 
                  Describe your vision
                </label>
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-surface border border-black/10 dark:border-white/10 rounded-lg p-4 text-text focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none h-32"
                    placeholder="E.g., A cinematic drone shot of a solar farm in the desert at sunset..."
                    disabled={loading}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-muted">
                    Powered by Gemini Veo
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={generateVideo}
                  disabled={loading || !prompt.trim()}
                  className={`
                    flex items-center gap-2 px-8 py-3 rounded-full font-medium text-white transition-all duration-300 shadow-lg
                    ${loading 
                      ? 'bg-slate-700 cursor-not-allowed opacity-70' 
                      : 'bg-gradient-to-r from-primary to-secondary hover:scale-105 hover:shadow-primary/25 active:scale-95'}
                  `}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {status || 'Generating...'}
                    </>
                  ) : (
                    <>
                      <Film size={20} />
                      Generate Video
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}

              {/* Video Output */}
              <div className="relative aspect-video bg-black/10 dark:bg-black/50 rounded-lg border border-black/10 dark:border-white/5 overflow-hidden flex items-center justify-center group">
                {videoUrl ? (
                  <video 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-contain"
                    src={videoUrl}
                  />
                ) : (
                  <div className="text-center p-8">
                    {loading ? (
                       <div className="flex flex-col items-center gap-4">
                         <div className="relative">
                           <div className="w-16 h-16 rounded-full border-4 border-black/10 dark:border-white/5 border-t-primary animate-spin"></div>
                           <div className="absolute inset-0 flex items-center justify-center">
                             <Video size={24} className="text-muted" />
                           </div>
                         </div>
                         <p className="text-muted text-sm animate-pulse">{status}</p>
                       </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-muted">
                        <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                           <Play size={32} className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p>Your generated video will appear here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
          
          <p className="text-center text-xs text-muted mt-6">
            Note: Video generation requires a paid Google Cloud Project API Key. Generation takes approximately 1-2 minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoGen;