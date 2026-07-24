import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Profile data ─── */
const PROFILE = {
  name:     'Fadlansyahrulloh Ajib',
  initials: 'F',
  title:    'Full-Stack Developer & UI/UX Enthusiast',
  location: 'Indonesia 🇮🇩',
  status:   'Open to Work',
  bio:      'Developer muda yang passionate dalam menciptakan pengalaman digital yang elegan, fungsional, dan berperforma tinggi.',
  quote:    '"Turning ideas into clean, modern, and meaningful digital experiences."',
  links: [
    { label: 'Email',     href: 'mailto:fadlansyahrullohajib@gmail.com', value: 'fadlansyahrullohajib@gmail.com' },
    { label: 'GitHub',    href: 'https://github.com/Lahnsea',            value: 'github.com/Lahnsea' },
  ],
  skills: ['React', 'Flutter', 'Unity 2D', 'UI/UX', 'JavaScript', 'Tailwind'],
  stats: [
    { num: '3+', label: 'Projects' },
    { num: '7+', label: 'Skills'   },
    { num: '3yr', label: 'Learning' },
  ],
};

export default function ProfileCard() {
  const [open, setOpen] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Listen to close-chatbot: also close this if chatbot opens */
  useEffect(() => {
    const handleChatClose = () => setOpen(false);
    window.addEventListener('close-profilecard', handleChatClose);
    return () => window.removeEventListener('close-profilecard', handleChatClose);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    /* Dispatch event so SideNavbar and ChatbotNav can close themselves */
    window.dispatchEvent(new CustomEvent('close-chatbot'));
    window.dispatchEvent(new CustomEvent('close-sidenav'));
  };

  return (
    <>
      {/* ── Trigger button — fixed on left, below the menu toggle ── */}
      <motion.button
        id="profile-card-trigger"
        aria-label="View Profile Card"
        onClick={open ? () => setOpen(false) : handleOpen}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 z-[900] flex flex-col items-center justify-center gap-1 w-10 h-14 bg-cream border border-border border-l-0 rounded-r-sm shadow-[2px_0_16px_rgba(86,69,63,0.08)] hover:bg-cream-2 transition-colors duration-300"
        style={{ top: 'calc(50% + 60px)' }}   /* 60px below the menu button */
        title="My Profile"
      >
        {/* Mini ID card icon */}
        <div
          className="w-5 h-6 rounded-[1.5px] border flex flex-col items-center justify-start overflow-hidden"
          style={{ borderColor: '#A8A09C', background: 'linear-gradient(180deg, #EDEAE5, #FAF9F6)' }}
        >
          {/* Photo area */}
          <div className="w-full flex-1 flex items-center justify-center" style={{ background: '#D8D3CE' }}>
            <svg className="w-2.5 h-2.5" fill="currentColor" style={{ color: '#9A9390' }} viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          {/* Line rows */}
          <div className="px-[2px] py-[1.5px] w-full flex flex-col gap-[1px]">
            <div className="h-[1px] rounded-full" style={{ background: '#A8A09C' }} />
            <div className="h-[1px] rounded-full w-3/4" style={{ background: '#C8C2BC' }} />
          </div>
        </div>
        {/* Small label */}
        <span className="font-sans text-[5.5px] tracking-[1px] uppercase" style={{ color: '#9A9390' }}>
          ID
        </span>
      </motion.button>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="profile-backdrop"
            aria-hidden="true"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[1100] bg-brown/15 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* ── Profile Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="profile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Profile Card"
            initial={{ x: '-110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-110%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 h-full z-[1200] flex"
            style={{ width: 'min(360px, 90vw)' }}
          >
            {/* Accent left strip */}
            <div className="w-1 h-full flex-shrink-0 bg-gradient-to-b from-[#e0d0c8] via-[#C9A96E] to-[#e0d0c8]" />

            {/* Main panel */}
            <div
              className="flex-1 flex flex-col overflow-y-auto relative"
              style={{ background: '#F5F0EC' }}
            >
              {/* Close button */}
              <button
                aria-label="Close profile"
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border border-border rounded-sm text-brown-2 hover:text-brown hover:border-border-2 hover:bg-cream-2 transition-all duration-200 z-10"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="13" y1="1" x2="1"  y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="px-8 pt-10 pb-8 flex flex-col gap-7">

                {/* ── Museum outer frame card ── */}
                <div
                  style={{
                    padding: '5px',
                    background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
                  }}
                >
                  <div style={{ padding: '4px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
                    <div style={{ background: '#FAF9F6' }}>

                      {/* Photo / avatar area */}
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          height: '160px',
                          background: 'radial-gradient(ellipse at 50% 30%, #EDEAE5 0%, #D8D3CE 100%)',
                          borderBottom: '1px solid #D8D3CE',
                        }}
                      >
                        <div
                          className="relative overflow-hidden"
                          style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            border: '4px solid #E6E2DC',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            background: '#EDEAE5',
                          }}
                        >
                          <img
                            src="/foto.jpg"
                            alt="Fadlan"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          {/* Monogram fallback */}
                          <div
                            className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-light"
                            style={{ color: '#56453f' }}
                          >
                            {PROFILE.initials}
                          </div>
                        </div>
                        {/* Spotlight */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(ellipse 60% 50% at 50% 10%, rgba(255,255,255,0.25) 0%, transparent 70%)',
                          }}
                        />
                        {/* Status badge */}
                        <div
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-sm border"
                          style={{ background: '#FAF9F6', borderColor: '#D8D3CE' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="font-sans text-[7px] tracking-[2px] uppercase" style={{ color: '#6B6460' }}>
                            {PROFILE.status}
                          </span>
                        </div>
                      </div>

                      {/* Name + title */}
                      <div className="px-5 py-4 text-center border-b border-[#EDEAE5]">
                        <h2 className="font-serif font-light text-xl text-brown leading-tight mb-1">
                          {PROFILE.name}
                        </h2>
                        <p className="font-sans text-[9px] tracking-[2px] uppercase text-brown-3">
                          {PROFILE.title}
                        </p>
                        <p className="font-sans text-[8px] tracking-[1.5px] uppercase text-brown-3 mt-1 opacity-60">
                          {PROFILE.location}
                        </p>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 divide-x divide-[#EDEAE5] border-b border-[#EDEAE5]">
                        {PROFILE.stats.map((s) => (
                          <div key={s.label} className="py-3 flex flex-col items-center gap-0.5">
                            <span className="font-serif text-xl font-light text-brown">{s.num}</span>
                            <span className="font-sans text-[7px] tracking-[1.5px] uppercase text-brown-3">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Barcode strip */}
                      <div className="px-5 py-3 flex items-center justify-center border-b border-[#EDEAE5]">
                        <div className="flex gap-[1.5px]">
                          {Array.from({ length: 26 }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: i % 3 === 0 ? '2px' : '1px',
                                height: '18px',
                                background: '#2C2825',
                                opacity: 0.55 + (i % 5) * 0.06,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Exhibit label */}
                      <div className="px-5 py-2 text-center">
                        <p className="font-sans" style={{ fontSize: '6.5px', letterSpacing: '2px', color: '#9A9390', textTransform: 'uppercase' }}>
                          Identity · Portfolio ID
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Bio ── */}
                <div>
                  <p className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3 mb-3 flex items-center gap-2">
                    <span className="inline-block w-4 h-px bg-[#A8A09C]" />
                    About
                  </p>
                  <p className="text-sm font-sans text-brown-2 leading-relaxed font-light">
                    {PROFILE.bio}
                  </p>
                  {/* Quote */}
                  <div className="border-l-2 pl-4 mt-4" style={{ borderColor: '#C9A96E' }}>
                    <p className="font-serif italic font-light text-brown text-sm leading-relaxed">
                      {PROFILE.quote}
                    </p>
                  </div>
                </div>

                {/* ── Skills chips ── */}
                <div>
                  <p className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3 mb-3 flex items-center gap-2">
                    <span className="inline-block w-4 h-px bg-[#A8A09C]" />
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROFILE.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] tracking-[1.5px] uppercase font-sans px-3 py-1.5 border"
                        style={{ background: '#FAF9F6', borderColor: '#D8D3CE', color: '#6B6460' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Contact links ── */}
                <div>
                  <p className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3 mb-3 flex items-center gap-2">
                    <span className="inline-block w-4 h-px bg-[#A8A09C]" />
                    Contact
                  </p>
                  <div className="flex flex-col divide-y" style={{ borderColor: '#E8E2DC' }}>
                    {PROFILE.links.map(({ label, value, href }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-3 hover:pl-1 transition-all duration-300"
                      >
                        <span className="text-[8px] tracking-[2px] uppercase font-sans text-brown-3 min-w-[50px]">{label}</span>
                        <span className="text-[10px] font-sans text-brown group-hover:text-brown-2 transition-colors truncate flex-1 text-right ml-3">
                          {value}
                        </span>
                        <span className="ml-2 text-brown-3 group-hover:text-brown group-hover:translate-x-0.5 transition-all duration-300">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* ── CTA buttons ── */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href="#tentang"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-sans font-medium tracking-wider uppercase rounded-sm transition-all duration-300 bg-brown text-cream border border-brown hover:bg-brown-2 hover:border-brown-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Full About
                  </a>
                  <a
                    href="/cv-fadlan.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-sans font-medium tracking-wider uppercase rounded-sm transition-all duration-300 bg-transparent text-brown border border-border hover:border-border-2 hover:bg-cream-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download CV
                  </a>
                </div>

              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
