import React from 'react';
import Hero from '../components/Hero';
import FocusDemo from '../components/FocusDemo';
import ProductBentoShowcase from '../components/ProductBentoShowcase';
import CameraConfigurator from '../components/CameraConfigurator';
import GalleryPreview from '../components/GalleryPreview';
import { useConfigurator } from '../context/ConfiguratorContext';
import { useCompanion } from '../context/CompanionContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const { openPreorder } = useConfigurator();
  const { reactTo } = useCompanion();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Focus Demo Section (Section C) */}
      <FocusDemo />

      {/* Product Bento & Craftsmanship (Sections D & E) */}
      <ProductBentoShowcase />

      {/* Interactive Camera Configurator (Section G) */}
      <CameraConfigurator isFullPage={false} />

      {/* Gallery Section (Section H) */}
      <GalleryPreview isFullPage={false} />

      {/* Section I: Final Product CTA — SEE THE DIFFERENCE */}
      <section className="py-24 bg-gradient-to-b from-[#0B0B0B] via-[#101214] to-[#070809] border-t border-[#1C1E20] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D5FF83]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16181A] border border-[#222426]">
            <span className="w-2 h-2 rounded-full bg-[#D5FF83] shadow-[0_0_8px_#D5FF83]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D5FF83]">The Benchmark</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            See The Difference<span className="text-[#D5FF83]">.</span>
          </h2>

          <p className="text-lg text-[#9EA3A6] max-w-xl mb-10 leading-relaxed">
            Eliminate blurry autofocus, digital pixel noise, and muffled audio. Bring true optical depth to every broadcast, meeting, and recording.
          </p>

          {/* Central Camera Silhouette Render */}
          <div className="relative w-72 sm:w-88 h-64 mb-8 flex items-center justify-center overflow-hidden rounded-2xl">
            <img
              src="/assets/kimaro_hero_cube.webp"
              alt="Kimaro Professional Webcam Final CTA"
              className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
              onMouseEnter={() => reactTo('hover-product', "Ready when you are.")}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openPreorder}
              onMouseEnter={() => reactTo('hover-buy', "Let's bring Kimaro to your desk.")}
              className="btn-lime text-base px-8 py-4 shadow-2xl flex items-center gap-2"
            >
              <span>Preorder From $250</span>
              <ArrowRight size={18} />
            </button>

            <Link
              to="/technology"
              onMouseEnter={() => reactTo('hover-features')}
              className="btn-secondary text-base px-8 py-4"
            >
              <span>Explore Technology</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs font-mono text-[#9EA3A6]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#D5FF83]" /> 30-Day Optical Guarantee
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#D5FF83]" /> 2-Year Full Hardware Care
            </span>
          </div>

        </div>
      </section>
    </main>
  );
}
