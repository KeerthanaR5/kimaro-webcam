import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCompanion } from '../context/CompanionContext';
import { useConfigurator } from '../context/ConfiguratorContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { reactTo } = useCompanion();
  const { openPreorder, totalPrice } = useConfigurator();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features', reaction: 'hover-features' },
    { name: 'Technology', path: '/technology', reaction: 'hover-features' },
    { name: 'Customize', path: '/customize', reaction: 'hover-customize' },
    { name: 'Gallery', path: '/gallery', reaction: 'hover-product' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-[#222426] h-[72px] flex items-center shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-white text-decoration-none shrink-0"
          onMouseEnter={() => reactTo('hover-product', "Kimaro. Built to last.")}
        >
          {/* Logo Mark */}
          <div className="relative w-8 h-8 rounded-lg bg-[#16181A] border border-[#2A2D30] flex items-center justify-center group-hover:border-[#D5FF83] transition-colors">
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-none">
              <path d="M9 7V25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M23 8C23 8 16 12 12 16" stroke="#D5FF83" strokeWidth="3" strokeLinecap="round" />
              <path d="M13 16L23 24" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="23.5" cy="7.5" r="1.5" fill="#D5FF83" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-gradient-lime transition-all">
              Kimaro<span className="text-[#D5FF83]">.</span>
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141517] border border-[#26282B]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => link.reaction && reactTo(link.reaction)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'text-black bg-white font-semibold shadow-sm'
                    : 'text-[#9EA3A6] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Group */}
        <div className="hidden sm:flex items-center gap-3.5 shrink-0">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16181A] border border-[#222426] text-[11px] font-mono text-[#9EA3A6]">
            <span className="status-dot-lime" />
            <span className="text-[#D4D7D8]">4K • 60 FPS ACTIVE</span>
          </div>

          {/* Preorder / Buy Now CTA */}
          <button
            onClick={openPreorder}
            onMouseEnter={() => reactTo('hover-buy')}
            className="flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-[#D5FF83] hover:shadow-[0_0_25px_rgba(213,255,131,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Preorder</span>
            <span className="px-2 py-0.5 rounded-full bg-black/10 text-[11px] font-mono font-bold">
              ${totalPrice}
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-[#16181A] border border-[#222426] text-white hover:border-[#D5FF83] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[#0B0B0B]/98 backdrop-blur-2xl border-b border-[#222426] p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-[#9EA3A6] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#222426] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9EA3A6]">
              <span className="status-dot-lime" />
              <span>KIMARO K-1 PRO</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPreorder();
              }}
              className="btn-lime text-xs px-4 py-2"
            >
              Preorder • ${totalPrice}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
