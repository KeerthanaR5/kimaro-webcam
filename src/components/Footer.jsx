import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Camera, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';
import { useCompanion } from '../context/CompanionContext';
import { useConfigurator } from '../context/ConfiguratorContext';

export default function Footer() {
  const { reactTo } = useCompanion();
  const { openPreorder } = useConfigurator();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070809] border-t border-[#1C1E20] text-[#9EA3A6] relative overflow-hidden">
      
      {/* Top Banner: Try Innovative Kimaro Web Camera (Matches banner in Reference Image 2) */}
      <div className="border-b border-[#1C1E20] py-12 px-6 sm:px-8 relative bg-gradient-to-r from-[#0E140D] via-[#090A0B] to-[#0A120E] overflow-hidden">
        {/* Subtle Vortex Ring Ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#D5FF83]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            {/* Vortex Optical Graphic */}
            <div className="relative w-20 h-20 rounded-full border-2 border-[#D5FF83]/40 p-1 flex items-center justify-center shrink-0">
              <img
                src="/assets/banner_vortex.jpg"
                alt="Kimaro Optical Vortex"
                className="w-full h-full object-cover rounded-full filter contrast-125"
              />
              <div className="absolute inset-0 rounded-full border border-[#D5FF83] animate-[spin_12s_linear_infinite]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="bracket-tag">
                  <span className="text-[#D5FF83]">[</span> CUSTOM <span className="text-[#D5FF83]">]</span>
                </span>
                <span className="text-xs font-mono text-white/50">kimarocam.com</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                TRY INNOVATIVE KIMARO WEB CAMERA
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/customize"
              onMouseEnter={() => reactTo('hover-customize')}
              className="btn-lime text-xs sm:text-sm px-6 py-3"
            >
              <span>Build Custom Edition</span>
            </Link>
            <button
              onClick={openPreorder}
              onMouseEnter={() => reactTo('hover-buy')}
              className="btn-primary text-xs sm:text-sm px-6 py-3"
            >
              <span>Preorder $250</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-white mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#16181A] border border-[#2F3235] flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-none">
                  <path d="M9 7V25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <path d="M23 8C23 8 16 12 12 16" stroke="#D5FF83" strokeWidth="3" strokeLinecap="round" />
                  <path d="M13 16L23 24" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Kimaro.</span>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed max-w-sm mb-6 text-[#9EA3A6]">
              Redefining optical fidelity for video communication. Uncompromising 30mm Leica glass, 1-inch Sony STARVIS 2 sensor, and unibody aerospace aluminum engineering.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121314] border border-[#222426] text-[#D5FF83]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5FF83] animate-pulse" />
                Global Systems Normal
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Overview</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">Key Features</Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-white transition-colors">Technology & Teardown</Link>
              </li>
              <li>
                <Link to="/customize" className="hover:text-white transition-colors">Camera Configurator</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">Optical Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specifications */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">Hardware Specs</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#9EA3A6]">
              <li>30mm f/1.4 Leica Multi-Coated</li>
              <li>1.0" Sony STARVIS 2 CMOS</li>
              <li>4K @ 60 FPS HDR / 1080p @ 120 FPS</li>
              <li>Dual Acoustic Isolation Mic</li>
              <li>Unibody 6061-T6 Aluminum</li>
              <li>Passive Vapor Heat Sink</li>
            </ul>
          </div>

          {/* Col 4: Preorder & Support */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">Production</h4>
            <div className="p-4 rounded-2xl bg-[#121314] border border-[#222426] text-xs flex flex-col gap-3">
              <div className="text-white font-semibold">Production Wave 04</div>
              <p className="text-[11px] text-[#9EA3A6] leading-snug">
                Units individually calibrated and laser-inspected in Wetzlar & Tokyo.
              </p>
              <button
                onClick={openPreorder}
                className="btn-lime text-xs py-2 w-full text-center"
              >
                Secure Allocation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-12 mt-12 border-t border-[#1A1C1E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          <div>
            © {new Date().getFullYear()} KIMARO OPTICAL SYSTEMS INC. All rights reserved. Designed for precision creators.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#9EA3A6] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
