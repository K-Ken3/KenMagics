import React, { useState } from 'react';
import { Send, Check, Copy, MessageSquare, Mail, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<null | 'success' | 'loading'>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedService, setSelectedService] = useState('Web Development');
  const { t } = useLanguage();

  const services = t.contact.serviceOptions || [
    'Full-Stack Web Development',
    'CapCut & Premiere Video Editing',
    'Photoshop Graphic Design',
    'Video Sound Placement',
    'UI/UX & Brand Identity'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('karasiraken5@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('fullName');
    const email = formData.get('email');
    const message = formData.get('message');

    // WhatsApp number for KARASIRA Ken
    const whatsappNumber = "250780000000"; 
    
    const text = `*New Portfolio Project Inquiry* 🚀
----------------------------
*Name:* ${name}
*Email:* ${email}
*Service Selected:* ${selectedService}

*Message:*
${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setStatus('success');
      setTimeout(() => setStatus(null), 3500);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e] border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="framer-card rounded-[36px] p-8 sm:p-12 lg:p-16 bg-[#0e131f] border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Info & Quick Copy */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full framer-glass-pill border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.contact.sectionTag}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
                  {t.contact.title}
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  {t.contact.subtitle}
                </p>
              </div>

              {/* Direct Info Pills */}
              <div className="space-y-4">
                <div className="framer-glass-pill p-4 rounded-2xl flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 uppercase font-bold">{t.contact.emailLabel}</p>
                      <p className="text-sm font-semibold text-white">karasiraken5@gmail.com</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-pink-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="framer-glass-pill p-4 rounded-2xl flex items-center gap-3 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase font-bold">{t.contact.basedInLabel}</p>
                    <p className="text-sm font-semibold text-white">{t.contact.basedInValue}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 bg-[#0a0e17] p-6 sm:p-8 rounded-[28px] border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Service Pills Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">
                    {t.contact.selectNeed}
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {services.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedService === srv
                            ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">{t.contact.fullNameLabel}</label>
                    <input 
                      name="fullName"
                      required 
                      type="text" 
                      className="w-full bg-[#121826] border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600"
                      placeholder={t.contact.fullNamePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">{t.contact.emailInputLabel}</label>
                    <input 
                      name="email"
                      required 
                      type="email" 
                      className="w-full bg-[#121826] border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600"
                      placeholder={t.contact.emailInputPlaceholder}
                    />
                  </div>
                </div>

                {/* Message textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">{t.contact.detailsLabel}</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4} 
                    className="w-full bg-[#121826] border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600"
                    placeholder={t.contact.detailsPlaceholder}
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 hover:brightness-110 text-white font-display font-bold py-4 rounded-2xl transition-all shadow-xl shadow-pink-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm active:scale-98"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </>
                  ) : status === 'success' ? (
                    'Redirecting to WhatsApp! 💬'
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>{t.contact.sendBtn}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
