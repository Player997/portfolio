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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `Portfolio Contact from ${formData.name}`,
            _template: 'table'
          })
        });

        if (response.ok) {
          setIsSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          console.error("Form submission failed");
          // Fallback to basic alert if service is down, though UI remains resilient
          alert("Something went wrong. Please try contacting me directly via email.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reveal flex flex-col items-center text-center mb-16">
          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl mb-6">
            <Mail size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Let's Create Something Amazing</h2>
          <p className="text-muted max-w-xl">
            Whether you have a question, a project idea, or just want to say hi, I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info Card */}
          <div className="reveal lg:col-span-2 glass-panel p-8 rounded-3xl flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <h3 className="text-xl font-bold text-text mb-6">Contact Information</h3>
              <p className="text-muted mb-8 leading-relaxed">
                Feel free to reach out directly via email or connect with me on professional social platforms.
              </p>
              
              <div className="space-y-6">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 text-muted hover:text-primary transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium break-all">{PERSONAL_INFO.email}</span>
                </a>
                
                <div className="flex items-center gap-4 text-muted group">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-medium">Open to opportunities</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-black/5 dark:border-white/5">
              <p className="text-xs text-muted">
                &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. <br/>Built with React & Tailwind.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-text">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-surface border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-black/10 dark:border-white/10 focus:border-primary'} text-text focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted/50`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-text">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-surface border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-black/10 dark:border-white/10 focus:border-primary'} text-text focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted/50`}
                    placeholder="john@example.com"
                  />
                   {errors.email && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-surface border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-black/10 dark:border-white/10 focus:border-primary'} text-text focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-muted/50`}
                  placeholder="Tell me about your project..."
                />
                 {errors.message && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`
                  w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
                  ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99]'}
                  ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : isSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;