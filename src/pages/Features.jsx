import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KEY_FEATURES, COMPARISON_TABLE } from '../data/features';
import { useConfigurator } from '../context/ConfiguratorContext';
import { useCompanion } from '../context/CompanionContext';
import { Aperture, Mic, Film, Sparkles, Check, ArrowRight, Eye, Volume2, Shield } from 'lucide-react';

export default function Features() {
  const { openPreorder } = useConfigurator();
  const { reactTo, triggerSound } = useCompanion();

  // FOV simulation state: 90 (wide), 78 (balanced), 65 (cinematic)
  const [selectedFOV, setSelectedFOV] = useState(78);
  const [isAudioFilterActive, setIsAudioFilterActive] = useState(true);

  return (
    <main className="w-full pt-32 pb-24 bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16181A] border border-[#222426]">
            <span className="w-2 h-2 rounded-full bg-[#D5FF83] shadow-[0_0_8px_#D5FF83]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D5FF83]">Full Feature Matrix</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Optics Reimagined<span className="text-[#D5FF83]">.</span>
          </h1>

          <p className="text-lg text-[#9EA3A6] leading-relaxed">
            Every millimeter of Kimaro K-1 Pro is engineered without compromise. Discover how 30mm Leica glass, 1-inch silicon, and neural hardware elevate your presence.
          </p>
        </div>

        {/* Feature Grid with Deep Dives */}
        <div className="flex flex-col gap-16 mb-24">
          {KEY_FEATURES.map((feat, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={feat.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual / Interactive Block */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="bento-card p-8 bg-gradient-to-br from-[#16181A] to-[#101112] min-h-[360px] flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D5FF83]/5 rounded-full blur-[80px] pointer-events-none" />

                    {feat.id === 'smoothest-focus' ? (
                      <div className="relative rounded-2xl overflow-hidden border border-[#222426] h-72">
                        <img
                          src="/assets/story_smoothest_focus.webp"
                          alt="Smoothest Focus Demonstration"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                          <span className="text-xs font-mono text-[#D5FF83] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D5FF83] animate-pulse" />
                            0.03s Phase Detection Active
                          </span>
                        </div>
                      </div>
                    ) : feat.id === 'dslr-optics' ? (
                      <div className="relative rounded-2xl overflow-hidden border border-[#222426] h-72 flex items-center justify-center bg-black">
                        <img
                          src="/assets/banner_vortex.jpg"
                          alt="Leica Optical Group"
                          className="w-full h-full object-cover filter contrast-125"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="text-2xl font-bold font-mono text-white">f/1.4 Glass</div>
                            <div className="text-xs font-mono text-[#D5FF83] mt-1">7 Elements in 5 Groups</div>
                          </div>
                        </div>
                      </div>
                    ) : feat.id === 'isolation-mic' ? (
                      <div className="p-6 rounded-2xl bg-[#0D0E0F] border border-[#222426] flex flex-col justify-between h-72">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#9EA3A6]">Neural Acoustic Tunnel</span>
                          <button
                            onClick={() => {
                              setIsAudioFilterActive(!isAudioFilterActive);
                              triggerSound('tick');
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                              isAudioFilterActive
                                ? 'bg-[#D5FF83] text-black font-bold'
                                : 'bg-[#222426] text-[#9EA3A6]'
                            }`}
                          >
                            {isAudioFilterActive ? 'Filter: ON (-38dB)' : 'Filter: BYPASS'}
                          </button>
                        </div>

                        {/* Interactive Waveform Visualizer */}
                        <div className="flex items-center justify-center gap-1.5 h-28 my-auto">
                          {Array.from({ length: 32 }).map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                height: isAudioFilterActive
                                  ? (i > 10 && i < 22)
                                    ? [10, 50, 20, 60, 10]
                                    : [4, 8, 4]
                                  : [8, 45, 18, 65, 8]
                              }}
                              transition={{
                                duration: 0.7 + (i % 6) * 0.1,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`w-1.5 rounded-full ${
                                isAudioFilterActive && (i <= 10 || i >= 22)
                                  ? 'bg-[#222426]'
                                  : 'bg-[#D5FF83]'
                              }`}
                            />
                          ))}
                        </div>

                        <div className="text-xs text-[#9EA3A6] flex justify-between font-mono">
                          <span>HVAC Noise: Blocked</span>
                          <span>Voice Clarity: 100%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden border border-[#222426] h-72 flex items-center justify-center">
                        <img
                          src="/assets/product_hero_card.webp"
                          alt="Product Architecture"
                          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Description Block */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16181A] border border-[#26282B] text-xs font-mono text-[#D5FF83] mb-3">
                    {feat.badge}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-[#D4D7D8] mb-4">
                    {feat.subtitle}
                  </h4>
                  <p className="text-sm sm:text-base text-[#9EA3A6] leading-relaxed mb-6">
                    {feat.description}
                  </p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1C1E20]">
                    {feat.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-xl font-bold font-mono text-white">{metric.value}</div>
                        <div className="text-xs font-semibold text-[#D4D7D8] mt-0.5">{metric.label}</div>
                        <div className="text-[10px] text-[#9EA3A6] mt-0.5">{metric.caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Field of View (FOV) Simulator */}
        <div className="bento-card p-8 sm:p-12 mb-24 bg-gradient-to-br from-[#16181A] via-[#121314] to-[#0A0B0B]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono text-[#D5FF83] uppercase tracking-wider">Software Cropping System</span>
              <h3 className="text-3xl font-extrabold text-white mt-1">Multi-Angle Field of View</h3>
              <p className="text-sm text-[#9EA3A6] mt-1">Lossless sensor cropping with zero optical distortion.</p>
            </div>

            {/* FOV Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B0B0B] border border-[#222426]">
              {[
                { fov: 90, label: "90° Wide Angle", desc: "Collaborative Rooms" },
                { fov: 78, label: "78° Balanced", desc: "Everyday Work" },
                { fov: 65, label: "65° Cinematic", desc: "Portrait Stream" }
              ].map((opt) => (
                <button
                  key={opt.fov}
                  onClick={() => {
                    setSelectedFOV(opt.fov);
                    triggerSound('tick');
                    reactTo('hover-features', `Field of View set to ${opt.label}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedFOV === opt.fov
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-[#9EA3A6] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual FOV Preview Window */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#242629] flex items-center justify-center bg-black">
            <motion.div
              animate={{
                scale: selectedFOV === 65 ? 1.35 : selectedFOV === 78 ? 1.15 : 1
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img
                src="/assets/story_capture_emotions.jpg"
                alt="FOV demonstration"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Framing HUD Overlay */}
            <div className="absolute inset-6 border border-white/20 rounded-xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between text-xs font-mono text-[#D5FF83]">
                <span>FOV: {selectedFOV}°</span>
                <span>LOSSLESS 4K MATRIX CROP</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>SENSOR: SONY STARVIS 2</span>
                <span>NO FISHEYE WARP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Hardware Comparison Table */}
        <div className="bento-card p-6 sm:p-10 mb-20 overflow-x-auto">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#D5FF83] uppercase tracking-wider">Direct Architecture Benchmark</span>
            <h3 className="text-3xl font-extrabold text-white mt-1">Kimaro vs Conventional Solutions</h3>
          </div>

          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#222426] text-xs font-mono uppercase text-[#9EA3A6]">
                <th className="py-4 px-4">Hardware Component</th>
                <th className="py-4 px-4 text-[#D5FF83] font-bold">Kimaro K-1 Pro</th>
                <th className="py-4 px-4">Standard 4K Webcam</th>
                <th className="py-4 px-4">Mirrorless / DSLR Setup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1E20] text-xs sm:text-sm">
              {COMPARISON_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">{row.feature}</td>
                  <td className="py-4 px-4 font-bold text-[#D5FF83] bg-[#D5FF83]/5">{row.kimaro}</td>
                  <td className="py-4 px-4 text-[#9EA3A6]">{row.standard4k}</td>
                  <td className="py-4 px-4 text-[#9EA3A6]">{row.dslr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={openPreorder}
            onMouseEnter={() => reactTo('hover-buy')}
            className="btn-lime text-base px-8 py-4 shadow-2xl inline-flex items-center gap-2"
          >
            <span>Preorder Kimaro K-1 Pro • $250</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </main>
  );
}
