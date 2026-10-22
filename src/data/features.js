export const KEY_FEATURES = [
  {
    id: "smoothest-focus",
    badge: "AI HYBRID FOCUS",
    title: "Smoothest Focus. Like Never Before.",
    subtitle: "Instantaneous Phase-Detection with Real-time Neural Eye Tracking",
    description: "Kimaro continuously calculates 120 focal depth measurements per second. Bring a notebook, coffee mug, or technical blueprint inches to the lens, and watch the focus pull smoothly with zero hunting, jitter, or focus breathing.",
    metrics: [
      { label: "Focus Speed", value: "0.03s", caption: "Instantaneous lock" },
      { label: "Eye Detection", value: "100%", caption: "Even with glasses / backlight" },
      { label: "Min Distance", value: "5 cm", caption: "Macro product presentation" }
    ],
    accent: "#D5FF83"
  },
  {
    id: "dslr-optics",
    badge: "PRECISION GLASS",
    title: "Ultra Lenses. 30mm Leica Engineering.",
    subtitle: "Seven precision optical elements crafted for cinematic bokeh",
    description: "Unlike traditional webcams with plastic pinhole optics, Kimaro incorporates a true multi-element glass group with an f/1.4 aperture. Experience natural background separation, velvety optical blur, and immaculate edge-to-edge sharpness.",
    metrics: [
      { label: "Aperture", value: "f/1.4", caption: "4x more light transmission" },
      { label: "Optics", value: "7 Glass", caption: "2 ED Aspherical Elements" },
      { label: "Distortion", value: "< 0.2%", caption: "Zero fisheye warping" }
    ],
    accent: "#FFFFFF"
  },
  {
    id: "isolation-mic",
    badge: "STUDIO ACOUSTICS",
    title: "Dual Isolation Microphones.",
    subtitle: "Hardware neural acoustic chamber rejects keyboard clatter and room reflections",
    description: "Tuned for human vocal timbre, Kimaro uses directional beamforming paired with on-chip neural voice isolation. Mechanical switches, air conditioning hum, and room reverb are erased in real time without robotic artifacts.",
    metrics: [
      { label: "Polar Pattern", value: "Cardioid", caption: "Direct 60° voice cone" },
      { label: "Sampling", value: "48 kHz / 24-bit", caption: "Broadcast voice standard" },
      { label: "Noise Filter", value: "-38 dB", caption: "Background cancellation" }
    ],
    accent: "#D5FF83"
  },
  {
    id: "matrix-pixels",
    badge: "LARGE-FORMAT SENSOR",
    title: "2x Matrix Pixels with Sony STARVIS 2.",
    subtitle: "Massive 1-inch sensor area captures lifelike skin tones in dim rooms",
    description: "Standard webcams use tiny 1/4\" sensors that produce murky digital grain in ambient room lighting. Kimaro's custom 1\" sensor boasts 2.4 µm pixel size with quad-pixel binning, producing clean, luminescent image clarity in any environment.",
    metrics: [
      { label: "Sensor Size", value: "1.0-inch", caption: "350% larger than 4K webcams" },
      { label: "Pixel Pitch", value: "2.4 µm", caption: "Supercharged light gathering" },
      { label: "Dynamic Range", value: "14 Stops", caption: "No blown highlights" }
    ],
    accent: "#9EA3A6"
  },
  {
    id: "engineered-to-last",
    badge: "INDUSTRIAL CRAFTSMANSHIP",
    title: "Engineered to Last. CNC Aluminum Chassis.",
    subtitle: "An understated painted finish with precisely-machined aluminum specifically designed for you",
    description: "Carved from a solid 6061 billet of aerospace aluminum, the chassis acts as a structural passive heat sink. Zero fans. Zero vibration. An unyielding tactile object built to outlast your computer.",
    metrics: [
      { label: "Milled From", value: "Solid Billet", caption: "CNC precision to 0.01mm" },
      { label: "Finish", value: "Cerakote / Anodized", caption: "Scratch & smudge proof" },
      { label: "Acoustics", value: "0 dB Silent", caption: "Vapor chamber passive cool" }
    ],
    accent: "#FFFFFF"
  }
];

export const CAMERA_HOTSPOTS = [
  {
    id: "lens",
    x: 50,
    y: 52,
    title: "30mm Leica Multi-Coated Optics",
    tag: "OPTICAL CORE",
    description: "7 glass elements in 5 groups with hydrophobic nano-fluorine coating and dual anomalous dispersion glass to eliminate chromatic aberration.",
    specs: ["f/1.4 aperture", "Anti-reflective nano layer", "Physical iris ring"]
  },
  {
    id: "sensor",
    x: 52,
    y: 38,
    title: "1-Inch 4K STARVIS 2 Sensor",
    tag: "IMAGING ENGINE",
    description: "Massive back-illuminated sensor with 2x matrix pixel aggregation, yielding 14 stops of hardware dynamic range even in dark rooms.",
    specs: ["1\" optical format", "2.4µm pixel pitch", "Zero rolling shutter skew"]
  },
  {
    id: "mic",
    x: 32,
    y: 28,
    title: "Acoustic Isolation Mic Array",
    tag: "STUDIO AUDIO",
    description: "Twin MEMS cardioid capsules with acoustic phase tunnels and an onboard neural DSP that filters out typing, mouse clicks, and HVAC rumble.",
    specs: ["Dual beamforming", "48kHz/24-bit PCM", "-38dB noise suppression"]
  },
  {
    id: "chassis",
    x: 68,
    y: 24,
    title: "Unibody 6061-T6 Aluminum",
    tag: "PRECISION SHELL",
    description: "5-axis CNC machined from a solid aluminum billet, bead-blasted and hard-anodized for an indestructible, tactile matte finish.",
    specs: ["Aerospace alloy", "Passive thermal core", "Zero fan noise"]
  },
  {
    id: "mount",
    x: 50,
    y: 84,
    title: "Magnetic Zero-Jitter Mount",
    tag: "MOUNTING SYSTEM",
    description: "Industrial neodymium magnets coupled with an integrated 1/4\"-20 brass tripod receiver and a 360° fluid friction ball swivel.",
    specs: ["Neodymium N52 magnets", "Brass 1/4\"-20 thread", "Scratchless silicone foot"]
  }
];

export const FOCUS_DEMO_SUBJECTS = [
  {
    id: "man",
    name: "Studio Executive (Direct Eye Track)",
    tag: "4K STUDIO LIGHTING",
    image: "/assets/portrait_man_hires.webp",
    fallbackImage: "/assets/story_smoothest_focus.webp",
    headline: "SMOOTHEST FOCUS",
    subheadline: "Like never before",
    focalDistance: "0.82m",
    shutter: "1/250s",
    aperture: "f/1.4",
    iso: "100",
    faceBox: { top: "24%", left: "22%", width: "56%", height: "46%" }
  },
  {
    id: "woman",
    name: "Creative Live Streamer (Fast Motion)",
    tag: "LIVE EMOTIONS",
    image: "/assets/story_capture_emotions.jpg",
    fallbackImage: "/assets/reference_board2.jpg",
    headline: "CAPTURE EMOTIONS",
    subheadline: "Live Visuals",
    focalDistance: "0.64m",
    shutter: "1/500s",
    aperture: "f/1.4",
    iso: "160",
    faceBox: { top: "20%", left: "20%", width: "60%", height: "50%" }
  },
  {
    id: "macro",
    name: "Architectural Macro (Close-up)",
    tag: "PRECISION DETAIL",
    image: "/assets/craftsmanship_card.webp",
    fallbackImage: "/assets/product_hero_card.webp",
    headline: "MACRO RESOLUTION",
    subheadline: "Every fiber and texture",
    focalDistance: "0.12m",
    shutter: "1/160s",
    aperture: "f/2.8",
    iso: "200",
    faceBox: { top: "30%", left: "30%", width: "40%", height: "40%" }
  }
];

export const COMPARISON_TABLE = [
  {
    feature: "Optics & Lens",
    kimaro: "30mm Leica 7-Element Glass (f/1.4)",
    standard4k: "Single Plastic Lens Element (f/2.8)",
    dslr: "Heavy Interchangeable Glass Lens"
  },
  {
    feature: "Sensor Size",
    kimaro: "1.0\" Sony STARVIS 2 CMOS",
    standard4k: "1/2.8\" Tiny CMOS Sensor",
    dslr: "APS-C or Full Frame"
  },
  {
    feature: "Autofocus Speed",
    kimaro: "0.03s Neural Phase Detection",
    standard4k: "0.8s Contrast Hunting (Jittery)",
    dslr: "0.05s Dual Pixel AF"
  },
  {
    feature: "Form Factor & Setup",
    kimaro: "Compact 44mm Cube, Plug & Play USB-C",
    standard4k: "Plastic Bar Clamp, USB-A",
    dslr: "Bulky 1.5kg body, HDMI capture card, dummy battery"
  },
  {
    feature: "Audio System",
    kimaro: "Dual Beamforming + Neural DSP",
    standard4k: "Basic Omnidirectional Mic (Echoey)",
    dslr: "No usable onboard mic (requires external XLR)"
  },
  {
    feature: "Thermal Architecture",
    kimaro: "Silent Graphite Vapor Chamber",
    standard4k: "Overheats during long 4K calls",
    dslr: "30-min record limit or cooling fan noise"
  },
  {
    feature: "Price",
    kimaro: "$250 All-inclusive",
    standard4k: "$180 – $220",
    dslr: "$1,400+ with lens & capture card"
  }
];
