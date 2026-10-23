# KIMARO — Professional Webcam

> **Every detail in focus.**  
> A premium, interactive product experience and dynamic camera companion for the Kimaro K-1 Pro webcam.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://keerthanar5.github.io/kimaro-webcam/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14-pink.svg)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

**KIMARO** represents a new standard in broadcast optics and desktop hardware engineering. Built with a monolithic 6061-T6 aluminum chassis, 30mm Leica f/1.4 equivalent glass, and a 1-inch Sony STARVIS 2 CMOS sensor, the K-1 Pro bridges the divide between professional cinema cameras and desktop webcams.

This repository contains the official frontend web experience, featuring real-time hardware customization, dual-focus interactive optics demonstration, and an expressive, physics-driven camera companion.

---

## Key Experiences

### 1. The Interactive Camera Companion
- **Physics-Damped Eye Tracking**: The lens pupil smoothly tracks your cursor across the canvas using spring-based velocity damping.
- **Natural Expressions**: Automatic periodic blinking, focus adjustment micro-ticks, and expressive awake, happy, and sleep states.
- **Standby Sleep Mode**: Tap to toggle sleep state `(◡‿◡)` with animated floating particles, breathing chassis motion, and dim indigo status LED.
- **Synthesized Audio Feedback**: Pure Web Audio API synthesized mechanical shutter clicks and focal beeps without heavy external sound files.
- **Full Privacy Guarantee**: Visual-only interactive animation. Never accesses or requests permissions for your actual webcam or microphone.

### 2. Dual-Side Focus Experience
- Interactive split wipe and iris aperture comparison demonstrating the optical difference between traditional sensor noise and Kimaro's true f/1.4 optical depth.
- Neural eye-tracking reticle with real-time HUD telemetry (`[ REC ]`, focal length, aperture f/1.4, ISO, shutter speed).
- Multi-subject switcher: *Studio Executive*, *Live Emotion Streamer*, and *Macro Industrial Inspection*.

### 3. Studio Hardware Configurator
- Real-time surface finish selection with authentic studio renders:
  - **Matte Obsidian**: Stealth anodized black with micro-bead blast.
  - **Graphite Gray**: Industrial dark slate with cool gunmetal undertones.
  - **Soft Silver**: Diamond-milled raw aerospace aluminum.
  - **Cyber Edition**: Dark marbled texture with glowing neon lime chamfers.
- Modular mounting options: *Zero-Bezel Monitor Clamp*, *Solid Brass Desktop Pedestal*, and *Articulated Gas-Spring Desk Arm*.
- Studio accessories with live price accumulation and `localStorage` persistence.
- Sticky dual-pane layout ensuring the 3D camera preview stays directly in view during configuration.

### 4. Asymmetrical Bento Grid & Engineering Breakdown
- Exploded-view optical group teardown displaying the 7-element aspherical glass array.
- Interactive noise-isolation microphone tunnel with live frequency visualizer.
- Responsive 2x Matrix Pixel interactive sensor grid.

---

## Tech Stack & Architecture

- **Core Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Bespoke Kimaro Dark Design Tokens (`#0B0B0B`, `#222426`, `#D5FF83`)
- **Animation & Physics**: Framer Motion
- **Navigation**: React Router DOM (HashRouter for zero-config static hosting & GitHub Pages)
- **Audio Engine**: Native HTML5 Web Audio API frequency synthesis
- **Iconography**: Lucide React

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm / yarn

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/kimaro.git
cd kimaro

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:4000/` in your browser.

---

## Production Build & Deploy

### Building the Project
```bash
# Standard production build (output to /dist)
npm run build

# Standalone single-file HTML bundle (kimaro.html)
npm run build:html
```

### Deploying to GitHub Pages

This project is pre-configured with **GitHub Actions** for instant automated deployment:

1. Push this repository to GitHub on the `main` branch.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically build and publish your site!

---

## License

Designed and developed with precision. Licensed under the [MIT License](LICENSE).
