import React, { createContext, useContext, useState, useEffect } from 'react';
import { KIMARO_PRODUCT } from '../data/products';

const ConfiguratorContext = createContext(null);

export const ConfiguratorProvider = ({ children }) => {
  const [selectedFinish, setSelectedFinish] = useState(() => {
    try {
      const saved = localStorage.getItem('kimaro_custom_finish');
      return saved ? JSON.parse(saved) : KIMARO_PRODUCT.finishes[0];
    } catch (e) {
      return KIMARO_PRODUCT.finishes[0];
    }
  });

  const [selectedMount, setSelectedMount] = useState(() => {
    try {
      const saved = localStorage.getItem('kimaro_custom_mount');
      return saved ? JSON.parse(saved) : KIMARO_PRODUCT.mountOptions[0];
    } catch (e) {
      return KIMARO_PRODUCT.mountOptions[0];
    }
  });

  const [selectedAccessories, setSelectedAccessories] = useState(() => {
    try {
      const saved = localStorage.getItem('kimaro_custom_accessories');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'isometric' | 'top'
  const [environment, setEnvironment] = useState('dark-studio'); // 'dark-studio' | 'slate-rock' | 'minimal-silver'
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('kimaro_custom_finish', JSON.stringify(selectedFinish));
  }, [selectedFinish]);

  useEffect(() => {
    localStorage.setItem('kimaro_custom_mount', JSON.stringify(selectedMount));
  }, [selectedMount]);

  useEffect(() => {
    localStorage.setItem('kimaro_custom_accessories', JSON.stringify(selectedAccessories));
  }, [selectedAccessories]);

  // Toggle accessory
  const toggleAccessory = (acc) => {
    setSelectedAccessories((prev) => {
      const exists = prev.some((item) => item.id === acc.id);
      if (exists) {
        return prev.filter((item) => item.id !== acc.id);
      } else {
        return [...prev, acc];
      }
    });
  };

  // Reset to default
  const resetConfig = () => {
    setSelectedFinish(KIMARO_PRODUCT.finishes[0]);
    setSelectedMount(KIMARO_PRODUCT.mountOptions[0]);
    setSelectedAccessories([]);
    setViewAngle('front');
    setEnvironment('dark-studio');
  };

  // Calculate total price
  const totalPrice =
    KIMARO_PRODUCT.basePrice +
    (selectedMount?.price || 0) +
    selectedAccessories.reduce((sum, item) => sum + item.price, 0);

  const value = {
    selectedFinish,
    setSelectedFinish,
    selectedMount,
    setSelectedMount,
    selectedAccessories,
    toggleAccessory,
    viewAngle,
    setViewAngle,
    environment,
    setEnvironment,
    totalPrice,
    resetConfig,
    isPreorderOpen,
    openPreorder: () => setIsPreorderOpen(true),
    closePreorder: () => setIsPreorderOpen(false)
  };

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
};
