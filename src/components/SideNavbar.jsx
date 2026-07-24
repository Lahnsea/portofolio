import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#tentang',     label: 'About' },
  { href: '#showcase',   label: 'Portfolio' },
  { href: '#perjalanan', label: 'Journey' },
  { href: '#kontak',     label: 'Contact' },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function SideNavbar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Listen to close-sidenav event from chatbot
  useEffect(() => {
    const handleClose = () => setOpen(false);
    window.addEventListener('close-sidenav', handleClose);
    return () => window.removeEventListener('close-sidenav', handleClose);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
    // Automatically close the chatbot and profile card when menu is opened
    window.dispatchEvent(new CustomEvent('close-chatbot'));
    window.dispatchEvent(new CustomEvent('close-profilecard'));
  };

  return (
    <>
      {/* ── Trigger button — fixed on left edge ── */}
      <motion.button
        id="side-nav-trigger"
        aria-label="Open menu"
        onClick={handleOpen}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[900] flex flex-col items-center justify-center gap-[4px] w-10 h-14 bg-cream border border-border border-l-0 rounded-r-sm shadow-[2px_0_16px_rgba(86,69,63,0.08)] hover:bg-cream-2 transition-colors duration-300"
      >
        <span className="block w-5 h-px bg-brown" />
        <span className="block w-3 h-px bg-brown ml-[-8px]" />
        <span className="block w-5 h-px bg-brown" />
      </motion.button>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="side-backdrop"
            aria-hidden="true"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1100] bg-brown/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* ── Drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="side-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 h-full z-[1200] flex"
            style={{ width: 'min(420px, 90vw)' }}
          >
            {/* Narrow accent strip */}
            <div className="w-1 h-full bg-gradient-to-b from-[#e0d0c8] via-[#c9b4ac] to-[#e0d0c8] flex-shrink-0" />

            {/* Main panel */}
            <div className="flex-1 bg-[#f5f0ec] flex flex-col overflow-y-auto relative">

              {/* Close button */}
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-border rounded-sm text-brown-2 hover:text-brown hover:border-border-2 hover:bg-cream-2 transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Brand */}
              <div className="px-10 pt-12 pb-0">
                <a
                  href="#"
                  onClick={handleLinkClick}
                  className="font-serif text-xl text-brown tracking-[0.05em] hover:text-brown-2 transition-colors duration-200"
                >
                  FADLAN.
                </a>
                <p className="font-sans text-[11px] tracking-[2px] uppercase text-brown-3 mt-1">
                  Portfolio
                </p>
              </div>

              {/* Divider */}
              <div className="mx-10 mt-8 h-px bg-border" />

              {/* Big primary links */}
              <nav className="px-10 pt-8 flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex items-center overflow-hidden py-2"
                  >
                    {/* Hover underline fill */}
                    <span
                      className="absolute left-0 bottom-0 h-px bg-border-2 transition-all duration-500"
                      style={{ width: hovered === i ? '100%' : '0%' }}
                    />

                    {/* Index number */}
                    <span className="font-sans text-[10px] tracking-[2px] text-brown-3 mr-4 w-4 text-right flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Label */}
                    <span
                      className="font-serif text-4xl leading-none tracking-tight text-brown group-hover:text-brown-2 transition-colors duration-300"
                      style={{ fontWeight: 300 }}
                    >
                      {link.label}
                    </span>

                    {/* Arrow */}
                    <span
                      className="ml-auto text-brown-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Divider */}
              <div className="mx-10 h-px bg-border" />

              {/* Footer — socials + CTA */}
              <div className="px-10 py-8 flex items-center justify-between">
                {/* Social icons */}
                <div className="flex items-center gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-brown-3 hover:text-brown transition-colors duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>

                {/* Get in touch CTA */}
                <a
                  href="#kontak"
                  onClick={handleLinkClick}
                  className="btn-primary text-xs py-2 px-5"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
