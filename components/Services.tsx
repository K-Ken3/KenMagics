
import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getServices } from '../constants.tsx';
import { ServiceItem } from '../types.ts';
import { CheckCircle2, Zap, ArrowUpRight, X, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServiceCardProps {
  service: ServiceItem;
  popupDetailsLabel: string;
  onSelectService: (service: ServiceItem) => void;
}

const ServiceCard = memo<ServiceCardProps>(({ service, popupDetailsLabel, onSelectService }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => onSelectService(service)}
      className="group cursor-pointer framer-card rounded-[22px] p-5 flex flex-col justify-between hover:border-pink-500/50 transition-all duration-300 bg-[#0e131f] border border-white/10 relative overflow-hidden"
    >
      <div>
        {/* Header row: Icon + Metric Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 flex items-center gap-1 group-hover:bg-pink-500 group-hover:text-white transition-all">
            <span>{popupDetailsLabel}</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <h3 className="text-lg font-display font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
          {service.title}
        </h3>
        
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
          {service.description}
        </p>
      </div>

      {/* Tag Chips Footer */}
      <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {service.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[9px] font-mono text-slate-400 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-pink-400 font-mono font-semibold group-hover:underline">View →</span>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { language, t } = useLanguage();

  const services = useMemo(() => getServices(language), [language]);

  const handleSelectService = useCallback((service: ServiceItem) => {
    setSelectedService(service);
  }, []);

  return (
    <section id="services" className="py-16 sm:py-20 relative overflow-hidden bg-[#07090e] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full framer-glass-pill border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>{t.services.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {t.services.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          <div className="text-xs font-mono text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3.5 py-2 rounded-full flex items-center gap-2 shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.services.coreDisciplines}</span>
          </div>
        </div>

        {/* Compact Services Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              popupDetailsLabel={t.services.popupDetails}
              onSelectService={handleSelectService}
            />
          ))}
        </div>

      </div>

      {/* Pop-up Modal Dialog for Full Service Breakdown */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg framer-card rounded-[32px] p-6 sm:p-8 bg-[#0e131f] border border-pink-500/40 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 text-2xl flex items-center justify-center text-pink-300 shrink-0">
                    {selectedService.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-widest bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                      {selectedService.metrics || 'Service Capability'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedService.description}
              </p>

              {/* Key Features */}
              {selectedService.features && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <h4 className="font-mono text-xs text-pink-400 uppercase font-bold tracking-wider">{t.services.modal.deliverables}</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedService.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">{t.services.modal.techTools}</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-xs font-mono text-pink-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {t.services.modal.close}
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-white hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.services.modal.discussProject}</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Services;


