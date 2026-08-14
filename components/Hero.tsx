
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Copy, Check, Code2, Globe2, Coffee, Layers, Palette, Film } from 'lucide-react';
import { TECH_STACK } from '../constants.tsx';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const { t } = useLanguage();

  const roles = t.hero.roles || [
    'Full-Stack Web Engineering',
    'CapCut & Premiere Editing',
    'Photoshop Poster Design',
    'Video Audio Arrangement',
    'UI/UX & Brand Design',
    'Video Editing',
    'Ai Automation & Integration'
  ];

  useEffect(() => {
    if (!roles.length) return;
    const roleInterval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  useEffect(() => {
    const updateKigaliTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Kigali',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateKigaliTime();
    const interval = setInterval(updateKigaliTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('karasiraken5@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-pink-500/15 via-violet-500/10 to-transparent blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Pills Row */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2.5 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full framer-glass-pill border border-pink-500/30 text-pink-400 text-[11px] sm:text-xs font-mono font-semibold tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            <span>{t.hero.availableTag}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full framer-glass-pill border border-white/10 text-slate-300 text-[11px] sm:text-xs font-mono">
            <Globe2 className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.hero.location}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-bold">{time || 'CAT (UTC+2)'}</span>
          </div>
        </motion.div>

        {/* Hero Headline & Subtitle */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-8 space-y-5 sm:space-y-6"
          >
            {/* Animated Rotating Skill Role Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-pink-300 max-w-full overflow-hidden">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin shrink-0" />
              <span className="shrink-0">{t.hero.specializingIn}</span>
              <motion.span 
                key={roles[activeRoleIndex % roles.length]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-bold text-white uppercase tracking-wider truncate"
              >
                {roles[activeRoleIndex % roles.length]}
              </motion.span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              {t.hero.headlinePrefix}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">{t.hero.headlineGradient}</span>{t.hero.headlineSuffix}
            </h1>
            
            <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-normal max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a 
                href="#projects" 
                className="framer-card px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-white font-display font-bold text-xs sm:text-sm hover:brightness-110 shadow-xl shadow-pink-500/20 flex items-center justify-center gap-2.5 transition-all group active:scale-95"
              >
                <span>{t.hero.exploreCode}</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>

              <a 
                href="#design-studio" 
                className="framer-card px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-display font-bold text-xs sm:text-sm hover:brightness-110 shadow-xl shadow-violet-500/20 flex items-center justify-center gap-2.5 transition-all group active:scale-95"
              >
                <Film className="w-4 h-4 text-pink-300" />
                <span>{t.hero.videoStudio}</span>
              </a>

              <button 
                onClick={handleCopyEmail}
                className="framer-glass-pill px-5 py-3.5 sm:px-6 sm:py-4 rounded-full text-slate-200 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-pink-500/30 transition-all active:scale-95 group"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-pink-400" />
                    <span className="text-pink-400 font-semibold">{t.hero.emailCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-pink-400 transition-colors" />
                    <span>{t.hero.copyEmail}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Hero Avatar & Mini Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] framer-card rounded-[32px] p-4 bg-gradient-to-b from-[#121826] to-[#0a0e17] border border-white/10 shadow-2xl">
              <div className="aspect-square rounded-[24px] overflow-hidden relative group mb-4">
                <img 
                  src="keke.jpeg" 
                  alt="KARASIRA Ken" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-3 left-3 right-3 p-3 framer-glass-pill rounded-2xl flex items-center justify-between border border-white/10">
                  <div>
                    <p className="text-xs font-bold text-white">KARASIRA Ken</p>
                    <p className="text-[10px] text-pink-300 font-mono">Software Dev, Video & Sound Editor</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-400 ring-4 ring-pink-500/20"></div>
                </div>
              </div>

              {/* Mini Info snippet */}
              <div className="space-y-2 px-1 text-xs">
                <div className="flex items-center justify-between text-slate-400 py-1.5 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    Current Role
                  </span>
                  <span className="text-slate-200 font-medium text-right">Freelancer</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 py-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Palette className="w-3.5 h-3.5 text-pink-400" />
                    Tools
                  </span>
                  <span className="text-slate-200 font-medium">React, Photoshop, CapCut, Premiere Pro</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Bento Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="framer-card p-6 rounded-2xl flex flex-col justify-between hover:border-pink-500/30 transition-colors">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider font-semibold">
              {t.hero.yearsExp}
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">3+</span>
              <span className="text-xs text-pink-400 font-medium">
                {useLanguage().language === 'fr' ? 'Ans' : 'Years'}
              </span>
            </div>
          </div>

          <div className="framer-card p-6 rounded-2xl flex flex-col justify-between hover:border-violet-500/30 transition-colors">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider font-semibold">
              {useLanguage().language === 'fr' ? 'Logiciels & Apps' : 'Software & Web Apps'}
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">30+</span>
              <span className="text-xs text-pink-400 font-medium">
                {useLanguage().language === 'fr' ? 'Livrées' : 'Shipped'}
              </span>
            </div>
          </div>

          <div className="framer-card p-6 rounded-2xl flex flex-col justify-between hover:border-fuchsia-500/30 transition-colors">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider font-semibold">
              {useLanguage().language === 'fr' ? 'Projets Vidéo & Photo' : 'Video & Photo Projects'}
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">50+</span>
              <span className="text-xs text-pink-400 font-medium">
                {useLanguage().language === 'fr' ? 'Créations' : 'Assets'}
              </span>
            </div>
          </div>

          <div className="framer-card p-6 rounded-2xl flex flex-col justify-between hover:border-pink-500/30 transition-colors">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider font-semibold">
              {useLanguage().language === 'fr' ? 'Partenaires Satisfaits' : 'Happy Partners'}
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">50+</span>
              <span className="text-xs text-pink-400 font-medium">
                {useLanguage().language === 'fr' ? 'Dans le monde' : 'Worldwide'}
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Infinite Tech Stack Marquee Ticker */}
      <div className="w-full overflow-hidden py-4 bg-[#0a0e17]/80 border-y border-white/5 relative">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {(() => {
            const list = TECH_STACK || [];
            return [...list, ...list, ...list].map((tech, idx) => (
              <div key={idx} className="inline-flex items-center gap-3 text-slate-400 text-xs font-mono font-medium tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400/60"></span>
                <span>{tech}</span>
              </div>
            ));
          })()}
        </div>
      </div>

    </section>
  );
};

export default Hero;


