import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Aperture, Film, ArrowRight, ChevronRight } from 'lucide-react';
import { useCompanion } from '../context/CompanionContext';
import { useConfigurator } from '../context/ConfiguratorContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { reactTo } = useCompanion();
  const { openPreorder } = useConfigurator();
  const [activeCallout, setActiveCallout] = useState(null);

  // Hero headline typing animation sequence
  const fullText = "Kimaro.";
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setTypedText("");
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 160);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-subtle-grid">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D5FF83]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Top Professional Webcam Bracket Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16181A]/90 border border-[#26282B] backdrop-blur-md"
        >
          <span className="bracket-tag">
            <span className="text-[#D5FF83]">[</span>
            PROFESSIONAL WEBCAM
            <span className="text-[#D5FF83]">]</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D5FF83] animate-pulse" />
          <span className="text-xs font-mono text-[#9EA3A6]">K-1 PRO</span>
        </motion.div>

        {/* Master Heading with Typing Transition */}
        <div className="min-h-[1.15em] flex items-center justify-center mb-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-none flex items-center select-none">
            {typedText.slice(0, typedText.endsWith('.') ? -1 : undefined)}
            {typedText.includes('.') && <span className="text-[#D5FF83]">.</span>}
            {!isTypingComplete && (
              <span className="inline-block w-2 sm:w-3.5 h-[0.8em] bg-[#D5FF83] ml-1.5 animate-pulse rounded-sm" />
            )}
          </h1>
        </div>

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#9EA3A6] max-w-2xl font-normal mb-10 leading-relaxed"
        >
          Every detail in focus. Crafted with <span className="text-white font-medium">30mm Leica optics</span> and a massive <span className="text-white font-medium">1-inch DSLR sensor</span> for uncompromising clarity.
        </motion.p>

        {/* Central Camera Hero Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-4xl mx-auto mb-14"
        >
          {/* Main Visual Card Container */}
          <div className="relative rounded-[32px] bg-gradient-to-b from-[#18191B] via-[#111213] to-[#0A0B0B] border border-[#222426] p-4 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden group">
            
            {/* Background Texture & Lighting */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0B0B] via-transparent to-white/[0.02] pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#D5FF83]/10 blur-[90px] pointer-events-none" />

            {/* Inner Camera Stage */}
            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0B0B0B]">
              
              {/* Authentic 3D Isometric Kimaro Cube Webcam on Volcanic Rock */}
              <motion.img
                src="/assets/kimaro_hero_cube.webp"
                alt="Kimaro K-1 Pro Professional Webcam Cube on Basalt Stone"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onMouseEnter={() => reactTo('hover-product', "Precision CNC aluminum unibody with STARVIS 2 sensor.")}
                className="w-full h-full object-cover sm:object-contain rounded-2xl filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] select-none z-10"
              />

              {/* Floating Callout 1: Ultra Lenses (Left Side) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-1/3 left-4 sm:left-10 z-20"
                onMouseEnter={() => {
                  setActiveCallout('lens');
                  reactTo('hover-features', "30mm Leica f/1.4 optics.");
                }}
                onMouseLeave={() => setActiveCallout(null)}
              >
                <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#0B0B0B]/90 backdrop-blur-md border border-[#26282B] shadow-2xl hover:border-[#D5FF83] transition-all cursor-pointer group/card">
                  <div className="w-10 h-10 rounded-xl bg-[#1C1E20] border border-[#2F3235] flex items-center justify-center text-white group-hover/card:text-[#D5FF83] group-hover/card:border-[#D5FF83]/50 transition-colors">
                    <Aperture size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold text-white tracking-tight">Ultra lenses</div>
                    <div className="text-[11px] font-mono text-[#9EA3A6]">30 mm Leica</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Callout 2: DSLR Quality (Right Side) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-1/4 right-4 sm:right-10 z-20"
                onMouseEnter={() => {
                  setActiveCallout('sensor');
                  reactTo('hover-features', "1-inch STARVIS 2 sensor.");
                }}
                onMouseLeave={() => setActiveCallout(null)}
              >
                <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#0B0B0B]/90 backdrop-blur-md border border-[#26282B] shadow-2xl hover:border-[#D5FF83] transition-all cursor-pointer group/card">
                  <div className="w-10 h-10 rounded-xl bg-[#1C1E20] border border-[#2F3235] flex items-center justify-center text-[#D5FF83] group-hover/card:border-[#D5FF83]/50 transition-colors">
                    <Film size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold text-white tracking-tight">DSLR quality</div>
                    <div className="text-[11px] text-[#9EA3A6]">For the first time on webcam.</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Centered Floating Purchase Pill */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20"
                onMouseEnter={() => reactTo('hover-buy')}
              >
                <div className="flex items-center bg-white rounded-full p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(213,255,131,0.5)] transition-all">
                  <button
                    onClick={openPreorder}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#D5FF83] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>BUY NOW</span>
                  </button>
                  <div className="h-6 w-[1px] bg-black/20 mx-1" />
                  <div className="px-4 py-1 text-black text-xs font-mono font-bold flex flex-col items-start leading-tight">
                    <span className="text-[9px] uppercase tracking-wider text-black/60">From</span>
                    <span className="text-sm font-extrabold">$250</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={openPreorder}
            onMouseEnter={() => reactTo('hover-buy')}
            className="btn-lime text-sm sm:text-base px-8 py-3.5 shadow-xl"
          >
            <span>Preorder Kimaro K-1</span>
            <ArrowRight size={18} />
          </button>

          <Link
            to="/features"
            onMouseEnter={() => reactTo('hover-features')}
            className="btn-secondary text-sm sm:text-base px-7 py-3.5"
          >
            <span>Explore The Clarity</span>
            <ChevronRight size={18} />
          </Link>

          <Link
            to="/customize"
            onMouseEnter={() => reactTo('hover-customize')}
            className="btn-secondary text-sm sm:text-base px-7 py-3.5 text-[#D5FF83] border-[#D5FF83]/30 hover:border-[#D5FF83]"
          >
            <span>Customize Your Camera</span>
          </Link>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6 border-t border-[#1C1E20]">
          <div className="flex flex-col items-center text-center p-3">
            <span className="text-xl sm:text-2xl font-bold font-mono text-white">f/1.4</span>
            <span className="text-xs text-[#9EA3A6] mt-0.5">30mm Leica Optics</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#D5FF83]">1.0-inch</span>
            <span className="text-xs text-[#9EA3A6] mt-0.5">STARVIS 2 Sensor</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <span className="text-xl sm:text-2xl font-bold font-mono text-white">0.03s</span>
            <span className="text-xs text-[#9EA3A6] mt-0.5">Neural AF Lock</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#D5FF83]">0 dB</span>
            <span className="text-xs text-[#9EA3A6] mt-0.5">Silent Passive Cooling</span>
          </div>
        </div>

      </div>
    </section>
  );
}
