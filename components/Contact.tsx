import React, { useState } from 'react';
import { Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate slight delay for effect and then success state
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Actually open mail client after showing success momentarily
        setTimeout(() => {
             const { message, name } = formData;
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\n\nMessage:\n${message}`;
            window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Reset form after a while
            setTimeout(() => {
                 setIsSuccess(false);
                 setFormData({ name: '', email: '', message: '' });
            }, 3000);
        }, 1000);
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.id as keyof typeof errors]) {
        setErrors({ ...errors, [e.target.id]: '' });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="reveal text-4xl md:text-5xl font-bold text-white mb-6">Ready to work together?</h2>
        <p className="reveal reveal-delay-100 text-xl text-muted mb-12">
          I'm currently available for freelance work and open to full-time opportunities.
        </p>
        
        <div className="reveal reveal-delay-200 glass-panel p-8 rounded-3xl text-left shadow-2xl border border-white/5 relative min-h-[400px] flex items-center justify-center">
          
          {isSuccess ? (
             <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Prepared!</h3>
                <p className="text-muted">Opening your email client...</p>
             </div>
          ) : (
              <form className="space-y-6 w-full" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-surface border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all
                          ${errors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-pulse' 
                            : 'border-white/10 focus:border-primary focus:ring-primary'}`} 
                        placeholder="John Doe" 
                      />
                      {errors.name && <AlertCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />}
                    </div>
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-surface border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all
                          ${errors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-pulse' 
                            : 'border-white/10 focus:border-primary focus:ring-primary'}`} 
                        placeholder="john@example.com" 
                      />
                      {errors.email && <AlertCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />}
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <div className="relative">
                    <textarea 
                      id="message" 
                      rows={4} 
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-surface border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all resize-none
                          ${errors.message
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-pulse' 
                            : 'border-white/10 focus:border-primary focus:ring-primary'}`} 
                      placeholder="Tell me about your project..."
                    ></textarea>
                    {errors.message && <AlertCircle size={16} className="absolute right-3 top-3 text-red-400" />}
                  </div>
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm text-muted hover:text-white flex items-center gap-2 transition-colors">
                    <Mail size={16} /> {PERSONAL_INFO.email}
                  </a>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                      ${isSubmitting 
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                        : 'bg-white text-dark hover:bg-gray-200'}
                    `}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                </div>
              </form>
          )}
        </div>

        <div className="reveal mt-16 text-muted text-sm">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;