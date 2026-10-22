import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompanion } from '../context/CompanionContext';
import { Volume2, VolumeX, Eye, EyeOff, Minus, Maximize2, Sparkles, Camera, Moon, Sun, Heart } from 'lucide-react';

export default function CameraCompanion() {
  const {
    enabled,
    setEnabled,
    minimized,
    setMinimized,
    soundEnabled,
    setSoundEnabled,
    companionState,
    setCompanionState,
    speech,
    say,
    mousePos,
    reactTo,
    triggerSound
  } = useCompanion();

  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const containerRef = useRef(null);

  // Periodic natural blinking (when not sleeping)
  useEffect(() => {
    if (!enabled || minimized || companionState === 'sleeping') return;
    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [enabled, minimized, companionState]);

  // Compute 3D tilt angles & pupil tracking
  const { tiltX, tiltY, pupilX, pupilY } = useMemo(() => {
    if (minimized || !enabled || companionState === 'sleeping') {
      return { tiltX: 0, tiltY: 0, pupilX: 0, pupilY: 0 };
    }
    const tx = -mousePos.ny * 18;
    const ty = mousePos.nx * 22;
    const px = mousePos.nx * 10;
    const py = mousePos.ny * 8;
    return { tiltX: tx, tiltY: ty, pupilX: px, pupilY: py };
  }, [mousePos, minimized, enabled, companionState]);

  // Companion click handler (wakes up if sleeping, otherwise plays happy reaction)
  const handleClick = (e) => {
    e.stopPropagation();
    if (companionState === 'sleeping') {
      setCompanionState('idle');
      triggerSound('shutter');
      setIsHappy(true);
      say("Awake and tracking!", 2600);
      setTimeout(() => setIsHappy(false), 1200);
    } else {
      setIsHappy(true);
      triggerSound('shutter');
      reactTo('click-companion');
      setTimeout(() => setIsHappy(false), 1200);
    }
  };

  const toggleSleep = (e) => {
    e.stopPropagation();
    if (companionState === 'sleeping') {
      setCompanionState('idle');
      triggerSound('shutter');
      setIsHappy(true);
      say("Ready to focus!", 2200);
      setTimeout(() => setIsHappy(false), 1200);
    } else {
      setCompanionState('sleeping');
      triggerSound('tick');
      say("Going to sleep. Zzz...", 2200);
    }
  };

  const triggerBlink = (e) => {
    e.stopPropagation();
    setIsBlinking(true);
    triggerSound('tick');
    setTimeout(() => setIsBlinking(false), 240);
  };

  if (!enabled) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setEnabled(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#16181A] border border-[#26282B] text-xs font-mono text-[#9EA3A6] hover:text-[#D5FF83] hover:border-[#D5FF83]/50 transition-all shadow-xl cursor-pointer"
          title="Summon Mimo-style AI Camera Companion"
        >
          <Camera size={14} className="text-[#D5FF83]" />
          <span>Summon Companion</span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
      style={{ perspective: 1000 }}
    >
      {/* Speech Bubble / Dialogue Pill */}
      <AnimatePresence>
        {speech && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 max-w-[240px] px-4 py-2.5 rounded-2xl bg-[#16181A]/95 backdrop-blur-md border border-[#D5FF83]/50 shadow-2xl shadow-black/90 text-xs font-medium text-white flex items-center gap-2 relative"
          >
            <span className="w-2 h-2 rounded-full bg-[#D5FF83] animate-ping shrink-0" />
            <span className="leading-snug">{speech}</span>
            <div className="absolute -bottom-1.5 right-10 w-3 h-3 bg-[#16181A] border-r border-b border-[#D5FF83]/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Character Body or Minimized Pill */}
      <AnimatePresence mode="wait">
        {minimized ? (
          <motion.div
            key="minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-[#121314]/95 backdrop-blur-md border border-[#26282B] shadow-xl hover:border-[#D5FF83]/50 transition-colors"
          >
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setMinimized(false)}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#D5FF83] shadow-[0_0_8px_#D5FF83]" />
              <span className="text-xs font-mono text-[#D4D7D8]">Mimo Cam</span>
            </div>
            <button
              onClick={() => setMinimized(false)}
              className="p-1 rounded-full text-[#9EA3A6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Expand Companion"
            >
              <Maximize2 size={13} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative flex flex-col items-center"
          >
            {/* Top Interactive Mimo Control Bar */}
            <div className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md border border-[#26282B] text-[10px] text-[#9EA3A6] shadow-xl">
              <span className="flex items-center gap-1 font-mono text-[#D5FF83] font-bold">
                <span className={`w-1.5 h-1.5 rounded-full ${companionState === 'sleeping' ? 'bg-indigo-400' : 'bg-[#D5FF83] animate-pulse'}`} />
                {companionState === 'sleeping' ? 'SLEEPING' : isHappy ? 'HAPPY' : 'AWAKE'}
              </span>
              <span className="text-[#3A3D42]">•</span>
              
              {/* Wake / Sleep button */}
              <button
                onClick={toggleSleep}
                className="hover:text-[#D5FF83] transition-colors flex items-center gap-1 cursor-pointer"
                title={companionState === 'sleeping' ? "Wake Up Mimo" : "Put Mimo to Sleep"}
              >
                {companionState === 'sleeping' ? (
                  <>
                    <Sun size={11} className="text-[#D5FF83]" />
                    <span className="text-[#D5FF83] font-bold">Wake</span>
                  </>
                ) : (
                  <>
                    <Moon size={11} />
                    <span>Sleep</span>
                  </>
                )}
              </button>

              {/* Blink trigger */}
              {companionState !== 'sleeping' && (
                <button
                  onClick={triggerBlink}
                  className="hover:text-[#D5FF83] transition-colors cursor-pointer"
                  title="Blink Eye"
                >
                  <Eye size={11} />
                </button>
              )}

              {/* Audio toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? "Mute Shutter Sounds" : "Enable Shutter Sounds"}
              >
                {soundEnabled ? <Volume2 size={11} className="text-[#D5FF83]" /> : <VolumeX size={11} />}
              </button>

              {/* Minimize */}
              <button
                onClick={() => setMinimized(true)}
                className="hover:text-white transition-colors cursor-pointer"
                title="Minimize Companion"
              >
                <Minus size={11} />
              </button>

              {/* Close */}
              <button
                onClick={() => setEnabled(false)}
                className="hover:text-red-400 transition-colors cursor-pointer"
                title="Close Companion"
              >
                <EyeOff size={11} />
              </button>
            </div>

            {/* Mimo-style Expressive Camera Robot Character */}
            <motion.div
              onClick={handleClick}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              animate={{
                y: companionState === 'sleeping' ? [0, -3, 0] : isHappy ? [0, -10, 0, -6, 0] : [0, -5, 0],
                rotateX: tiltX,
                rotateY: tiltY,
                rotateZ: isHappy ? [0, -6, 6, -3, 0] : 0
              }}
              transition={{
                y: { duration: companionState === 'sleeping' ? 4 : isHappy ? 0.6 : 3.5, repeat: isHappy ? 1 : Infinity, ease: "easeInOut" },
                rotateX: { type: "spring", stiffness: 180, damping: 22 },
                rotateY: { type: "spring", stiffness: 180, damping: 22 },
                rotateZ: { duration: 0.6 }
              }}
              className="relative w-30 h-30 cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
              title={companionState === 'sleeping' ? "Mimo is sleeping. Click to wake up!" : "Mimo AI Companion: Click to interact!"}
            >
              {/* Floating Animated Zzz Particles when Sleeping */}
              {companionState === 'sleeping' && (
                <div className="absolute -top-7 right-1 pointer-events-none z-30">
                  <motion.div
                    animate={{ y: [-2, -22, -38], opacity: [0, 1, 0], x: [0, 8, 16] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    className="text-xs font-mono font-bold text-[#D5FF83]"
                  >
                    Zzz...
                  </motion.div>
                </div>
              )}

              {/* Happy Sparkle Heart when clicked */}
              {isHappy && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1.2, y: -24 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex items-center gap-1 text-[#D5FF83]"
                >
                  <Sparkles size={16} />
                </motion.div>
              )}

              {/* Outer Glow Halo */}
              <div
                className={`absolute inset-0 rounded-[30px] transition-opacity duration-300 pointer-events-none ${
                  isHappy || companionState === 'excited'
                    ? 'opacity-80 bg-[#D5FF83]/20 shadow-[0_0_40px_rgba(213,255,131,0.5)]'
                    : 'opacity-0'
                }`}
              />

              {/* Mimo Camera Chassis (Rounded, Metallic with Beveled Edges) */}
              <div className={`w-full h-full rounded-[30px] bg-gradient-to-br from-[#282B2F] via-[#141517] to-[#0A0B0C] border-2 border-[#34383D] group-hover:border-[#D5FF83]/70 transition-all duration-300 p-2.5 flex items-center justify-center relative shadow-[0_24px_50px_rgba(0,0,0,0.9)] ${
                companionState === 'sleeping' ? 'brightness-85' : ''
              }`}>
                
                {/* Top Antenna / Shutter Dial */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-t-lg bg-[#34383D] border-t border-x border-[#484D54] flex items-center justify-center">
                  <div className="w-4 h-0.5 rounded-full bg-[#141517]" />
                </div>

                {/* Left/Right Ear Accent Grooves */}
                <div className="absolute top-4 left-1.5 w-1 h-7 rounded-full bg-[#2A2D31]" />
                <div className="absolute top-4 right-1.5 w-1 h-7 rounded-full bg-[#2A2D31]" />

                {/* Status LED */}
                <div className="absolute top-3 right-3.5 flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    companionState === 'sleeping'
                      ? 'bg-indigo-400 shadow-[0_0_6px_#818cf8]'
                      : isHappy || companionState === 'excited'
                      ? 'bg-[#D5FF83] shadow-[0_0_12px_#D5FF83]'
                      : 'bg-[#D5FF83] shadow-[0_0_6px_#D5FF83]'
                  }`} />
                </div>

                {/* Micro Engraving */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-widest text-[#777777] uppercase whitespace-nowrap">
                  Kimaro • AI
                </div>

                {/* Central Expressive Eye Lens Barrel */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1E2124] to-[#08090A] border-2 border-[#3A3E44] p-1.5 flex items-center justify-center relative shadow-inner">
                  
                  {/* Subtle Knurled Rotating Bezel */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#555A62]/40 animate-[spin_40s_linear_infinite]" />

                  {/* Optical Glass Socket */}
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#050607] via-[#0D151A] to-[#12231A] border border-[#2A2D30] relative overflow-hidden flex items-center justify-center shadow-[inset_0_4px_14px_rgba(0,0,0,0.95)]">
                    
                    {/* Emerald Optical Reflection Flare */}
                    <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#D5FF83]/30 via-emerald-500/15 to-transparent blur-sm pointer-events-none" />

                    {/* EXPRESSIVE MIMO EYE STATES */}
                    {companionState === 'sleeping' ? (
                      /* Sleeping State: Peaceful Curved Sleep Eye (◡‿◡) */
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-9 h-4.5 rounded-b-full border-b-4 border-[#D5FF83] shadow-[0_0_12px_#D5FF83]" />
                      </div>
                    ) : isHappy ? (
                      /* Happy State: Joyful Crescent Wink (◠‿◠) */
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-9 h-4.5 rounded-t-full border-t-4 border-[#D5FF83] shadow-[0_0_14px_#D5FF83]" />
                      </div>
                    ) : (
                      /* Awake / Tracking State: Big Expressive Lens Eye */
                      <motion.div
                        animate={{
                          scaleY: isBlinking ? 0.05 : 1,
                          scale: companionState === 'excited' ? 1.15 : companionState === 'focusing' ? 0.88 : 1
                        }}
                        transition={{ duration: 0.15 }}
                        className="w-12 h-12 rounded-full border-2 border-[#1E2522] bg-[#000000] relative flex items-center justify-center overflow-hidden"
                      >
                        {/* Iris that follows mouse */}
                        <motion.div
                          animate={{
                            x: pupilX,
                            y: pupilY,
                            scale: isHappy ? 1.25 : 1
                          }}
                          transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          className="w-6 h-6 rounded-full bg-gradient-to-b from-[#1B3624] via-[#0C1811] to-[#000000] border border-[#D5FF83]/60 relative flex items-center justify-center shadow-[0_0_14px_rgba(213,255,131,0.35)]"
                        >
                          {/* Pupil Core with Specular Glistening Highlights */}
                          <div className="w-3.5 h-3.5 rounded-full bg-[#050B07] border border-[#D5FF83] relative">
                            {/* Primary Big Sparkle Catchlight */}
                            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_#ffffff]" />
                            {/* Secondary Micro Sparkle */}
                            <div className="absolute bottom-0.5 left-0.5 w-0.8 h-0.8 rounded-full bg-[#D5FF83]" />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Specular Curved Reflection */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Shutter Click Flash Overlay */}
                <AnimatePresence>
                  {isHappy && (
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 rounded-[30px] bg-[#D5FF83] pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
