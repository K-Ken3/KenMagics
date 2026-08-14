import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestimonials } from '../constants.tsx';
import { Testimonial } from '../types.ts';
import { Star, MessageSquare, ArrowRight, X, Quote, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Testimonials: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);
  const { language, t } = useLanguage();

  const testimonials = getTestimonials(language);

  return (
    <section id="testimonials" className="py-16 sm:py-20 relative overflow-hidden bg-[#07090e] border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full framer-glass-pill border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.testimonials.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.testimonials.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsAllModalOpen(true)}
            className="text-xs font-mono text-pink-300 bg-pink-500/10 border border-pink-500/20 px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-pink-500 hover:text-white transition-all shrink-0 active:scale-95 shadow-md shadow-pink-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.openAllBtn}</span>
          </button>
        </div>

        {/* Compact Endorsements Row */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setSelectedTestimonial(item)}
              className="cursor-pointer framer-card rounded-[24px] p-5 bg-[#0e131f] border border-white/10 hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Star Rating Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                    {t.testimonials.popupReview}
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic line-clamp-3 mb-4">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={item.avatar} 
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-500/30" 
                  />
                  <div>
                    <h4 className="font-display font-bold text-white text-xs">{item.name}</h4>
                    <p className="text-[10px] text-pink-400 font-mono font-semibold">{item.company}</p>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Pop-up Modal for Single Testimonial */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg framer-card rounded-[32px] p-6 sm:p-8 bg-[#0e131f] border border-pink-500/40 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedTestimonial.avatar} 
                    alt={selectedTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-500/40 shrink-0" 
                  />
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">
                      {selectedTestimonial.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {selectedTestimonial.role} • <span className="text-pink-400 font-mono font-semibold">{selectedTestimonial.company}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quote Content */}
              <div className="relative p-5 rounded-2xl bg-white/5 border border-white/5">
                <Quote className="w-8 h-8 text-pink-500/20 absolute -top-3 -left-2" />
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic relative z-10">
                  "{selectedTestimonial.quote}"
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-pink-500 text-white hover:bg-pink-400 transition-all shadow-md shadow-pink-500/20"
                >
                  {t.testimonials.modal.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pop-up Modal for All Endorsements Gallery */}
      <AnimatePresence>
        {isAllModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-2xl framer-card rounded-[32px] p-6 sm:p-8 bg-[#0e131f] border border-pink-500/40 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                  <h3 className="text-xl font-display font-extrabold text-white">{t.testimonials.modal.allTitle}</h3>
                </div>
                <button
                  onClick={() => setIsAllModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-500/30" />
                        <div>
                          <h4 className="font-display font-bold text-white text-xs">{item.name}</h4>
                          <p className="text-[10px] text-pink-400 font-mono font-semibold">{item.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs italic leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsAllModalOpen(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  {t.testimonials.modal.closeGallery}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Testimonials;

