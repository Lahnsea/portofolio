import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onDone }) {
  const barRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-cream flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-start gap-4 w-52">
        {/* Logo */}
        <span className="font-serif text-2xl text-brown tracking-tight">FADLAN.</span>

        {/* Bar track */}
        <div className="w-full h-px bg-border relative overflow-hidden">
          <div className="loader-bar-fill absolute left-0 top-0 h-full bg-brown" />
        </div>

        {/* Label */}
        <span className="font-sans text-[10px] tracking-[4px] uppercase text-brown-3">
          Memuat portfolio…
        </span>
      </div>
    </motion.div>
  );
}
