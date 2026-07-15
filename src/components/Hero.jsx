import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ANNOUNCEMENT_H = 36;
const NAV_H          = 72;
const OFFSET         = ANNOUNCEMENT_H + NAV_H; // ~108px

const projects = [
  { src: '/appkrl.png',      title: 'APP-KRL',    subtitle: 'Mobile & API',       tags: ['Flutter', 'Dart'] },
  { src: '/gameproject.png', title: 'Aetheria2D', subtitle: 'Game Development',   tags: ['Unity 2D', 'C#'] },
  { src: '/portoweb.png',    title: 'Portfolio',  subtitle: 'Web Development',     tags: ['React', 'Tailwind'] },
  { src: '/appkrl.png',      title: 'APP-KRL',    subtitle: 'Mobile & API',       tags: ['Flutter', 'Dart'] },
  { src: '/gameproject.png', title: 'Aetheria2D', subtitle: 'Game Development',   tags: ['Unity 2D', 'C#'] },
  { src: '/portoweb.png',    title: 'Portfolio',  subtitle: 'Web Development',     tags: ['React', 'Tailwind'] },
];

const galleryImages = [
  { src: '/appkrl.png',      alt: 'APP-KRL project' },
  { src: '/gameproject.png', alt: 'Aetheria2D game' },
  { src: '/portoweb.png',    alt: 'Portfolio web' },
  { src: '/appkrl.png',      alt: 'APP-KRL project' },
  { src: '/gameproject.png', alt: 'Aetheria2D game' },
  { src: '/portoweb.png',    alt: 'Portfolio web' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y      = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden">
      {/* ── Full-bleed hero painting ── */}
      <div className="relative min-h-[100svh] flex flex-col">
        {/* Painting background with parallax */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/hero-painting.png"
            alt="Hero artwork"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Headline text — norevo style, massive serif overlaid */}
        <motion.div
          className="relative z-10 flex-1 flex flex-col justify-end pb-16 md:pb-24"
          style={{ opacity, paddingTop: `${OFFSET}px` }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full">
            {/* Open badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] tracking-[3px] uppercase font-sans text-white/70">
                Available for opportunities
              </span>
            </motion.div>

            {/* Giant heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light text-white leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            >
              Building
              <br />
              <em className="italic">Digital</em>
              <br />
              Value
              <br />
              Every Day.
            </motion.h1>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#proyek"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-sm font-sans font-medium tracking-wide
                           bg-[#E4C7B8] text-[#56453f] border border-[#E4C7B8]
                           hover:bg-[#F0DCD2] hover:border-[#F0DCD2] transition-all duration-300"
              >
                Explore Work.
              </a>
              <a
                href="#kontak"
                className="text-sm font-sans text-white/80 hover:text-white transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white/80 tracking-wide"
              >
                Get in Touch →
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Text Marquee Bar (skills/disciplines) ── */}
      <div className="border-t border-border bg-[#EFE5D5] overflow-hidden py-3">
        <div className="whitespace-nowrap inline-block marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-block">
              {['FRONTEND DEVELOPMENT', 'MOBILE DEVELOPMENT', 'UI/UX DESIGN', 'AI ENGINEERING', 'FULLSTACK ARCHITECTURE', 'GAME DEVELOPMENT'].map((item) => (
                <span key={item} className="inline-block mx-8 text-[10px] tracking-[4px] uppercase text-brown-3 font-sans">
                  {item} <span className="mx-4 text-[#D0C7C3]">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Projects Marquee Strip ── */}
      <div className="bg-cream border-t border-border overflow-hidden relative">
        {/* Section label */}
        <div className="absolute top-0 left-0 z-10 px-6 md:px-10 py-3 flex items-center gap-3 pointer-events-none">
          <span className="inline-block w-5 h-px bg-brown-3/50" />
          <span className="text-[8px] tracking-[3px] uppercase font-sans text-brown-3/70">Featured Work</span>
        </div>

        {/* Project card marquee */}
        <div className="py-5 pt-8 overflow-hidden">
          <div className="flex gap-4 project-marquee" style={{ width: 'max-content' }}>
            {[...projects, ...projects].map((proj, i) => (
              <a
                key={i}
                href="#proyek"
                className="group flex-shrink-0 w-[240px] md:w-[280px] select-none"
                draggable="false"
              >
                {/* Outer stone frame */}
                <div
                  className="relative transition-all duration-500"
                  style={{
                    padding: '4px',
                    background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
                  }}
                >
                  {/* Inner inset border */}
                  <div style={{ padding: '3px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
                    {/* Canvas area */}
                    <div className="relative bg-cream overflow-hidden">
                      {/* Image */}
                      <div className="relative overflow-hidden h-[140px] md:h-[160px] bg-cream-3">
                        <img
                          src={proj.src}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                          draggable="false"
                        />
                        {/* Spotlight hover */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 169, 110, 0.18) 0%, transparent 70%)',
                          }}
                        />
                        {/* Category badge */}
                        <div
                          className="absolute top-2.5 right-2.5 text-[8px] tracking-[1.5px] uppercase px-2 py-0.5 font-sans border"
                          style={{
                            background: 'rgba(201, 169, 110, 0.12)',
                            borderColor: 'rgba(201, 169, 110, 0.3)',
                            color: '#C9A96E',
                          }}
                        >
                          {proj.subtitle}
                        </div>
                      </div>

                      {/* Info placard */}
                      <div className="px-3.5 py-3">
                        <p className="font-serif font-light text-brown text-base leading-tight mb-1.5">{proj.title}</p>
                        <div className="flex flex-wrap gap-1">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[8px] px-1.5 py-0.5 border border-border text-brown-3 bg-cream-3 font-sans tracking-wide"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Museum placard */}
                <div className="mt-1.5 text-center">
                  <p className="font-sans" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
                    {proj.subtitle} · Exhibit
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
