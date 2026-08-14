import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide/show after scrolling past initial hero buffer (80px)
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down -> hide navbar
          setIsVisible(false);
        } else {
          // Scrolling up -> show navbar
          setIsVisible(true);
        }
      } else {
        // At top of page -> always show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 pointer-events-none transition-transform duration-300 ease-in-out ${
      isVisible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Pill */}
        <a 
          href="#" 
          className="pointer-events-auto framer-glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 group hover:border-pink-500/40 transition-all shadow-xl shadow-black/40"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-pink-500/10 border border-pink-500/30 flex items-center justify-center font-bold text-pink-400 text-sm group-hover:scale-105 transition-transform">
            <img 
              src="logo.png" 
              alt="Ken Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = 'K';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
              KEN KARASIRA <span className="text-pink-400">.</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Digital Studio</span>
          </div>
        </a>

        {/* Center Nav Dock (Desktop) */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 framer-glass-pill px-3 py-1.5 rounded-full shadow-2xl border border-white/10">
          <a 
            href="#projects" 
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {t.nav.projects}
          </a>
          <a 
            href="#design-studio" 
            className="px-4 py-2 text-xs font-semibold text-pink-300 hover:text-white hover:bg-pink-500/20 rounded-full transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>{t.nav.studio}</span>
          </a>
          <a 
            href="#services" 
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {t.nav.services}
          </a>
          <a 
            href="#process" 
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {t.nav.process}
          </a>
          <a 
            href="#testimonials" 
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {t.nav.testimonials}
          </a>
          <a 
            href="#contact" 
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {t.nav.contact}
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="framer-glass-pill flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-pink-500/40 transition-all border border-white/10 shadow-lg active:scale-95"
            title="Switch Language (English / Français)"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-pink-400" />
            <span className={language === 'en' ? 'text-pink-400 font-extrabold' : 'text-slate-400'}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={language === 'fr' ? 'text-pink-400 font-extrabold' : 'text-slate-400'}>FR</span>
          </button>

          {/* Availability Badge */}
          <div className="hidden lg:flex items-center gap-2 framer-glass-pill px-3 py-2 rounded-full text-xs text-slate-300 border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="text-[11px] font-medium text-pink-300">
              {language === 'fr' ? 'Disponible' : 'Available for Hire'}
            </span>
          </div>

          {/* Let's Talk CTA */}
          <a 
            href="#contact" 
            className="framer-glass-pill group relative px-3.5 sm:px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 hover:brightness-110 transition-all shadow-lg shadow-pink-500/20 flex items-center gap-1.5 active:scale-95"
          >
            <span>{t.nav.getInTouch}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden framer-glass-pill p-2.5 rounded-full text-slate-200 hover:text-white active:scale-90 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-6xl mx-auto framer-glass rounded-3xl p-5 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-2">
            
            {/* Mobile Language Switcher Row */}
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-white/10 px-2">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-pink-400" />
                {language === 'fr' ? 'Langue / Language' : 'Language'}
              </span>
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all ${
                    language === 'en'
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English 🇬🇧
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all ${
                    language === 'fr'
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Français 🇫🇷
                </button>
              </div>
            </div>

            <a 
              onClick={() => setMobileMenuOpen(false)}
              href="#projects" 
              className="px-4 py-3 text-sm font-semibold text-slate-200 hover:text-pink-400 hover:bg-white/5 rounded-2xl transition-all"
            >
              {t.nav.projects}
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              href="#design-studio" 
              className="px-4 py-3 text-sm font-semibold text-pink-300 hover:text-pink-200 bg-pink-500/10 rounded-2xl transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>{t.nav.studio}</span>
              </div>
              <span className="text-[10px] font-mono bg-pink-500/20 px-2 py-0.5 rounded-full text-pink-300 border border-pink-400/30">Media</span>
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              href="#services" 
              className="px-4 py-3 text-sm font-semibold text-slate-200 hover:text-pink-400 hover:bg-white/5 rounded-2xl transition-all"
            >
              {t.nav.services}
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              href="#process" 
              className="px-4 py-3 text-sm font-semibold text-slate-200 hover:text-pink-400 hover:bg-white/5 rounded-2xl transition-all"
            >
              {t.nav.process}
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              href="#testimonials" 
              className="px-4 py-3 text-sm font-semibold text-slate-200 hover:text-pink-400 hover:bg-white/5 rounded-2xl transition-all"
            >
              {t.nav.testimonials}
            </a>
            <a 
              onClick={() => setMobileMenuOpen(false)}
              href="#contact" 
              className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-2xl flex items-center justify-between shadow-lg shadow-pink-500/20"
            >
              <span>{t.nav.getInTouch}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
