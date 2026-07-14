import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

const stats = [
  { num: '3+',  label: 'Projects Done' },
  { num: '7+',  label: 'Technologies' },
  { num: '3yr', label: 'Of Learning' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tentang" className="bg-cream border-t border-border">
      {/* ── Top editorial banner: "Own 100+ Projects" style ── */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left — Large portrait with floating frame */}
            <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
              {/* Offset border frame (norevo style) */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-border rounded-sm z-0" />
              <div className="relative z-10 overflow-hidden rounded-sm bg-[#EFE5D5] aspect-[3/4] max-h-[600px] flex flex-col items-center justify-center p-6 border border-dashed border-[#D0C7C3]">
                <svg className="w-12 h-12 text-[#9f9896] mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3 text-center">Artwork Space</span>
              </div>
              {/* Floating caption */}
              <div className="absolute -bottom-6 -left-6 bg-cream border border-border px-5 py-4 rounded-sm shadow-[0_8px_32px_rgba(86,69,63,0.08)] z-20">
                <div className="font-serif text-3xl font-light text-brown">3+</div>
                <div className="text-[9px] tracking-[2px] uppercase text-brown-3 mt-1">Years of Learning</div>
              </div>
            </motion.div>

            {/* Right — Editorial text */}
            <div className="order-1 lg:order-2 flex flex-col gap-8">
              <motion.div variants={fadeUp}>
                <p className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
                  <span className="inline-block w-8 h-px bg-[#9d8c84]" />
                  About Me
                </p>
                <h2 className="font-serif font-light text-brown leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
                  View My Work.
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base md:text-lg font-sans text-brown-2 leading-relaxed font-light max-w-md">
                I'm a <strong className="text-brown font-medium">Frontend Developer & UI/UX Enthusiast</strong> based in Indonesia. I specialize in building modern, beautiful, and highly functional web and mobile applications.
              </motion.p>

              <motion.p variants={fadeUp} className="text-base font-sans text-brown-2 leading-relaxed font-light max-w-md">
                With a sharp eye for design and a passion for smooth animation, I thrive on turning complex ideas into elegant digital experiences. I believe good software should feel intuitive, look stunning, and work flawlessly.
              </motion.p>

              {/* Stats row — norevo inspired */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 divide-x divide-border pt-4 border-t border-border">
                {stats.map((s) => (
                  <div key={s.label} className="px-4 first:pl-0 last:pr-0 flex flex-col gap-1">
                    <div className="font-serif text-3xl md:text-4xl font-light text-brown">{s.num}</div>
                    <div className="text-[9px] tracking-[2px] uppercase text-brown-3 font-sans">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <a href="#proyek" className="btn-outline self-start">
                  See My Projects →
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
