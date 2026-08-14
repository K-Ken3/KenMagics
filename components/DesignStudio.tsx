import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Image as ImageIcon, Sparkles, Film, X, Eye, Trash2, Clapperboard, 
  Layers, Headphones, Scissors, ChevronLeft, ChevronRight, Music, Check,
  Lock, Unlock, Key, ShieldAlert, EyeOff
} from 'lucide-react';
import { getDesignAssets } from '../constants.tsx';
import { DesignAsset, MediaItem } from '../types.ts';
import { useLanguage } from '../context/LanguageContext';

const DesignStudio: React.FC = () => {
  const { language, t } = useLanguage();
  const [assets, setAssets] = useState<DesignAsset[]>(() => getDesignAssets(language));
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<DesignAsset | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Sync assets when language changes
  useEffect(() => {
    setAssets(getDesignAssets(language));
  }, [language]);

  // Secret Password Access State (20060ken)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form State for importing multi-media design project
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DesignAsset['category']>('Video Editing');
  const [newDescription, setNewDescription] = useState('');
  const [newTools, setNewTools] = useState('CapCut Pro, Photoshop, Audition');
  
  // Dynamic multi-media gallery input list
  const [galleryInputs, setGalleryInputs] = useState<{ mediaType: 'image' | 'video'; mediaUrl: string; caption: string }[]>([
    { mediaType: 'video', mediaUrl: '', caption: 'Main Video Cut' },
    { mediaType: 'image', mediaUrl: '', caption: 'Photoshop Cover Artwork' }
  ]);

  const categories = [
    { key: 'all', label: t.designStudio.categories.all },
    { key: 'Video Editing', label: t.designStudio.categories.videoEditing },
    { key: 'Photoshop & Graphics', label: t.designStudio.categories.graphics },
    { key: 'Video Audio Arrangement', label: t.designStudio.categories.soundPlacement },
    { key: 'Brand Identity', label: t.designStudio.categories.brandIdentity },
    { key: 'UI/UX Design', label: t.designStudio.categories.uiuxDesign }
  ];

  const filteredAssets = activeCategoryKey === 'all'
    ? assets
    : assets.filter(a => a.category === activeCategoryKey);

  const handleOpenImport = () => {
    if (isAuthenticated) {
      setIsImportOpen(true);
    } else {
      setSecretKeyInput('');
      setAuthError('');
      setIsAuthModalOpen(true);
    }
  };

  const handleVerifySecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKeyInput.trim() === '20060ken') {
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      setIsImportOpen(true);
      setAuthError('');
      setSecretKeyInput('');
    } else {
      setAuthError('Access Denied! Incorrect secret password.');
    }
  };

  const handleAddGalleryField = () => {
    setGalleryInputs([...galleryInputs, { mediaType: 'image', mediaUrl: '', caption: `Media Asset #${galleryInputs.length + 1}` }]);
  };

  const handleRemoveGalleryField = (index: number) => {
    if (galleryInputs.length <= 1) return;
    setGalleryInputs(galleryInputs.filter((_, i) => i !== index));
  };

  const handleGalleryInputChange = (index: number, field: string, value: string) => {
    const updated = [...galleryInputs];
    updated[index] = { ...updated[index], [field]: value };
    setGalleryInputs(updated);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const validGallery: MediaItem[] = galleryInputs
      .filter(input => input.mediaUrl.trim().length > 0)
      .map((input, idx) => ({
        id: `m-${Date.now()}-${idx}`,
        mediaType: input.mediaType,
        mediaUrl: input.mediaUrl.trim(),
        caption: input.caption || `Asset #${idx + 1}`
      }));

    if (validGallery.length === 0) return;

    const createdAsset: DesignAsset = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      mediaType: validGallery[0].mediaType,
      mediaUrl: validGallery[0].mediaUrl,
      gallery: validGallery,
      description: newDescription || 'Custom design & video project with multi-media assets.',
      toolsUsed: newTools.split(',').map(t => t.trim()).filter(Boolean),
      year: new Date().getFullYear().toString(),
      client: 'Creative Project',
      featured: true
    };

    setAssets([createdAsset, ...assets]);
    setNewTitle('');
    setNewDescription('');
    setGalleryInputs([
      { mediaType: 'video', mediaUrl: '', caption: 'Main Video Cut' },
      { mediaType: 'image', mediaUrl: '', caption: 'Photoshop Cover Artwork' }
    ]);
    setIsImportOpen(false);
  };

  const handleRemoveAsset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAssets(assets.filter(a => a.id !== id));
    if (selectedAsset?.id === id) setSelectedAsset(null);
  };

  const openAssetLightbox = (asset: DesignAsset) => {
    setSelectedAsset(asset);
    setActiveMediaIndex(0);
  };

  return (
    <section id="design-studio" className="py-16 sm:py-24 relative overflow-hidden bg-[#05070a] border-t border-white/5">
      {/* Background Radial Glows in Pink / Violet / Fuchsia */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/15 via-fuchsia-500/10 to-transparent blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-rose-500/10 blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full framer-glass-pill border border-pink-500/30 text-pink-300 text-xs font-mono font-semibold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>{t.designStudio.sectionTag}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {t.designStudio.title}
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              {t.designStudio.subtitle}
            </p>
          </div>

          {/* Action Button: Import Multi-Media Project (Protected by Secret 20060ken) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleOpenImport}
              className="w-full sm:w-auto px-5 py-3.5 sm:px-6 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 hover:brightness-110 text-white font-display font-bold text-xs flex items-center justify-center gap-2.5 shadow-xl shadow-pink-500/25 transition-all transform active:scale-95"
            >
              {isAuthenticated ? (
                <Unlock className="w-4 h-4 text-emerald-300 animate-bounce" />
              ) : (
                <Lock className="w-4 h-4 text-pink-200" />
              )}
              <span>{t.designStudio.importBtn}</span>
              {!isAuthenticated && (
                <span className="text-[10px] font-mono bg-black/50 px-2 py-0.5 rounded-full text-pink-300 border border-pink-400/30">
                  Secret Key
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryKey(cat.key)}
              className={`relative px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                activeCategoryKey === cat.key ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeCategoryKey === cat.key && (
                <motion.div
                  layoutId="activeDesignTab"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-full border border-pink-400/40 shadow-lg shadow-pink-500/20"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredAssets.map((asset) => {
              const galleryItems = asset.gallery && asset.gallery.length > 0
                ? asset.gallery
                : [{ id: 'g0', mediaType: asset.mediaType, mediaUrl: asset.mediaUrl, caption: asset.title }];

              return (
                <motion.div
                  key={asset.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openAssetLightbox(asset)}
                  className="group framer-card rounded-[28px] overflow-hidden bg-[#0e131f] border border-white/10 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 cursor-pointer flex flex-col justify-between"
                >
                  {/* Primary Media Preview Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    {asset.mediaType === 'video' ? (
                      <div className="w-full h-full relative">
                        <video
                          src={asset.mediaUrl}
                          poster={asset.thumbnailUrl}
                          loop
                          muted
                          playsInline
                          autoPlay
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                        
                        {/* Video Category Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-pink-600/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <Scissors className="w-3 h-3" />
                          <span>{asset.category}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <img
                          src={asset.mediaUrl}
                          alt={asset.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        
                        {/* Image Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-fuchsia-600/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <ImageIcon className="w-3 h-3" />
                          <span>{asset.category}</span>
                        </div>
                      </div>
                    )}

                    {/* Multi-Media Badge Counter */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 text-pink-300 backdrop-blur-md border border-pink-500/30 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-pink-400" />
                      <span>{galleryItems.length} {galleryItems.length === 1 ? 'Media File' : 'Photos & Videos'}</span>
                    </div>

                    {/* Top Right Action Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {asset.id.startsWith('custom-') && (
                        <button
                          onClick={(e) => handleRemoveAsset(asset.id, e)}
                          className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
                          title="Delete custom asset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>

                  {/* Card Content Info */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-pink-400 font-semibold mb-1">
                        <span>{asset.client || 'Creative Work'}</span>
                        <span>{asset.year}</span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-white group-hover:text-pink-300 transition-colors leading-snug">
                        {asset.title}
                      </h3>

                      <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                        {asset.description}
                      </p>
                    </div>

                    {/* Tools Badges */}
                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                      {(asset.toolsUsed || []).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Video/Photo Modal with Multi-Media Switcher */}
      <AnimatePresence>
        {selectedAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl framer-card rounded-[32px] p-6 sm:p-8 bg-[#0c101a] border border-pink-500/30 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                    <span>{selectedAsset.category}</span>
                    <span>•</span>
                    <span>{selectedAsset.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                    {selectedAsset.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedAsset(null)}
                  className="p-2.5 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Active Media Viewer */}
              {(() => {
                const galleryItems = selectedAsset.gallery && selectedAsset.gallery.length > 0
                  ? selectedAsset.gallery
                  : [{ id: 'g0', mediaType: selectedAsset.mediaType, mediaUrl: selectedAsset.mediaUrl, caption: selectedAsset.title }];
                
                const currentMedia = galleryItems[activeMediaIndex] || galleryItems[0];

                return (
                  <div className="space-y-4">
                    {/* Viewer Container */}
                    <div className="rounded-2xl overflow-hidden bg-black border border-white/10 relative aspect-[16/9] flex items-center justify-center group">
                      {currentMedia.mediaType === 'video' ? (
                        <video
                          key={currentMedia.mediaUrl}
                          src={currentMedia.mediaUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          key={currentMedia.mediaUrl}
                          src={currentMedia.mediaUrl}
                          alt={currentMedia.caption || selectedAsset.title}
                          className="w-full h-full object-contain"
                        />
                      )}

                      {/* Navigation Arrows for Multiple Media */}
                      {galleryItems.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveMediaIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white border border-white/20 hover:bg-pink-600 transition-all opacity-80 group-hover:opacity-100"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setActiveMediaIndex((prev) => (prev + 1) % galleryItems.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white border border-white/20 hover:bg-pink-600 transition-all opacity-80 group-hover:opacity-100"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Media Caption */}
                      {currentMedia.caption && (
                        <div className="absolute bottom-3 left-3 right-3 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs text-pink-200 font-mono">
                          {currentMedia.caption}
                        </div>
                      )}
                    </div>

                    {/* Multi-Media Gallery Thumbnails Switcher */}
                    {galleryItems.length > 1 && (
                      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="text-xs font-mono text-slate-400 font-bold whitespace-nowrap">
                          Project Gallery ({galleryItems.length}):
                        </span>
                        {galleryItems.map((item, idx) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveMediaIndex(idx)}
                            className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                              activeMediaIndex === idx 
                                ? 'border-pink-500 scale-105 shadow-lg shadow-pink-500/30' 
                                : 'border-white/10 opacity-60 hover:opacity-100'
                            }`}
                          >
                            {item.mediaType === 'video' ? (
                              <div className="w-full h-full bg-slate-900 flex items-center justify-center text-pink-400">
                                <Clapperboard className="w-4 h-4" />
                              </div>
                            ) : (
                              <img src={item.mediaUrl} alt={item.caption} className="w-full h-full object-cover" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Asset Description & Tools Breakdown */}
              <div className="grid md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">Project Overview</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedAsset.description}
                  </p>
                </div>

                <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-mono uppercase text-pink-400 font-bold tracking-wider">Software Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedAsset.toolsUsed || []).map((tool) => (
                      <span key={tool} className="px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/20 text-xs font-mono text-pink-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Drawer Modal: Import Custom Photos & Videos Project */}
      <AnimatePresence>
        {isImportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-xl framer-card rounded-[32px] p-6 sm:p-8 bg-[#0c101a] border border-pink-500/40 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white">Import Multi-Media Project</h3>
                </div>
                <button
                  onClick={() => setIsImportOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAsset} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. CapCut Promo Video & Photoshop Cover Poster"
                    className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="Video Editing">Video Editing</option>
                      <option value="Photoshop & Graphics">Photoshop & Graphics</option>
                      <option value="Video Audio Arrangement">Video Audio Arrangement</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">Software Tools</label>
                    <input
                      type="text"
                      value={newTools}
                      onChange={(e) => setNewTools(e.target.value)}
                      placeholder="CapCut, Photoshop, FL Studio"
                      className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Dynamic Multi-Media Inputs (Attach Many Photos / Videos) */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-pink-400 font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Attach Photos & Videos ({galleryInputs.length})</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddGalleryField}
                      className="text-xs font-mono text-pink-300 hover:text-white flex items-center gap-1 font-bold underline"
                    >
                      + Add Another Media
                    </button>
                  </div>

                  {galleryInputs.map((input, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400">Media #{idx + 1}</span>
                        {galleryInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryField(idx)}
                            className="text-xs text-rose-400 hover:text-rose-300 font-mono"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={input.mediaType}
                          onChange={(e) => handleGalleryInputChange(idx, 'mediaType', e.target.value)}
                          className="bg-[#121826] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                        >
                          <option value="video">Video (MP4)</option>
                          <option value="image">Photo (JPG/PNG)</option>
                        </select>

                        <input
                          type="url"
                          required
                          value={input.mediaUrl}
                          onChange={(e) => handleGalleryInputChange(idx, 'mediaUrl', e.target.value)}
                          placeholder="Media Link (https://...)"
                          className="col-span-2 bg-[#121826] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <input
                        type="text"
                        value={input.caption}
                        onChange={(e) => handleGalleryInputChange(idx, 'caption', e.target.value)}
                        placeholder="Short Caption / Description"
                        className="w-full bg-[#121826] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">Project Description</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe your design and video project..."
                    className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 font-bold text-sm text-white shadow-lg shadow-pink-500/30 hover:brightness-110 transition-all"
                >
                  Publish Multi-Media Project
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret Password Authorization Modal (20060ken) */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative w-full max-w-md framer-card rounded-[32px] p-6 sm:p-8 bg-[#0c101a] border border-pink-500/40 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">Import Access Protection</h3>
                    <p className="text-[11px] text-pink-400 font-mono">Secret Password Required</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleVerifySecret} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-pink-400" />
                    <span>Enter Access Key</span>
                  </label>
                  
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={secretKeyInput}
                      onChange={(e) => {
                        setSecretKeyInput(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Enter secret password..."
                      className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3.5 pr-10 text-sm text-white focus:outline-none focus:border-pink-500 font-mono tracking-wider placeholder:text-slate-600"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {authError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{authError}</span>
                    </motion.div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 leading-relaxed font-mono">
                  🔒 Restricted access. Enter the administrator secret key to unlock the multi-media import feature.
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-pink-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Authorize Access</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default DesignStudio;
