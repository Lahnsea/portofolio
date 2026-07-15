import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#tentang',     label: 'About' },
  { href: '#keahlian',   label: 'Skills' },
  { href: '#proyek',     label: 'Projects' },
  { href: '#sertifikat', label: 'Certs' },
  { href: '#perjalanan', label: 'Journey' },
  { href: '#kontak',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-border shadow-[0_2px_20px_rgba(86,69,63,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ top: 'var(--announcement-h, 36px)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[60px] md:h-[72px] grid grid-cols-3 items-center">

        {/* Left — Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.slice(0, 3).map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11px] tracking-[2px] uppercase font-sans text-brown-2 hover:text-brown transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger (left on mobile) */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 col-start-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-brown transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-4 h-px bg-brown transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-brown transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>

        {/* Center — Logo */}
        <div className="flex justify-center col-start-2">
          <a
            href="#"
            className="font-serif text-lg md:text-xl text-brown tracking-[0.05em] hover:text-brown-2 transition-colors duration-200"
          >
            FADLAN.
          </a>
        </div>

        {/* Right — CTA + extras */}
        <div className="hidden md:flex items-center justify-end gap-8">
          {links.slice(3).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[2px] uppercase font-sans text-brown-2 hover:text-brown transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="text-[11px] tracking-[2px] uppercase font-sans text-brown-2 hover:text-brown transition-colors duration-200 border-b border-border-2 pb-px"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-cream border-t border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-sans text-brown hover:text-brown-2 transition-colors tracking-wide"
                >
                  {l.label}
                </a>
              ))}
              <a href="#kontak" onClick={() => setMenuOpen(false)} className="btn-primary self-start mt-2 text-xs">
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
