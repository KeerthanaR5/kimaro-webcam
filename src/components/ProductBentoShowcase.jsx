import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAMERA_HOTSPOTS } from '../data/features';
import { useCompanion } from '../context/CompanionContext';
import { Mic, Grid, Layers, ShieldCheck, X, Volume2, Sparkles, Check } from 'lucide-react';

export default function ProductBentoShowcase() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [micActive, setMicActive] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const { reactTo, triggerSound } = useCompanion();

  // Color palette swatch values from prompt and reference image
  const swatches = [
    { name: "Soft silver", hex: "#D4D7D8" },
    { name: "Metallic gray", hex: "#9EA3A6" },
    { name: "Graphite gray", hex: "#666666" },
    { name: "Matte black", hex: "#0B0B0B" },
    { name: "Neon lime accent", hex: "#D5FF83" }
  ];

  return (
    <section className="py-24 bg-[#0B0B0B] border-t border-[#1C1E20] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="status-dot-lime" />
            <span className="text-xs font-mono tracking-widest text-[#D5FF83] uppercase">Industrial Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered to Last<span className="text-[#D5FF83]">.</span>
          </h2>
        </div>

        {/* Bento Grid Layout (Matches Reference Image Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Large Wide Craftsmanship Card (Matches top gray card in reference image) */}
          <div className="lg:col-span-8 bento-card p-8 sm:p-10 bg-gradient-to-br from-[#202224] via-[#17181A] to-[#111213] flex flex-col justify-between relative overflow-hidden group">
            
            {/* Background Texture & Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-md z-10">
              <p className="text-xl sm:text-2xl text-[#D4D7D8] font-normal leading-snug">
                The Kimaro is built to last. An <span className="text-white font-semibold">understated painted finish</span> with <span className="text-white font-semibold">precisely-machined aluminum</span> specifically designed for you.
              </p>
            </div>

            {/* Camera on Rock Angular Product Shot & Hotspots */}
            <div className="relative mt-8 h-64 sm:h-80 flex items-center justify-center">
              <img
                src="/assets/camera_rock_top_clean.webp"
                alt="Kimaro precision machined top angle on basalt rock"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] z-10"
                onMouseEnter={() => reactTo('hover-product', "Aero-grade aluminum block.")}
              />

              {/* Interactive Hotspot Pins */}
              {CAMERA_HOTSPOTS.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => {
                    setActiveHotspot(hotspot);
                    triggerSound('focus');
                    reactTo('hover-features', hotspot.title);
                  }}
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
                  title={hotspot.title}
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D5FF83] opacity-60" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-[#0B0B0B] border-2 border-[#D5FF83] items-center justify-center text-[10px] font-bold text-white shadow-lg">
                      +
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom Card Footer: Brand Signoff */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10 z-10">
              <div className="flex items-center gap-2">
                {/* Kimaro Stylized K Glyph */}
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-4 h-4 fill-none">
                    <path d="M9 7V25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                    <path d="M23 8C23 8 16 12 12 16" stroke="#D5FF83" strokeWidth="3" strokeLinecap="round" />
                    <path d="M13 16L23 24" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-white tracking-wide">Kimaro</span>
              </div>

              <div className="text-xs font-mono text-[#9EA3A6]">
                CNC 6061-T6 • 0.01mm Tolerance
              </div>
            </div>
          </div>

          {/* Card 2: Right Column Vertical Color Palette Swatch Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Color Palette Swatches (Matches vertical bar in reference image) */}
            <div className="bento-card p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#9EA3A6]">Surface Palette</span>
                <h3 className="text-lg font-bold text-white mt-1">Industrial Anodization</h3>
                <p className="text-xs text-[#9EA3A6] mt-1">Five signature finishes developed with micro-ceramic passivation.</p>
              </div>

              {/* Swatch Bars */}
              <div className="flex items-center gap-2 my-6">
                {swatches.map((swatch, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group/swatch">
                    <div
                      className="w-full h-14 rounded-xl border border-white/10 transition-transform group-hover/swatch:scale-105 shadow-md"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[9px] font-mono text-[#9EA3A6] opacity-80">{swatch.hex}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#222426] flex items-center justify-between text-xs text-[#9EA3A6]">
                <span>Diamond chamfered edges</span>
                <span className="text-[#D5FF83] font-mono">100% Recyclable</span>
              </div>
            </div>

            {/* Interactive Feature Card A: Isolation Mic */}
            <div
              className="bento-card p-6 cursor-pointer hover:border-[#D5FF83]/50 transition-all relative overflow-hidden"
              onClick={() => {
                setMicActive(!micActive);
                triggerSound('tick');
                reactTo('hover-features', micActive ? "Studio Mic normal." : "Neural noise filter active.");
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    micActive ? 'bg-[#D5FF83] text-black shadow-[0_0_15px_#D5FF83]' : 'bg-[#1C1E20] text-white'
                  }`}>
                    <Mic size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Isolation Mic</h4>
                    <p className="text-xs text-[#9EA3A6]">Dual beamforming acoustic array</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  micActive ? 'bg-[#D5FF83]/20 text-[#D5FF83]' : 'bg-white/10 text-[#9EA3A6]'
                }`}>
                  {micActive ? 'NOISE BLOCKED' : 'CLICK TO TEST'}
                </span>
              </div>

              {/* Animated Soundwave Rings Simulation (Matches icon in reference image) */}
              <div className="h-20 bg-[#121314] rounded-xl border border-[#222426] flex items-center justify-center gap-1 px-4 overflow-hidden relative">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: micActive
                        ? i > 8 && i < 16
                          ? [8, 38, 12, 28, 8]
                          : [4, 6, 4]
                        : [6, 24, 10, 32, 6]
                    }}
                    transition={{
                      duration: 0.8 + (i % 5) * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-1.5 rounded-full transition-colors ${
                      micActive && (i <= 8 || i >= 16)
                        ? 'bg-[#3A3D42]'
                        : micActive
                        ? 'bg-[#D5FF83]'
                        : 'bg-[#666666]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Feature Card B: 2x Matrix Pixels */}
            <div
              className="bento-card p-6 cursor-pointer hover:border-[#D5FF83]/50 transition-all"
              onMouseEnter={() => reactTo('hover-features', "2x Matrix pixel binning.")}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1C1E20] text-[#D5FF83] flex items-center justify-center">
                    <Grid size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">2x Matrix Pixels</h4>
                    <p className="text-xs text-[#9EA3A6]">Quad-pixel light gathering</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#D5FF83]">14 STOPS HDR</span>
              </div>

              {/* Interactive Sensor Pixel Grid (Hover over cells to light them up in neon lime!) */}
              <div className="grid grid-cols-6 gap-1.5 p-3 rounded-xl bg-[#121314] border border-[#222426]">
                {Array.from({ length: 24 }).map((_, i) => {
                  const isInitiallyLit = i === 9 || i === 10 || i === 15;
                  const isHovered = hoveredPixel === i;
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => {
                        setHoveredPixel(i);
                        triggerSound('tick');
                      }}
                      className={`h-5 rounded transition-all duration-150 cursor-pointer ${
                        isHovered || isInitiallyLit
                          ? 'bg-[#D5FF83] shadow-[0_0_8px_#D5FF83]'
                          : 'bg-[#222426] hover:bg-[#3A3D42]'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Hotspot Detailed Modal Popover */}
      <AnimatePresence>
        {activeHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="w-full max-w-lg rounded-3xl bg-[#16181A] border border-[#2F3235] p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#9EA3A6] hover:text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5FF83]/10 border border-[#D5FF83]/30 text-xs font-mono text-[#D5FF83] mb-4">
                {activeHotspot.tag}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{activeHotspot.title}</h3>
              <p className="text-sm text-[#9EA3A6] leading-relaxed mb-6">{activeHotspot.description}</p>

              <div className="border-t border-[#222426] pt-4 flex flex-col gap-2">
                <span className="text-xs font-mono text-white/60 uppercase">Key Architecture</span>
                <div className="flex flex-wrap gap-2">
                  {activeHotspot.specs.map((spec, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-[#222426] text-xs font-mono text-[#D4D7D8]">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
