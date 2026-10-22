export const KIMARO_PRODUCT = {
  name: "Kimaro",
  model: "K-1 Pro",
  tagline: "Professional Webcam",
  heroHeading: "EVERY DETAIL IN FOCUS.",
  heroSubheading: "Engineered with 30mm Leica optics, 1-inch ultra-low noise sensor, and neural isolation audio. The first genuine DSLR-class optical system designed for modern creators.",
  basePrice: 250,
  currency: "$",
  status: "In Production • Batch 04 Shipping",
  rating: 4.98,
  reviewCount: 1420,
  highlights: [
    { label: "Ultra Lenses", value: "30 mm Leica", detail: "f/1.4 Aspherical 7-Element Glass" },
    { label: "DSLR Quality", value: "1-Inch Sensor", detail: "Sony STARVIS 2 with 2x Matrix Pixels" },
    { label: "Studio Audio", value: "Isolation Mic", detail: "Neural Beamforming Noise Cancellation" },
    { label: "Frame Rate", value: "4K 60 / 1080p 120", detail: "True 14-Stop Hardware HDR" }
  ],
  finishes: [
    {
      id: "matte-obsidian",
      name: "Matte Obsidian",
      hex: "#0B0B0B",
      accent: "#222426",
      metalSheen: "linear-gradient(135deg, #1f2022 0%, #0b0b0b 50%, #161718 100%)",
      description: "Deep stealth anodized black with micro-bead blast texture and zero glare.",
      image: "/assets/finish_matte_obsidian.webp"
    },
    {
      id: "graphite-gray",
      name: "Graphite Gray",
      hex: "#222426",
      accent: "#666666",
      metalSheen: "linear-gradient(135deg, #383b3e 0%, #222426 50%, #2f3235 100%)",
      description: "Industrial dark slate with cool gunmetal undertones and laser etched serials.",
      image: "/assets/finish_graphite_gray.webp"
    },
    {
      id: "soft-silver",
      name: "Soft Silver",
      hex: "#D4D7D8",
      accent: "#9EA3A6",
      metalSheen: "linear-gradient(135deg, #f0f2f3 0%, #d4d7d8 50%, #b8bcbe 100%)",
      description: "Precision diamond-milled raw aerospace aluminum with satin protective coat.",
      image: "/assets/finish_soft_silver.webp"
    },
    {
      id: "cyber-lime",
      name: "Cyber Edition",
      hex: "#0F1110",
      accent: "#D5FF83",
      metalSheen: "linear-gradient(135deg, #182012 0%, #0a0e08 50%, #1a2215 100%)",
      description: "Limited collector run with signature Kimaro Neon Lime chamfers and iris ring.",
      image: "/assets/finish_cyber_edition.webp"
    }
  ],
  mountOptions: [
    { id: "magnetic-monitor", name: "Magnetic Zero-Bezel Monitor Clamp", price: 0, desc: "Snaps firmly to any curved or flat display with rubberized zero-scratch pads." },
    { id: "desktop-stand", name: "Heavy Solid-Brass Desktop Stand", price: 45, desc: "Counterweighted 680g CNC machined pedestal for studio desks and low angles." },
    { id: "studio-arm", name: "Low-Profile Articulated Desk Arm", price: 79, desc: "Gas-spring 360° fluid swivel arm with internal cable channels." }
  ],
  accessories: [
    { id: "magnetic-privacy-cap", name: "Magnetic Precision Privacy Cap", price: 20, desc: "CNC aluminum snap-on cover with physical lens blackout." },
    { id: "braided-cable-lime", name: "3M Braided Neon Lime USB-C Cable", price: 25, desc: "Ultra-flexible 10Gbps USB 3.2 Gen 2 cable with gold contacts." },
    { id: "hard-travel-case", name: "Molded EVA Ballistic Travel Case", price: 35, desc: "Weatherproof case tailored for camera, stand, and cables." }
  ],
  specs: {
    optics: {
      focalLength: "30 mm Equivalent (Full Frame)",
      aperture: "Physical f/1.4 Fixed High-Throughput Iris",
      construction: "7 glass elements in 5 groups including 2 ED glass elements",
      fieldOfView: "90° diagonal / 82° horizontal (software crop-switchable to 78° & 65°)",
      coating: "Multi-layer Nano Anti-Reflective Fluorine hydrophobic coating"
    },
    sensor: {
      type: "1-inch Back-Illuminated CMOS (Sony STARVIS 2)",
      pixelSize: "2.4 µm quad-bayer photosites with 2x Matrix Pixel binning",
      shutterType: "Zero-distortion electronic global reset rolling shutter (1/10000s to 1/25s)",
      hdr: "Staggered 3-exposure hardware HDR in real-time"
    },
    video: {
      modes: "4K @ 60/50/30/24 fps, 1440p @ 60 fps, 1080p @ 120/60/30 fps",
      codecs: "Uncompressed NV12, YUY2, MJPEG, H.264 / H.265 hardware enc",
      colorDepth: "10-bit 4:2:2 D-Log and Rec.709 color profiles",
      focusSystem: "Dual-Pixel Phase Detection AF + Neural Subject & Eye Tracking"
    },
    audio: {
      type: "Dual-capsule studio condenser microphone array",
      pickupPattern: "Directional beamforming cardioid with 120° acoustic barrier",
      frequencyResponse: "20 Hz – 20,000 Hz",
      snr: "74 dB Signal-to-Noise Ratio",
      dsp: "Hardware deep-neural network background fan & echo cancellation"
    },
    build: {
      chassis: "Unibody 6061-T6 Aircraft Grade Aluminum Block",
      dimensions: "44 mm × 44 mm × 58 mm (1.73 in × 1.73 in × 2.28 in)",
      weight: "182 grams (Camera unit)",
      thermal: "Internal graphite vapor chamber + passive convection cooling (zero fan noise)",
      cable: "2.0 m detachable braided USB-C 3.2 Gen 2 (10 Gbps)"
    }
  }
};
