import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompanion } from '../context/CompanionContext';
import { Eye, Moon, Sun, Camera, Volume2, VolumeX, Sparkles, Crosshair } from 'lucide-react';

export default function InteractiveKimaroHero() {
  const { soundEnabled, setSoundEnabled, triggerSound, reactTo } = useCompanion();

  const [companionState, setCompanionState] = useState('idle'); // 'idle' | 'sleeping' | 'focusing' | 'excited'
  const [isBlinking, setIsBlinking] = useState(false);
  const [speech, setSpeech] = useState("Hi! Move your cursor — I'm watching you.");
  const [speechTimer, setSpeechTimer] = useState(null);
  const [shutterFlash, setShutterFlash] = useState(false);
  
  // Mouse position relative to camera container
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef(null);

  // Say a temporary speech message
  const say = (text, duration = 3000) => {
    setSpeech(text);
    if (speechTimer) clearTimeout(speechTimer);
    const timer = setTimeout(() => setSpeech(null), duration);
    setSpeechTimer(timer);
  };

  // Natural periodic blinking when awake
  useEffect(() => {
    if (companionState === 'sleeping') return;
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 220);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [companionState]);

  // Window mouse move listener for smooth pupil tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (companionState === 'sleeping' || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates from -1 to 1 relative to center
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));

      // Pupil moves within a ~20px radius
      setPupilPos({
        x: clampedX * 18,
        y: clampedY * 14
      });

      // Subtle 3D tilt of the entire camera body
      setCardTilt({
        rx: -clampedY * 8,
        ry: clampedX * 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [companionState]);

  // Handle click on camera body
  const handleCameraClick = () => {
    if (companionState === 'sleeping') {
      wakeUp();
      return;
    }

    setShutterFlash(true);
    triggerSound('shutter');
    setTimeout(() => setShutterFlash(false), 300);

    const quotes = [
      "Every detail in focus.",
      "30mm Leica f/1.4 optics engaged.",
      "1-inch Sony STARVIS sensor active.",
      "Tracking your best angles.",
      "Stay sharp, look professional.",
      "4K @ 60 FPS uncompressed feed."
    ];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    say(picked, 3200);
    reactTo('click-companion');
  };

  // Toggle sleep/wake
  const toggleSleep = () => {
    if (companionState === 'sleeping') {
      wakeUp();
    } else {
      putToSleep();
    }
  };

  const putToSleep = () => {
    setCompanionState('sleeping');
    setPupilPos({ x: 0, y: 0 });
    setCardTilt({ rx: 0, ry: 0 });
    triggerSound('tick');
    say("Entering standby sleep mode. Zzz...", 2500);
  };

  const wakeUp = () => {
    setCompanionState('excited');
    triggerSound('shutter');
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 240);
    say("Awake and ready to focus!", 3000);
    setTimeout(() => setCompanionState('idle'), 1200);
  };

  const triggerBlink = () => {
    if (companionState === 'sleeping') return;
    setIsBlinking(true);
    triggerSound('tick');
    say("Blinked!", 1800);
    setTimeout(() => setIsBlinking(false), 240);
  };

  const triggerFocus = () => {
    if (companionState === 'sleeping') wakeUp();
    setCompanionState('focusing');
    triggerSound('tick');
    say("Auto-calibrating 14-stop dynamic range...", 2500);
    setTimeout(() => setCompanionState('idle'), 1500);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Interactive Status & Floating Quick Controls Header */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-xl mb-4 px-4 py-2 rounded-2xl bg-[#121417]/80 backdrop-blur-md border border-[#262A2E] z-30 text-xs">
        {/* Status Pill */}
        <div className="flex items-center gap-2 font-mono">
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              companionState === 'sleeping'
                ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]'
                : companionState === 'focusing'
                ? 'bg-[#D5FF83] shadow-[0_0_12px_#D5FF83] animate-ping'
                : 'bg-[#D5FF83] shadow-[0_0_8px_#D5FF83] animate-pulse'
            }`}
          />
          <span className="text-white font-bold tracking-wider uppercase text-[11px]">
            {companionState === 'sleeping'
              ? 'Standby / Sleeping'
              : companionState === 'focusing'
              ? 'Calibrating Optics'
              : 'Interactive Kimaro • Tracking'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Sleep / Wake */}
          <button
            onClick={toggleSleep}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 font-mono text-[11px] cursor-pointer ${
              companionState === 'sleeping'
                ? 'bg-[#D5FF83] text-black border-[#D5FF83] font-bold shadow-[0_0_12px_rgba(213,255,131,0.5)]'
                : 'bg-[#1C1F24] text-[#D4D7D8] border-[#2A2E34] hover:text-[#D5FF83] hover:border-[#D5FF83]/50'
            }`}
            title={companionState === 'sleeping' ? "Wake Up Kimaro" : "Put Kimaro to Sleep"}
          >
            {companionState === 'sleeping' ? (
              <>
                <Sun size={12} className="text-black" />
                <span>Wake Up</span>
              </>
            ) : (
              <>
                <Moon size={12} />
                <span>Sleep</span>
              </>
            )}
          </button>

          {/* Blink */}
          <button
            onClick={triggerBlink}
            disabled={companionState === 'sleeping'}
            className="px-2.5 py-1 rounded-lg bg-[#1C1F24] border border-[#2A2E34] text-[#D4D7D8] hover:text-[#D5FF83] hover:border-[#D5FF83]/50 transition-all font-mono text-[11px] flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Blink Lens Eye"
          >
            <Eye size={12} />
            <span className="hidden sm:inline">Blink</span>
          </button>

          {/* Focus */}
          <button
            onClick={triggerFocus}
            disabled={companionState === 'sleeping'}
            className="px-2.5 py-1 rounded-lg bg-[#1C1F24] border border-[#2A2E34] text-[#D4D7D8] hover:text-[#D5FF83] hover:border-[#D5FF83]/50 transition-all font-mono text-[11px] flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Trigger Autofocus"
          >
            <Crosshair size={12} />
            <span className="hidden sm:inline">Focus</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-[#1C1F24] border border-[#2A2E34] text-[#9EA3A6] hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? "Mute Mechanical Audio" : "Enable Mechanical Audio"}
          >
            {soundEnabled ? <Volume2 size={12} className="text-[#D5FF83]" /> : <VolumeX size={12} />}
          </button>
        </div>
      </div>

      {/* Floating Speech Bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 px-4 py-2 rounded-full bg-[#16181B]/95 backdrop-blur-md border border-[#D5FF83]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs sm:text-sm font-medium text-white flex items-center gap-2.5 z-30"
          >
            <span className="w-2 h-2 rounded-full bg-[#D5FF83] animate-ping shrink-0" />
            <span>{speech}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive Kimaro Camera Stage */}
      <motion.div
        onClick={handleCameraClick}
        animate={{
          rotateX: cardTilt.rx,
          rotateY: cardTilt.ry,
          y: companionState === 'sleeping' ? [0, -6, 0] : [0, -8, 0],
          scale: companionState === 'excited' ? [1, 1.05, 0.98, 1.02, 1] : 1
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 140, damping: 20 },
          rotateY: { type: "spring", stiffness: 140, damping: 20 },
          y: {
            duration: companionState === 'sleeping' ? 4.5 : 3.2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: { duration: 0.5 }
        }}
        whileHover={{ scale: 1.02 }}
        className="relative w-full max-w-[560px] aspect-[877/577] flex items-center justify-center cursor-pointer group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Soft Ambient Radial Backlight */}
        <div
          className={`absolute inset-0 rounded-full blur-[70px] pointer-events-none transition-all duration-700 ${
            companionState === 'sleeping'
              ? 'bg-indigo-500/15'
              : 'bg-[#D5FF83]/15'
          }`}
        />

        {/* Shutter Click White/Neon Flash Overlay */}
        <AnimatePresence>
          {shutterFlash && (
            <motion.div
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-40 bg-white/40 rounded-3xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Floating Zzz Particles when Sleeping */}
        {companionState === 'sleeping' && (
          <div className="absolute top-4 right-16 pointer-events-none z-30">
            <motion.div
              animate={{
                y: [-5, -35, -60],
                opacity: [0, 1, 0],
                x: [0, 15, 30]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              className="text-base sm:text-lg font-mono font-bold text-[#D5FF83] drop-shadow-[0_0_8px_#D5FF83]"
            >
              Zzz...
            </motion.div>
          </div>
        )}

        {/* Base Graphic: Transparent Pristine Illustration of Kimaro Camera */}
        <img
          src="/assets/kimaro_hero_transparent.png"
          alt="Kimaro Interactive Camera"
          className={`w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-500 select-none pointer-events-none ${
            companionState === 'sleeping' ? 'brightness-90 contrast-95' : ''
          }`}
        />

        {/* Status LED Glow Overlay at (X: 67.39%, Y: 27.38%) */}
        <div
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            top: '27.4%',
            left: '67.4%',
            transform: 'translate(-50%, -50%)',
            width: '4%',
            height: '6%'
          }}
        >
          <div
            className={`w-full h-full rounded-full transition-all duration-500 ${
              companionState === 'sleeping'
                ? 'bg-indigo-400 shadow-[0_0_12px_#818cf8]'
                : 'bg-[#D5FF83] shadow-[0_0_16px_#D5FF83] animate-pulse'
            }`}
          />
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE CENTRAL LENS EYE SYSTEM (X: 48.23%, Y: 47.31%) */}
        {/* ======================================================== */}
        <div
          className="absolute z-20 flex items-center justify-center overflow-hidden rounded-full pointer-events-none"
          style={{
            top: '47.31%',
            left: '48.23%',
            transform: 'translate(-50%, -50%)',
            width: '28%',
            height: '42.5%'
          }}
        >
          {/* Internal Iris / Pupil Stage */}
          <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
            
            {/* If Sleeping: Peaceful Curved Eyelid Line (◡‿◡) */}
            {companionState === 'sleeping' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center z-30"
              >
                <div className="w-16 sm:w-20 h-8 sm:h-10 rounded-b-full border-b-[5px] border-[#D5FF83] shadow-[0_0_18px_#D5FF83]" />
                <span className="text-[10px] font-mono text-[#D5FF83]/80 mt-2 tracking-widest uppercase">Standby</span>
              </motion.div>
            ) : (
              /* If Awake: Pupil that tracks mouse + Eyelid blinkers */
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Dynamic Pupil / Aperture Core */}
                <motion.div
                  animate={{
                    x: pupilPos.x,
                    y: pupilPos.y,
                    scale: companionState === 'focusing' ? 0.75 : 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22
                  }}
                  className="relative w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-gradient-to-b from-[#18262E] via-[#0A1218] to-[#04080B] border-2 border-[#D5FF83]/80 shadow-[0_0_24px_rgba(213,255,131,0.45)] flex items-center justify-center"
                >
                  {/* Neon Lime Pupil Center */}
                  <div className="w-5 sm:w-7 h-5 sm:h-7 rounded-full bg-[#D5FF83] shadow-[0_0_12px_#D5FF83] flex items-center justify-center relative">
                    {/* Inner core dark pin */}
                    <div className="w-2 h-2 rounded-full bg-[#050B07]" />
                  </div>

                  {/* Specular Light Blue Reflection (matches the user's artwork!) */}
                  <div className="absolute top-2 left-2 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#7AA9B9]/70 blur-[0.5px]" />
                </motion.div>

                {/* Blinking Top & Bottom Eyelids */}
                <motion.div
                  animate={{
                    scaleY: isBlinking ? 1 : 0
                  }}
                  transition={{ duration: 0.12 }}
                  style={{ originY: 0 }}
                  className="absolute top-0 inset-x-0 h-1/2 bg-[#1B1F23] z-30 border-b-2 border-[#D5FF83]"
                />
                <motion.div
                  animate={{
                    scaleY: isBlinking ? 1 : 0
                  }}
                  transition={{ duration: 0.12 }}
                  style={{ originY: 1 }}
                  className="absolute bottom-0 inset-x-0 h-1/2 bg-[#1B1F23] z-30 border-t-2 border-[#D5FF83]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Click hint pill on hover */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-[#0B0B0B]/90 border border-[#2F3235] text-[10px] font-mono text-[#9EA3A6] whitespace-nowrap shadow-xl flex items-center gap-1.5">
            <Camera size={11} className="text-[#D5FF83]" />
            <span>Click camera to take a snap & test shutter</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
