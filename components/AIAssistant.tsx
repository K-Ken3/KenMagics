import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/gemini.ts';
import { Message } from '../types.ts';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.aiAssistant.initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: t.aiAssistant.initialMessage }]);
    }
  }, [t.aiAssistant.initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: msg.content }]
    }));

    try {
      const response = await chatWithAI(userMessage, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm processing that information. One moment please." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I ran into a network hiccup. Feel free to re-try!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-20 right-4 sm:right-0 left-4 sm:left-auto w-[calc(100vw-32px)] sm:w-[380px] h-[75vh] sm:h-[520px] max-h-[600px] framer-card bg-[#0e131f] border border-pink-500/30 rounded-[28px] sm:rounded-[32px] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#121826] to-[#0a0e17] border-b border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">{t.aiAssistant.title}</h4>
                <p className="text-[10px] text-pink-400 font-mono font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
                  {t.aiAssistant.status}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] sm:max-w-[85%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-pink-500 text-white rounded-br-none shadow-lg shadow-pink-500/10' 
                  : 'bg-[#121826] text-slate-200 rounded-bl-none border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#121826] text-slate-200 px-4 py-3 rounded-2xl rounded-bl-none text-xs flex gap-1.5 border border-white/5">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} className="p-3 bg-[#0a0e17] border-t border-white/5 shrink-0">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.aiAssistant.placeholder}
                className="w-full bg-[#121826] border border-white/10 rounded-full px-4 py-2.5 sm:px-5 sm:py-3 pr-12 text-xs text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-pink-500 hover:bg-pink-400 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-pink-500 hover:bg-pink-400 rounded-full shadow-2xl shadow-pink-500/40 flex items-center justify-center text-white transition-all transform active:scale-95 hover:scale-105"
      >
        <span className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-25 pointer-events-none"></span>
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Bot className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

    </div>
  );
};

export default AIAssistant;
