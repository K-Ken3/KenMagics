import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProcessSteps } from '../constants.tsx';
import { Workflow, CheckCircle, ArrowRight, X, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Process: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const processSteps = getProcessSteps(language);
  const currentStep = selectedStepIndex !== null ? processSteps[selectedStepIndex] : null;

  return (
    <section id="process" className="py-16 sm:py-20 relative overflow-hidden bg-[#0a0e17] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full framer-glass-pill border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              <span>{t.process.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {t.process.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.process.subtitle}
            </p>
          </div>

          <div className="text-xs font-mono text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3.5 py-2 rounded-full flex items-center gap-2 shrink-0">
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.process.structuredWorkflow}</span>
          </div>
        </div>

        {/* Compact Horizontal Step Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, idx) => (
            <motion.div 
              key={step.number}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedStepIndex(idx)}
              className="cursor-pointer framer-card rounded-[24px] p-5 bg-[#0e131f] border border-white/10 hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-extrabold text-pink-400 group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-pink-300 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                    Phase {step.number}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-pink-400 font-mono font-semibold">
                <span>{t.process.popupDetails}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Pop-up Modal Dialog for Phase Details */}
      <AnimatePresence>
        {currentStep && selectedStepIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg framer-card rounded-[32px] p-6 sm:p-8 bg-[#0e131f] border border-pink-500/40 shadow-2xl space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 text-xl font-mono font-extrabold text-pink-300 flex items-center justify-center shrink-0">
                    {currentStep.number}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-widest bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                      Phase {currentStep.number} Methodology
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStepIndex(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentStep.description}
              </p>

              {/* Deliverables List */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <h4 className="font-mono text-xs text-pink-400 uppercase font-bold tracking-wider">{t.process.modal.deliverables}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.deliverables.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-200 font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Navigation Controls inside Popup */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  disabled={selectedStepIndex === 0}
                  onClick={() => setSelectedStepIndex(selectedStepIndex - 1)}
                  className="px-4 py-2 rounded-full text-xs font-mono text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  {t.process.modal.prevPhase}
                </button>

                <span className="text-xs font-mono text-slate-500">
                  {selectedStepIndex + 1} of {processSteps.length}
                </span>

                <button
                  disabled={selectedStepIndex === processSteps.length - 1}
                  onClick={() => setSelectedStepIndex(selectedStepIndex + 1)}
                  className="px-4 py-2 rounded-full text-xs font-mono text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  {t.process.modal.nextPhase}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Process;

