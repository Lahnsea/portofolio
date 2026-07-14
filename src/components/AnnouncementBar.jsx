import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AnnouncementBar — renders a sticky bar at the very top.
 * Publishes its height to CSS :root via --announcement-h so Navbar can offset.
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--announcement-h', visible ? '36px' : '0px');
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 36, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[1002] bg-[#EFE5D5] border-b border-[#D0C7C3] overflow-hidden"
        >
          <div className="flex items-center justify-center h-[36px] px-10">
            <p className="text-[11px] tracking-[2.5px] uppercase font-sans text-[#857872] text-center">
              Open to Work.&nbsp;&nbsp;·&nbsp;&nbsp;Building the Future.&nbsp;&nbsp;·&nbsp;&nbsp;Every Day.
            </p>
            <button
              onClick={() => setVisible(false)}
              aria-label="Close announcement bar"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9f9896] hover:text-[#56453f] transition-colors duration-200 p-1"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
