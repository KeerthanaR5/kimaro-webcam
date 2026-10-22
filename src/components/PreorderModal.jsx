import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigurator } from '../context/ConfiguratorContext';
import { useCompanion } from '../context/CompanionContext';
import { X, CheckCircle2, ShieldCheck, Truck, Sparkles, ArrowRight, Camera } from 'lucide-react';

export default function PreorderModal() {
  const { isPreorderOpen, closePreorder, selectedFinish, selectedMount, selectedAccessories, totalPrice } = useConfigurator();
  const { triggerSound, reactTo } = useCompanion();

  const [step, setStep] = useState('summary'); // 'summary' | 'confirmed'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'United States'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isPreorderOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    triggerSound('shutter');
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
      reactTo('click-companion', "Order confirmed! Welcome to Kimaro.");
    }, 700);
  };

  const handleClose = () => {
    closePreorder();
    setTimeout(() => setStep('summary'), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        className="relative w-full max-w-xl rounded-3xl bg-[#141517] border border-[#26282B] shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9EA3A6] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        {step === 'summary' ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5FF83]/10 border border-[#D5FF83]/30 text-xs font-mono text-[#D5FF83] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5FF83] animate-pulse" />
                PRODUCTION BATCH 04 RESERVATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Reserve Your Kimaro K-1 Pro
              </h3>
              <p className="text-xs sm:text-sm text-[#9EA3A6] mt-1">
                Zero upfront deposit required. Lock in launch pricing with worldwide priority dispatch.
              </p>
            </div>

            {/* Selected Spec Overview Box */}
            <div className="p-4 rounded-2xl bg-[#0D0E0F] border border-[#222426] mb-6 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1E2023]">
                <span className="text-[#9EA3A6]">Finish Treatment:</span>
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedFinish.accent }} />
                  {selectedFinish.name}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1E2023]">
                <span className="text-[#9EA3A6]">Studio Mount:</span>
                <span className="font-semibold text-white">{selectedMount.name}</span>
              </div>

              {selectedAccessories.length > 0 && (
                <div className="flex items-start justify-between text-xs pb-2 border-b border-[#1E2023]">
                  <span className="text-[#9EA3A6]">Selected Add-ons:</span>
                  <div className="text-right">
                    {selectedAccessories.map((acc) => (
                      <div key={acc.id} className="text-white font-medium">
                        {acc.name} (+${acc.price})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-bold text-white">Guaranteed Launch Price:</span>
                <span className="text-xl font-extrabold text-[#D5FF83]">${totalPrice} USD</span>
              </div>
            </div>

            {/* Reservation Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-[#9EA3A6] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1C1E20] border border-[#2A2D30] text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D5FF83]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9EA3A6] uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1C1E20] border border-[#2A2D30] text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D5FF83]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9EA3A6] uppercase mb-1">Destination Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1C1E20] border border-[#2A2D30] text-sm text-white focus:outline-none focus:border-[#D5FF83]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="France">France</option>
                </select>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-[11px] text-[#9EA3A6] py-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#D5FF83]" />
                  2-Year Leica Care Warranty
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-[#D5FF83]" />
                  Free Express Carbon-Neutral Shipping
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-lime w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <span>Securing Production Slot...</span>
                ) : (
                  <>
                    <span>Confirm Priority Reservation</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center text-center">
            {/* Success Check Icon */}
            <div className="w-16 h-16 rounded-full bg-[#D5FF83]/20 border-2 border-[#D5FF83] flex items-center justify-center text-[#D5FF83] mb-4 shadow-[0_0_30px_rgba(213,255,131,0.4)]">
              <CheckCircle2 size={36} />
            </div>

            <span className="text-xs font-mono text-[#D5FF83] uppercase tracking-wider">Reservation Confirmed</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">Slot #KMR-04-8924 Secured</h3>
            <p className="text-sm text-[#9EA3A6] max-w-sm mb-6">
              Thank you, {formData.fullName || "Creator"}! An allocation confirmation with tracking details has been logged for <span className="text-white font-medium">{formData.email || "your address"}</span>.
            </p>

            <div className="p-4 rounded-xl bg-[#0D0E0F] border border-[#222426] w-full text-left text-xs font-mono text-[#D4D7D8] flex flex-col gap-1 mb-6">
              <div>• Product: Kimaro K-1 Pro ({selectedFinish.name})</div>
              <div>• Mount: {selectedMount.name}</div>
              <div>• Total Locked: ${totalPrice} USD (Pay on delivery)</div>
              <div>• Est. Delivery: Next Dispatch Wave</div>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary w-full py-3 text-sm font-semibold"
            >
              Back to Experience
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
