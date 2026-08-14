import React, { useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import Projects from './components/Projects.tsx';
import DesignStudio from './components/DesignStudio.tsx';
import Process from './components/Process.tsx';
import Testimonials from './components/Testimonials.tsx';
import Contact from './components/Contact.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import { ArrowUp, Globe, Terminal, Sparkles } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Signal to the HTML loader that the home page has landed and is ready
    if (typeof (window as any).markAppAsLoaded === 'function') {
      (window as any).markAppAsLoaded();
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans selection:bg-pink-500/30 selection:text-pink-300">
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Projects />
        <DesignStudio />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      {/* Modern Framer Footer */}
      <footer className="py-12 bg-[#030508] border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo + Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <span className="text-xl font-display font-black tracking-tight text-white">
                KEN<span className="text-pink-400">.</span>DESIGNS
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <p className="text-xs text-slate-500 font-mono">
                © {new Date().getFullYear()} Ken Karasira. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
              <a 
                href="https://github.com/K-Ken3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/ken-karasira-442452292/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://www.instagram.com/k.k3n.__/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span>Instagram</span>
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full framer-glass-pill text-slate-400 hover:text-white hover:border-pink-500/30 transition-all group"
              title={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>

          </div>
        </div>
      </footer>

      {/* Floating Personal AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default App;

