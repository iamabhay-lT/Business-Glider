'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '918979393003';
  const message = "Hello, I’d like to inquire about job opportunities.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div 
      className="fixed right-6 bottom-6 z-[100] flex items-center justify-end pointer-events-none"
      style={{ position: 'fixed', right: '24px', bottom: '24px', zIndex: 100 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mr-3 pointer-events-none select-none"
          >
            <div className="bg-[#0f172a]/90 backdrop-blur-md text-white text-xs md:text-[13px] font-medium px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-white/15 whitespace-nowrap">
              Ask About Jobs
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ask About Jobs on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0.85, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto flex items-center justify-center w-[54px] h-[54px] md:w-[58px] md:h-[58px] rounded-full bg-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] border border-white/40 backdrop-blur-sm transition-all duration-300 cursor-pointer select-none group"
      >
        <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
          <IconBrandWhatsapp className="w-full h-full text-white" stroke={2.2} />
        </div>
      </motion.a>
    </div>
  );
}






