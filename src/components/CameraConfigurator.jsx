import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KIMARO_PRODUCT } from '../data/products';
import { useConfigurator } from '../context/ConfiguratorContext';
import { useCompanion } from '../context/CompanionContext';
import { Check, RotateCcw, Shield, Eye, Layers, Sparkles, ArrowRight } from 'lucide-react';

export default function CameraConfigurator({ isFullPage = false }) {
  const {
    selectedFinish,
    setSelectedFinish,
    selectedMount,
    setSelectedMount,
    selectedAccessories,
    toggleAccessory,
    viewAngle,
    setViewAngle,
    environment,
    setEnvironment,
    totalPrice,
    resetConfig,
    openPreorder
  } = useConfigurator();

  const { reactTo, triggerSound } = useCompanion();

  // Finish aesthetics and visual accents
  const getFinishStyles = () => {
    switch (selectedFinish.id) {
      case 'soft-silver':
        return {
          imageFilter: 'contrast(1.15) brightness(1.6) grayscale(0.9)',
          sheenGradient: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(212,215,216,0.2) 50%, rgba(180,185,188,0.3) 100%)',
          accentBorder: 'border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.3)]',
          badgeText: 'Raw Aerospace Aluminum • Satin Polish',
          sheenGlow: 'rgba(255, 255, 255, 0.35)'
        };
      case 'graphite-gray':
        return {
          imageFilter: 'contrast(1.1) brightness(1.22) hue-rotate(200deg) saturate(0.2)',
          sheenGradient: 'linear-gradient(135deg, rgba(120,130,140,0.3) 0%, rgba(56,59,62,0.2) 50%, rgba(80,85,90,0.3) 100%)',
          accentBorder: 'border-[#9EA3A6]/50 shadow-[0_0_25px_rgba(158,163,166,0.25)]',
          badgeText: 'Gunmetal Slate • Laser-Etched Serials',
          sheenGlow: 'rgba(158, 163, 166, 0.3)'
        };
      case 'cyber-lime':
        return {
          imageFilter: 'contrast(1.2) brightness(1.05)',
          sheenGradient: 'linear-gradient(135deg, rgba(213,255,131,0.25) 0%, transparent 60%, rgba(213,255,131,0.15) 100%)',
          accentBorder: 'border-[#D5FF83] shadow-[0_0_40px_rgba(213,255,131,0.5)]',
          badgeText: 'Cyber Collector Run • Signature Neon Lime Trim',
          sheenGlow: 'rgba(213, 255, 131, 0.5)'
        };
      case 'matte-obsidian':
      default:
        return {
          imageFilter: 'contrast(1.18) brightness(0.92)',
          sheenGradient: 'linear-gradient(135deg, rgba(40,40,40,0.3) 0%, transparent 60%, rgba(20,20,20,0.4) 100%)',
          accentBorder: 'border-[#383B3E] shadow-[0_0_20px_rgba(0,0,0,0.8)]',
          badgeText: 'Stealth Matte Black • Micro-Bead Blasted',
          sheenGlow: 'rgba(0, 0, 0, 0.6)'
        };
    }
  };

  const finishStyles = getFinishStyles();

  return (
    <section className={`relative ${isFullPage ? 'min-h-screen pt-32 pb-24' : 'py-24 bg-[#0B0B0B] border-t border-[#1C1E20]'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="status-dot-lime" />
              <span className="text-xs font-mono tracking-widest text-[#D5FF83] uppercase">Interactive Studio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Customize Your Camera<span className="text-[#D5FF83]">.</span>
            </h2>
            <p className="text-base text-[#9EA3A6] mt-2 max-w-xl">
              Tailor every element of the Kimaro K-1 Pro — from aerospace surface treatment to studio mounting and magnetic optical accessories.
            </p>
          </div>

          {/* Reset / Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetConfig();
                triggerSound('tick');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16181A] border border-[#26282B] text-xs font-mono text-[#9EA3A6] hover:text-white hover:border-[#383B3E] transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Configuration</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Product Stage (Sticky so it follows scrolling and eliminates empty space) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-28">
            <div
              className={`relative h-[460px] sm:h-[500px] rounded-3xl border border-[#222426] flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl ${
                environment === 'slate-rock'
                  ? 'bg-gradient-to-b from-[#181a1c] via-[#0e1011] to-[#08090a]'
                  : environment === 'minimal-silver'
                  ? 'bg-gradient-to-b from-[#25282b] via-[#151719] to-[#0c0d0e]'
                  : 'bg-gradient-to-b from-[#141517] via-[#0d0e0f] to-[#060707]'
              }`}
            >
              {/* Subtle Environmental Grid */}
              <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />

              {/* Dynamic Backing Shadow matching finish accent */}
              <div
                className="absolute w-80 h-40 rounded-full blur-[60px] opacity-40 pointer-events-none transition-all duration-500"
                style={{ backgroundColor: finishStyles.sheenGlow }}
              />

              {/* Angle View Selector Overlay */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                {['front', 'isometric', 'top'].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => {
                      setViewAngle(angle);
                      triggerSound('tick');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                      viewAngle === angle
                        ? 'bg-white text-black font-bold shadow'
                        : 'text-[#9EA3A6] hover:text-white'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>

              {/* Environment Backdrop Selector Overlay */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                {[
                  { id: 'dark-studio', label: 'Obsidian' },
                  { id: 'slate-rock', label: 'Basalt' },
                  { id: 'minimal-silver', label: 'Silver' }
                ].map((env) => (
                  <button
                    key={env.id}
                    onClick={() => {
                      setEnvironment(env.id);
                      triggerSound('tick');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                      environment === env.id
                        ? 'bg-[#D5FF83] text-black font-bold shadow'
                        : 'text-[#9EA3A6] hover:text-white'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}
              </div>

              {/* Active Material Spec Tag */}
              <div className="absolute top-16 left-5 z-20 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#D5FF83] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedFinish.accent }} />
                <span>{finishStyles.badgeText}</span>
              </div>

              {/* Interactive Camera Render with Live Finish Visuals */}
              <motion.div
                key={`${selectedFinish.id}-${viewAngle}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center justify-center p-6"
              >
                <div
                  className="relative group/camera cursor-pointer flex items-center justify-center"
                  onClick={() => reactTo('hover-product')}
                >
                  {/* Camera visual with distinct authentic finish renders */}
                  {viewAngle === 'top' ? (
                    <img
                      src="/assets/camera_rock_top_clean.webp"
                      alt="Kimaro Top Angle"
                      className="w-72 sm:w-84 object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 rounded-2xl"
                    />
                  ) : (
                    <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center">
                      <img
                        src={selectedFinish.image || "/assets/finish_matte_obsidian.webp"}
                        alt={`Kimaro ${selectedFinish.name}`}
                        className="w-full h-full object-contain rounded-2xl filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] transition-all duration-500"
                      />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Real-time Config Tag overlay */}
              <div className="absolute bottom-5 left-6 z-20 flex items-center gap-2 text-xs font-mono text-[#9EA3A6]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedFinish.accent }} />
                <span className="text-white font-semibold">{selectedFinish.name}</span>
                <span>•</span>
                <span>{selectedMount.name}</span>
              </div>

              <div className="absolute bottom-5 right-6 z-20 text-xs font-mono font-bold text-[#D5FF83]">
                Total: ${totalPrice}
              </div>
            </div>

            {/* Active Configuration Summary & Live Specs Panel (fills and enriches left column) */}
            <div className="rounded-2xl bg-[#121315]/90 border border-[#222426] p-4 sm:p-5 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222426]/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D5FF83] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Live Build Overview</span>
                </div>
                <div className="text-xs font-mono text-[#D5FF83] font-bold">
                  ${totalPrice} <span className="text-[10px] text-[#9EA3A6]">USD</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#18191B] border border-[#26282B]">
                  <div className="text-[10px] font-mono text-[#9EA3A6] uppercase">Finish</div>
                  <div className="font-bold text-white mt-0.5 truncate">{selectedFinish.name}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#18191B] border border-[#26282B]">
                  <div className="text-[10px] font-mono text-[#9EA3A6] uppercase">Mount</div>
                  <div className="font-bold text-white mt-0.5 truncate">{selectedMount.name.split(' ')[0]} {selectedMount.name.split(' ')[1]}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#18191B] border border-[#26282B]">
                  <div className="text-[10px] font-mono text-[#9EA3A6] uppercase">Accessories</div>
                  <div className="font-bold text-white mt-0.5">
                    {selectedAccessories.length > 0 ? `${selectedAccessories.length} Added` : 'None'}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#18191B] border border-[#26282B]">
                  <div className="text-[10px] font-mono text-[#9EA3A6] uppercase">Optics</div>
                  <div className="font-bold text-[#D5FF83] mt-0.5">30mm f/1.4</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Step 1: Finish Selection */}
            <div className="config-card">
              <span className="step-tag">Step 01</span>
              <h3 className="step-heading">Select Aerospace Finish</h3>
              
              <div className="grid grid-cols-2 gap-3.5">
                {KIMARO_PRODUCT.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => {
                        setSelectedFinish(finish);
                        triggerSound('tick');
                        reactTo('hover-customize', `Finish: ${finish.name}`);
                      }}
                      className={`config-finish-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={finish.image}
                            alt={finish.name}
                            className="w-10 h-7 object-cover rounded-md border border-white/20 shadow-sm shrink-0"
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-white/30 shadow-sm shrink-0"
                            style={{ backgroundColor: finish.hex }}
                          />
                        </div>
                        {isSelected && <Check size={14} className="text-[#D5FF83]" />}
                      </div>
                      <div>
                        <div className="option-title">{finish.name}</div>
                        <div className="option-desc">{finish.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Mounting System Selection */}
            <div className="config-card">
              <span className="step-tag">Step 02</span>
              <h3 className="step-heading">Choose Studio Mount</h3>

              <div>
                {KIMARO_PRODUCT.mountOptions.map((mount) => {
                  const isSelected = selectedMount.id === mount.id;
                  return (
                    <button
                      key={mount.id}
                      onClick={() => {
                        setSelectedMount(mount);
                        triggerSound('tick');
                      }}
                      className={`config-mount-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <div>
                        <div className="option-title flex items-center gap-2">
                          <span>{mount.name}</span>
                          {mount.price === 0 ? (
                            <span className="text-[10px] font-mono text-[#D5FF83] font-bold">Included</span>
                          ) : (
                            <span className="text-[10px] font-mono text-[#9EA3A6] font-bold">+${mount.price}</span>
                          )}
                        </div>
                        <div className="option-desc">{mount.desc}</div>
                      </div>
                      {isSelected && <Check size={16} className="text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Accessories */}
            <div className="config-card">
              <span className="step-tag">Step 03</span>
              <h3 className="step-heading">Studio Accessories</h3>

              <div>
                {KIMARO_PRODUCT.accessories.map((acc) => {
                  const isChecked = selectedAccessories.some((item) => item.id === acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        toggleAccessory(acc);
                        triggerSound('tick');
                      }}
                      className={`config-accessory-btn ${isChecked ? 'checked' : ''}`}
                    >
                      <div>
                        <div className="option-title flex items-center gap-2">
                          <span>{acc.name}</span>
                          <span className="text-[10px] font-mono text-[#D5FF83] font-bold">+${acc.price}</span>
                        </div>
                        <div className="option-desc">{acc.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                        isChecked ? 'bg-[#D5FF83] border-[#D5FF83] text-black' : 'border-[#383B3E]'
                      }`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Price & Checkout CTA */}
            <div className="config-card bg-gradient-to-br from-[#1C1E20] to-[#121315] border-[#D5FF83]/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-[#9EA3A6] uppercase tracking-wider font-mono">Total Estimated Build</span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    ${totalPrice} <span className="text-xs font-normal text-[#9EA3A6]">USD</span>
                  </div>
                </div>
                <div className="text-right text-[11px] font-mono text-[#D5FF83]">
                  <span>Batch 04 Reserved</span>
                  <div className="text-[#9EA3A6]">Ships worldwide</div>
                </div>
              </div>

              <button
                onClick={openPreorder}
                onMouseEnter={() => reactTo('hover-buy', "Ready to lock in this build?")}
                className="btn-lime w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <span>Preorder Configured Kimaro</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
