import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { playCameraShutter, playFocusBeep, playMechanicalTick } from '../utils/audioSynthesis';

const CompanionContext = createContext(null);

const DEFAULT_MESSAGES = [
  "Stay in focus.",
  "Capture your best moments.",
  "Every detail matters.",
  "Ready for your close-up?",
  "30mm Leica clarity locked.",
  "Ready to look sharper?",
  "1-inch sensor active.",
  "Looking sharp today!"
];

export const CompanionProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('kimaro_companion_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [minimized, setMinimized] = useState(() => {
    try {
      const saved = localStorage.getItem('kimaro_companion_minimized');
      return saved !== null ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('kimaro_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [companionState, setCompanionState] = useState('idle'); // idle | tracking | hovering | focusing | excited | sleeping
  const [speech, setSpeech] = useState(null);
  const [targetFocus, setTargetFocus] = useState(null); // { x, y, label }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, nx: 0, ny: 0 });

  const speechTimerRef = useRef(null);
  const stateResetTimerRef = useRef(null);

  // Save persistent preferences
  useEffect(() => {
    localStorage.setItem('kimaro_companion_enabled', JSON.stringify(enabled));
  }, [enabled]);

  useEffect(() => {
    localStorage.setItem('kimaro_companion_minimized', JSON.stringify(minimized));
  }, [minimized]);

  useEffect(() => {
    localStorage.setItem('kimaro_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Say a message with auto-fadeout
  const say = useCallback((text, duration = 3200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeech(text);
    if (duration > 0) {
      speechTimerRef.current = setTimeout(() => {
        setSpeech(null);
      }, duration);
    }
  }, []);

  // Play sound if enabled
  const triggerSound = useCallback((type) => {
    if (!soundEnabled) return;
    if (type === 'shutter') playCameraShutter();
    else if (type === 'focus') playFocusBeep();
    else if (type === 'tick') playMechanicalTick();
  }, [soundEnabled]);

  // Global mouse tracking with normalized coordinates (-1 to 1)
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nx = (e.clientX / window.innerWidth) * 2 - 1;
          const ny = (e.clientY / window.innerHeight) * 2 - 1;
          setMousePos({ x: e.clientX, y: e.clientY, nx, ny });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger contextual companion reactions
  const reactTo = useCallback((actionType, customMessage = null) => {
    if (!enabled || minimized) return;

    if (stateResetTimerRef.current) clearTimeout(stateResetTimerRef.current);

    switch (actionType) {
      case 'hover-buy':
        setCompanionState('excited');
        triggerSound('focus');
        say(customMessage || "Ready for your close-up?", 2800);
        break;

      case 'hover-features':
        setCompanionState('focusing');
        triggerSound('tick');
        say(customMessage || "30mm Leica clarity engaged.", 2400);
        break;

      case 'hover-product':
        setCompanionState('hovering');
        triggerSound('tick');
        break;

      case 'hover-customize':
        setCompanionState('focusing');
        triggerSound('tick');
        say(customMessage || "Fine-tuning your personal build.", 2500);
        break;

      case 'click-companion':
        setCompanionState('excited');
        triggerSound('shutter');
        const randomMsg = DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];
        say(randomMsg, 3000);
        break;

      case 'focus-demo-drag':
        setCompanionState('tracking');
        break;

      default:
        setCompanionState('idle');
    }

    stateResetTimerRef.current = setTimeout(() => {
      setCompanionState('idle');
    }, 3500);
  }, [enabled, minimized, say, triggerSound]);

  const value = {
    enabled,
    setEnabled,
    minimized,
    setMinimized,
    soundEnabled,
    setSoundEnabled,
    companionState,
    setCompanionState,
    speech,
    say,
    mousePos,
    targetFocus,
    setTargetFocus,
    reactTo,
    triggerSound
  };

  return (
    <CompanionContext.Provider value={value}>
      {children}
    </CompanionContext.Provider>
  );
};

export const useCompanion = () => {
  const context = useContext(CompanionContext);
  if (!context) {
    throw new Error('useCompanion must be used within a CompanionProvider');
  }
  return context;
};
