import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FOCUS_DEMO_SUBJECTS } from '../data/features';
import { useCompanion } from '../context/CompanionContext';
import { Crosshair, Sliders, Scan, UserCheck, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, ArrowLeftRight, Aperture } from 'lucide-react';

export default function FocusDemo() {
  const [selectedSubject, setSelectedSubject] = useState(FOCUS_DEMO_SUBJECTS[0]);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 %
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [invertSides, setInvertSides] = useState(false); // Swap which side opens vs closes
  const [mode, setMode] = useState('split'); // 'split' | 'iris'
  const [eyeTrackPos, setEyeTrackPos] = useState({ x: 50, y: 38 });
  const containerRef = useRef(null);
  const { reactTo, triggerSound } = useCompanion();

  // Pointer drag to wipe between blurred and clear screen
  const updateSliderFromClientX = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (rawX / rect.width) * 100));
    setSliderPos(Math.round(pct));
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
    triggerSound('tick');
    reactTo('focus-demo-drag');
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      updateSliderFromClientX(e.clientX);
    };

    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updateSliderFromClientX]);

  // Handle pointer move over portrait for face tracker
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setEyeTrackPos({
      x: Math.max(30, Math.min(70, x)),
      y: Math.max(25, Math.min(55, y))
    });
  };

  // Determine which side is closing vs opening based on position & invert setting
  const leftIsClosing = !invertSides ? sliderPos < 50 : sliderPos >= 50;
  const rightIsOpening = !invertSides ? sliderPos >= 50 : sliderPos < 50;

  return (
    <section id="focus-demo" className="py-24 bg-[#0B0B0B] border-t border-[#1C1E20] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="status-dot-lime" />
              <span className="text-xs font-mono tracking-widest text-[#D5FF83] uppercase">Neural Autofocus Engine</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Smoothest Focus<span className="text-[#D5FF83]">.</span>
            </h2>
            <p className="text-lg text-[#9EA3A6] mt-2 max-w-xl">
              Like never before. Dual-side interactive curtain: drag left/right to close soft focus on one side while opening razor-sharp 4K clarity on the other.
            </p>
          </div>

          {/* Mode & Subject Switchers */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Subject Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#16181A] border border-[#222426]">
              {FOCUS_DEMO_SUBJECTS.map((subj) => (
                <button
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj);
                    triggerSound('focus');
                    reactTo('hover-features', `Loaded: ${subj.headline}`);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedSubject.id === subj.id
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-[#9EA3A6] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {subj.tag}
                </button>
              ))}
            </div>

            {/* Invert Swap & Iris Mode Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setInvertSides(!invertSides);
                  triggerSound('tick');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  invertSides
                    ? 'bg-[#D5FF83] text-black font-bold border-[#D5FF83] shadow-[0_0_12px_#D5FF83]'
                    : 'bg-[#16181A] text-[#9EA3A6] border-[#222426] hover:text-white'
                }`}
                title="Swap which side opens vs closes"
              >
                <ArrowLeftRight size={13} />
                <span>Swap Sides</span>
              </button>

              <button
                onClick={() => {
                  setMode(mode === 'split' ? 'iris' : 'split');
                  triggerSound('shutter');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  mode === 'iris'
                    ? 'bg-[#D5FF83] text-black font-bold border-[#D5FF83] shadow-[0_0_12px_#D5FF83]'
                    : 'bg-[#16181A] text-[#9EA3A6] border-[#222426] hover:text-white'
                }`}
                title="Switch between Split Curtain and Center Aperture Iris"
              >
                <Aperture size={13} />
                <span>{mode === 'split' ? 'Iris Mode' : 'Curtain Mode'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Interactive Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Portrait Viewfinder Panel */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onPointerDown={handlePointerDown}
              onMouseEnter={() => {
                setIsHoveringPortrait(true);
                reactTo('hover-features', "Subject lock verified.");
              }}
              onMouseLeave={() => {
                setIsHoveringPortrait(false);
                setEyeTrackPos({ x: 50, y: 38 });
              }}
              className="relative w-full max-w-[420px] h-[580px] rounded-[36px] bg-[#050607] border-2 border-[#242629] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] select-none group cursor-ew-resize touch-none"
            >
              
              {/* Top Status Bar: Story indicators & REC badge */}
              <div className="absolute top-4 inset-x-6 z-30 flex flex-col gap-3 pointer-events-none">
                {/* Story bars */}
                <div className="flex items-center gap-1.5 w-full">
                  <div className="h-1 flex-1 rounded-full bg-white/90" />
                  <div className="h-1 flex-1 rounded-full bg-white/30" />
                  <div className="h-1 flex-1 rounded-full bg-white/30" />
                </div>

                {/* REC indicator with pulsing neon lime dot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                    <span className="w-2 h-2 rounded-full bg-[#D5FF83] shadow-[0_0_8px_#D5FF83] animate-pulse" />
                    <span className="font-bold tracking-wider">Rec</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#D4D7D8]">
                    {selectedSubject.shutter} • {selectedSubject.aperture} • ISO {selectedSubject.iso}
                  </div>
                </div>
              </div>

              {/* Underlying Razor-Sharp Image Layer (Kimaro 4K Lens) */}
              <img
                src={selectedSubject.image}
                alt={selectedSubject.name}
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
              />

              {/* Dynamic One-Side Closing / Other-Side Opening Overlay */}
              {mode === 'split' ? (
                /* Split Screen Curtain Overlay */
                <div
                  className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-all duration-75 ${
                    invertSides ? 'left-auto right-0' : 'left-0 right-auto'
                  }`}
                  style={{ width: `${invertSides ? 100 - sliderPos : sliderPos}%` }}
                >
                  <div className="relative w-[420px] h-[580px]">
                    <img
                      src={selectedSubject.image}
                      alt={selectedSubject.name}
                      className="w-full h-full object-cover object-top filter blur-[8px] brightness-90"
                    />
                    <div className="absolute inset-0 bg-black/15" />
                  </div>
                </div>
              ) : (
                /* Circular Center Aperture Iris Overlay */
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    maskImage: `radial-gradient(circle at 50% 40%, transparent ${sliderPos * 2.5}px, black ${sliderPos * 2.5 + 40}px)`,
                    WebkitMaskImage: `radial-gradient(circle at 50% 40%, transparent ${sliderPos * 2.5}px, black ${sliderPos * 2.5 + 40}px)`
                  }}
                >
                  <img
                    src={selectedSubject.image}
                    alt={selectedSubject.name}
                    className="w-full h-full object-cover object-top filter blur-[9px] brightness-85"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              )}

              {/* Dual-Side Screen Status Pills: ONE SIDE CLOSING, OTHER SIDE OPENING */}
              <div className="absolute top-20 inset-x-5 z-25 flex items-center justify-between pointer-events-none">
                {/* Left Side Status */}
                <div className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-mono flex items-center gap-1.5 shadow-lg border transition-all ${
                  !invertSides
                    ? 'bg-black/85 text-[#9EA3A6] border-white/20'
                    : 'bg-[#D5FF83]/20 text-[#D5FF83] border-[#D5FF83]/50 font-bold'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${!invertSides ? 'bg-red-400' : 'bg-[#D5FF83] animate-pulse'}`} />
                  <span>
                    {!invertSides ? '◂ CLOSING (Soft)' : '◂ OPENING (4K)'}
                  </span>
                </div>

                {/* Right Side Status */}
                <div className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-mono flex items-center gap-1.5 shadow-lg border transition-all ${
                  !invertSides
                    ? 'bg-[#D5FF83]/20 text-[#D5FF83] border-[#D5FF83]/50 font-bold'
                    : 'bg-black/85 text-[#9EA3A6] border-white/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${!invertSides ? 'bg-[#D5FF83] animate-pulse' : 'bg-red-400'}`} />
                  <span>
                    {!invertSides ? 'OPENING (4K) ▸' : 'CLOSING (Soft) ▸'}
                  </span>
                </div>
              </div>

              {/* Interactive Screen Curtain Divider Line with Two-Way Handle */}
              {mode === 'split' && (
                <div
                  className="absolute top-0 bottom-0 z-30 w-[3px] bg-white cursor-ew-resize shadow-[0_0_16px_rgba(255,255,255,0.8)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Central Dual Arrow Handle Button */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#D5FF83] text-black flex items-center justify-center shadow-[0_0_24px_rgba(213,255,131,0.8)] border-2 border-black cursor-ew-resize">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft size={14} strokeWidth={3} />
                      <ChevronRight size={14} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Dual Tag Badge on the Handle: ONE SIDE CLOSE | OTHER SIDE OPEN */}
                  <div className="absolute top-[38%] -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/95 border border-[#D5FF83] shadow-2xl text-[9px] font-mono whitespace-nowrap">
                    <span className="text-red-300">CLOSE ◂</span>
                    <span className="w-1 h-1 rounded-full bg-[#D5FF83]" />
                    <span className="text-[#D5FF83] font-bold">▸ OPEN</span>
                  </div>
                </div>
              )}

              {/* Center Iris Ring when in Iris mode */}
              {mode === 'iris' && (
                <div
                  className="absolute z-30 rounded-full border-2 border-[#D5FF83] shadow-[0_0_25px_rgba(213,255,131,0.6)] pointer-events-none"
                  style={{
                    width: `${sliderPos * 5}px`,
                    height: `${sliderPos * 5}px`,
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/90 border border-[#D5FF83] text-[9px] font-mono text-[#D5FF83] whitespace-nowrap">
                    APERTURE OPEN: {sliderPos}%
                  </div>
                </div>
              )}

              {/* Rule of Thirds Focus Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 opacity-20">
                <div className="border-r border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div />
              </div>

              {/* Interactive Neural Face / Eye Tracking Bounding Box */}
              <motion.div
                animate={{
                  top: `${eyeTrackPos.y}%`,
                  left: `${eyeTrackPos.x}%`,
                  translateX: '-50%',
                  translateY: '-50%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute z-20 w-44 h-44 pointer-events-none"
              >
                <div className="camera-focus-bracket bracket-tl border-[#D5FF83]" />
                <div className="camera-focus-bracket bracket-tr border-[#D5FF83]" />
                <div className="camera-focus-bracket bracket-bl border-[#D5FF83]" />
                <div className="camera-focus-bracket bracket-br border-[#D5FF83]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border border-[#D5FF83]/60 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D5FF83]" />
                  </div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 border border-[#D5FF83]/40 text-[9px] font-mono text-[#D5FF83] whitespace-nowrap">
                  EYE LOCK • {selectedSubject.focalDistance}
                </div>
              </motion.div>

              {/* Bottom Clean Vignette & Single Crisp Overlay (NO duplicate/overlapping text!) */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-25 pointer-events-none" />

              <div className="absolute bottom-6 inset-x-6 z-30 flex flex-col items-center text-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-2 shadow-lg">
                  <Crosshair size={16} />
                </div>

                {/* Only render headline when not already baked into the image */}
                {selectedSubject.id !== 'man' && (
                  <>
                    <h3 className="text-xl font-bold tracking-tight text-white uppercase leading-tight">
                      {selectedSubject.headline}
                    </h3>
                    <p className="text-xs text-[#9EA3A6] font-normal mb-2">
                      {selectedSubject.subheadline}
                    </p>
                  </>
                )}

                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#D5FF83] border-b-2 border-[#D5FF83] pb-0.5">
                  <span>EXPLORE THE CLARITY</span>
                </div>
              </div>

              {/* Drag Prompt Hint */}
              <div className="absolute bottom-1 right-3 text-[8px] font-mono text-white/50 pointer-events-none">
                Drag arrow handle left/right to close/open
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Controls & Engineering Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Interactive Slider Control Card */}
            <div className="bento-card p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">Curtain Split Control</span>
                <span className="text-xs font-mono text-[#D5FF83] font-bold">
                  {sliderPos}% Split Ratio
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => {
                  setSliderPos(Number(e.target.value));
                  reactTo('focus-demo-drag');
                }}
                className="w-full h-2.5 bg-[#222426] rounded-lg appearance-none cursor-ew-resize accent-[#D5FF83]"
              />

              <div className="flex justify-between text-[11px] font-mono text-[#9EA3A6] mt-3">
                <span className="text-red-300 flex items-center gap-1">◂ Side Closing ({100 - sliderPos}%)</span>
                <span className="text-[#D5FF83] flex items-center gap-1">Side Opening ({sliderPos}%) ▸</span>
              </div>
            </div>

            {/* Neural AF Specs Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bento-card p-5">
                <div className="text-2xl font-bold font-mono text-[#D5FF83]">0.03s</div>
                <div className="text-xs font-semibold text-white mt-1">Instant Phase Lock</div>
                <div className="text-[11px] text-[#9EA3A6] mt-1 leading-snug">
                  120 depth checks per second track high-speed movements effortlessly.
                </div>
              </div>

              <div className="bento-card p-5">
                <div className="text-2xl font-bold font-mono text-white">100%</div>
                <div className="text-xs font-semibold text-white mt-1">Eye-Contact Guard</div>
                <div className="text-[11px] text-[#9EA3A6] mt-1 leading-snug">
                  Maintains continuous eye focus even in dramatic low-light scenarios.
                </div>
              </div>
            </div>

            {/* Feature Callout Note */}
            <div className="bento-card p-6 bg-gradient-to-br from-[#17181A] to-[#121315]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#D5FF83]/10 text-[#D5FF83] shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Simultaneous Close / Open Shutter</h4>
                  <p className="text-xs text-[#9EA3A6] mt-1 leading-relaxed">
                    Dragging the divider handle demonstrates real-time optical transition: as the soft-focus screen closes on one side, the 1-inch sensor's 4K razor clarity opens across the opposite side with zero lag.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
