import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KIMARO_PRODUCT } from '../data/products';
import { useConfigurator } from '../context/ConfiguratorContext';
import { useCompanion } from '../context/CompanionContext';
import { Cpu, Layers, Thermometer, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Technology() {
  const { openPreorder } = useConfigurator();
  const { reactTo, triggerSound } = useCompanion();
  const [activeLayer, setActiveLayer] = useState('all');

  const teardownLayers = [
    {
      id: "optics",
      name: "Leica Optical Group",
      detail: "7 precision glass elements in 5 groups with 2 ED anomalous dispersion elements and hydrophobic nano-fluorine coating.",
      stats: "f/1.4 Physical Iris • <0.2% Distortion"
    },
    {
      id: "sensor",
      name: "Sony STARVIS 2 CMOS Sensor",
      detail: "1-inch back-illuminated matrix silicon with 2.4µm quad-pixel binning and 14 stops hardware dynamic range.",
      stats: "3840 × 2160 @ 60 FPS • Real-time HDR"
    },
    {
      id: "thermal",
      name: "Graphite Vapor Chamber",
      detail: "Custom capillary micro-wick sealed vapor chamber transferring heat directly into the monolithic CNC aluminum enclosure.",
      stats: "0 dB Complete Silence • Zero Throttling"
    },
    {
      id: "chassis",
      name: "CNC 6061 Aerospace Aluminum Billet",
      detail: "Milled from a single solid alloy billet on 5-axis CNC machines to 0.01mm tolerances, bead-blasted and hard-anodized.",
      stats: "182 Grams • Anti-Resonance Mass"
    }
  ];

  return (
    <main className="w-full pt-32 pb-24 bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16181A] border border-[#222426]">
            <span className="w-2 h-2 rounded-full bg-[#D5FF83] shadow-[0_0_8px_#D5FF83]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D5FF83]">Precision Engineering</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Anatomy of Perfection<span className="text-[#D5FF83]">.</span>
          </h1>

          <p className="text-lg text-[#9EA3A6] leading-relaxed">
            Kimaro rejects plastic lenses, thermal throttling, and artificial sharpening. An honest teardown of the world's most sophisticated webcam.
          </p>
        </div>

        {/* Exploded View / Teardown Stage */}
        <div className="bento-card p-8 sm:p-12 mb-20 bg-gradient-to-br from-[#16181A] via-[#111214] to-[#0A0B0B]">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono text-[#D5FF83] uppercase tracking-wider">Internal Architecture</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Multi-Layer Component Stack</h3>
            </div>

            {/* Layer selector */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0B0B0B] border border-[#222426]">
              {['all', 'optics', 'sensor', 'thermal', 'chassis'].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setActiveLayer(l);
                    triggerSound('tick');
                    reactTo('hover-features', `Layer: ${l}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all ${
                    activeLayer === l
                      ? 'bg-white text-black font-bold shadow'
                      : 'text-[#9EA3A6] hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl bg-[#08090A] border border-[#242629] flex items-center justify-center overflow-hidden">
              <img
                src="/assets/craftsmanship_card.webp"
                alt="Teardown architecture"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 text-xs font-mono text-[#D5FF83]">
                PRECISION 0.01MM TOLERANCE CNC MILLING
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              {teardownLayers.map((layer) => {
                const isActive = activeLayer === 'all' || activeLayer === layer.id;
                return (
                  <div
                    key={layer.id}
                    onClick={() => {
                      setActiveLayer(layer.id);
                      triggerSound('tick');
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1C1E20] border-[#D5FF83]/50 shadow-md'
                        : 'bg-[#121314] border-[#222426] opacity-40 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white">{layer.name}</h4>
                      <span className="text-[10px] font-mono text-[#D5FF83]">{layer.stats}</span>
                    </div>
                    <p className="text-xs text-[#9EA3A6] leading-relaxed">{layer.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Deep Dive Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          <div className="bento-card p-6 sm:p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1E20] border border-[#2F3235] text-[#D5FF83] flex items-center justify-center mb-6">
              <Thermometer size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Passive Vapor Chamber</h3>
            <p className="text-xs sm:text-sm text-[#9EA3A6] leading-relaxed">
              Standard webcams generate internal heat that degrades sensor quality and triggers micro-fans. Kimaro uses a sintered copper vapor chamber that transfers thermal energy to the aluminum shell silently.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1E20] border border-[#2F3235] text-white flex items-center justify-center mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Neural ISP Engine</h3>
            <p className="text-xs sm:text-sm text-[#9EA3A6] leading-relaxed">
              Equipped with a dedicated on-chip Image Signal Processor running real-time 3D noise reduction, dynamic tone mapping, and facial micro-contrast without taxing your host computer's CPU.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1E20] border border-[#2F3235] text-[#D5FF83] flex items-center justify-center mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Magnetic Quick-Lock</h3>
            <p className="text-xs sm:text-sm text-[#9EA3A6] leading-relaxed">
              Rare-earth N52 neodymium magnets pair with an integrated 1/4"-20 standard tripod thread and detachable braided USB-C 3.2 Gen 2 cable for instantaneous studio setup.
            </p>
          </div>

        </div>

        {/* Complete Verified Spec Sheet */}
        <div className="bento-card p-8 sm:p-12 mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#D5FF83] uppercase tracking-wider">Engineering Datasheet</span>
            <h3 className="text-3xl font-extrabold text-white mt-1">Kimaro K-1 Pro Technical Specifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs">
            <div>
              <h4 className="text-sm font-mono uppercase text-white pb-2 border-b border-[#222426] mb-3">Optics System</h4>
              <ul className="flex flex-col gap-2 text-[#9EA3A6]">
                <li><strong className="text-white">Focal Length:</strong> 30 mm Equivalent (Full Frame)</li>
                <li><strong className="text-white">Aperture:</strong> Physical f/1.4 High-Transmission</li>
                <li><strong className="text-white">Elements:</strong> 7 glass elements in 5 groups</li>
                <li><strong className="text-white">Coating:</strong> Nano-Fluorine Anti-Reflective</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-mono uppercase text-white pb-2 border-b border-[#222426] mb-3">Sensor Architecture</h4>
              <ul className="flex flex-col gap-2 text-[#9EA3A6]">
                <li><strong className="text-white">Sensor:</strong> 1-inch Sony STARVIS 2 CMOS</li>
                <li><strong className="text-white">Pixel Pitch:</strong> 2.4 µm Quad-Pixel Matrix</li>
                <li><strong className="text-white">Dynamic Range:</strong> 14 Stops Hardware HDR</li>
                <li><strong className="text-white">Modes:</strong> 4K @ 60 FPS / 1080p @ 120 FPS</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-mono uppercase text-white pb-2 border-b border-[#222426] mb-3">Acoustic & Enclosure</h4>
              <ul className="flex flex-col gap-2 text-[#9EA3A6]">
                <li><strong className="text-white">Microphone:</strong> Dual Beamforming Cardioid</li>
                <li><strong className="text-white">Suppression:</strong> -38 dB Neural Voice Isolation</li>
                <li><strong className="text-white">Material:</strong> Monolithic 6061-T6 Aluminum</li>
                <li><strong className="text-white">Weight:</strong> 182 grams (Camera unit)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
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
