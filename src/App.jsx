import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CompanionProvider } from './context/CompanionContext';
import { ConfiguratorProvider } from './context/ConfiguratorContext';
import Navbar from './components/Navbar';
import CameraCompanion from './components/CameraCompanion';
import PreorderModal from './components/PreorderModal';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Technology from './pages/Technology';
import Customize from './pages/Customize';
import Gallery from './pages/Gallery';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Ambient interactive spotlight tracking the cursor across the dark studio canvas
function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPos({ x: e.clientX, y: e.clientY });
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-1 transition-opacity duration-300"
      style={{
        background: `radial-gradient(750px circle at ${pos.x}px ${pos.y}px, rgba(213, 255, 131, 0.09), transparent 55%)`
      }}
    />
  );
}

export default function App() {
  return (
    <Router>
      <ConfiguratorProvider>
        <CompanionProvider>
          <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col relative selection:bg-[#D5FF83] selection:text-black">
            <ScrollToTop />
            
            {/* Ambient cursor spotlight lighting */}
            <CursorSpotlight />

            {/* Main Navigation Bar */}
            <Navbar />

            {/* Application Page Routing */}
            <div className="flex-1 relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/customize" element={<Customize />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>

            {/* Interactive Mimo-Style Camera Companion */}
            <CameraCompanion />

            {/* Seamless Preorder Reservation Modal */}
            <PreorderModal />

            {/* Global Luxury Tech Footer */}
            <Footer />
          </div>
        </CompanionProvider>
      </ConfiguratorProvider>
    </Router>
  );
}
