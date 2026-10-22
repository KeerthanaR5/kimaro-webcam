import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../data/galleryData';
import { useCompanion } from '../context/CompanionContext';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GalleryPreview({ isFullPage = false }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const { reactTo, triggerSound } = useCompanion();

  const filteredItems = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev + 1) % filteredItems.length);
        triggerSound('tick');
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        triggerSound('tick');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredItems.length, triggerSound]);

  const categories = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'product', label: 'Product' },
    { id: 'portrait', label: 'Portraits & Live' },
    { id: 'craft', label: 'Craftsmanship' },
    { id: 'optics', label: 'Leica Glass' }
  ];

  return (
    <section className={`py-24 relative ${isFullPage ? 'min-h-screen pt-28' : 'bg-[#0B0B0B] border-t border-[#1C1E20]'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="status-dot-lime" />
              <span className="text-xs font-mono tracking-widest text-[#D5FF83] uppercase">Visual Anthology</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Optical Gallery<span className="text-[#D5FF83]">.</span>
            </h2>
            <p className="text-base text-[#9EA3A6] mt-2 max-w-xl">
              Authentic untouched frame grabs and studio photography illustrating true 1-inch sensor depth and precision Leica edge resolution.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#16181A] border border-[#222426]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedFilter(cat.id);
                  triggerSound('tick');
                  reactTo('hover-product', `Filter: ${cat.label}`);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedFilter === cat.id
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-[#9EA3A6] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => {
                setActiveItemIndex(idx);
                triggerSound('focus');
                reactTo('hover-product', item.title);
              }}
              className="bento-card group/item cursor-pointer overflow-hidden relative flex flex-col justify-end min-h-[340px]"
            >
              {/* Image asset */}
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
              />

              {/* Gradient Backdrop Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Top Exif Tag */}
              <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#D4D7D8]">
                {item.exif.lens} • {item.exif.shutter}
              </div>

              {/* Bottom Details Info */}
              <div className="p-6 relative z-10">
                <div className="text-xs font-mono text-[#D5FF83] uppercase tracking-wider mb-1">
                  {item.category}
                </div>
                <h3 className="text-lg font-bold text-white group-hover/item:text-[#D5FF83] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9EA3A6] mt-1 line-clamp-1">
                  {item.subtitle}
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-[#9EA3A6]">
                  <span>Click to expand</span>
                  <Maximize2 size={13} className="text-white group-hover/item:text-[#D5FF83]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!isFullPage && (
          <div className="mt-12 text-center">
            <Link to="/gallery" className="btn-secondary text-sm px-6 py-3">
              <span>View Complete Optical Archive (8 High-Res Studies)</span>
            </Link>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl">
            
            {/* Top Close Button */}
            <button
              onClick={() => setActiveItemIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => {
                setActiveItemIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                triggerSound('tick');
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={() => {
                setActiveItemIndex((prev) => (prev + 1) % filteredItems.length);
                triggerSound('tick');
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image & Exif Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full flex flex-col items-center select-none"
            >
              <div className="relative max-h-[70vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Metadata strip */}
              <div className="w-full mt-4 p-4 rounded-2xl bg-[#16181A] border border-[#222426] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{activeItem.title}</h3>
                  <p className="text-xs text-[#9EA3A6]">{activeItem.subtitle}</p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#D4D7D8]">
                  <span className="px-2.5 py-1 rounded-md bg-[#222426]">{activeItem.exif.lens}</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#222426]">{activeItem.exif.shutter}</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#222426]">ISO {activeItem.exif.iso}</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#D5FF83]/15 text-[#D5FF83]">{activeItem.exif.lighting}</span>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
