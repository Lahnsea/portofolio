import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

/* ─── Animated counter ─── */
function CountUp({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const numTarget = parseInt(target, 10);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { num: '3',  suffix: '+', label: 'Projects Done',   link: '#showcase' },
  { num: '1',  suffix: '+', label: 'Certificates',     link: '#showcase' },
  { num: '7',  suffix: '+', label: 'Technologies',     link: '#showcase' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [imgError, setImgError] = useState(false);

  return (
    <section id="tentang" className="bg-cream border-t border-border">
      {/* ── Top editorial banner ── */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left — Portrait with museum frame */}
            <motion.div variants={fadeUp} className="relative order-2 lg:order-1 p-1">
              {/* Outer elegant stone frame */}
              <div
                className="relative p-[5px] rounded-sm transition-all duration-500 shadow-md"
                style={{ background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)' }}
              >
                {/* Inner inset border */}
                <div
                  className="p-[4px] rounded-sm"
                  style={{ background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}
                >
                  {/* Canvas area */}
                  <div
                    className="relative z-10 overflow-hidden rounded-sm aspect-[3/4] max-h-[600px]"
                    style={{ background: 'radial-gradient(ellipse at 50% 20%, #FAF9F6 0%, #EDEAE5 100%)' }}
                  >
                    {!imgError ? (
                      <>
                        <img
                          src="/foto.jpg"
                          alt="Fadlan — Developer Portrait"
                          className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                          onError={() => setImgError(true)}
                        />
                        {/* Spotlight glow */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)',
                          }}
                        />
                      </>
                    ) : (
                      /* Fallback placeholder if no photo */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6">
                        <svg className="w-16 h-16 text-brown-3 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3 text-center opacity-60">Portrait Exhibit</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating museum placard caption */}
              <div
                className="absolute -bottom-6 -left-6 border px-5 py-4 rounded-sm shadow-lg z-20"
                style={{ background: '#FAF9F6', borderColor: '#D8D3CE' }}
              >
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
                <h2
                  className="font-serif font-light text-brown leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
                >
                  View My Work.
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base md:text-lg font-sans text-brown-2 leading-relaxed font-light max-w-md">
                I'm a <strong className="text-brown font-medium">Frontend Developer & UI/UX Enthusiast</strong> based in Indonesia. I specialize in building modern, beautiful, and highly functional web and mobile applications.
              </motion.p>

              <motion.p variants={fadeUp} className="text-base font-sans text-brown-2 leading-relaxed font-light max-w-md">
                With a sharp eye for design and a passion for smooth animation, I thrive on turning complex ideas into elegant digital experiences. I believe good software should feel intuitive, look stunning, and work flawlessly.
              </motion.p>

              {/* Quote block */}
              <motion.div
                variants={fadeUp}
                className="border-l-2 border-[#C9A96E] pl-5 py-1"
                style={{ borderColor: '#C9A96E' }}
              >
                <p className="font-serif italic font-light text-brown text-base leading-relaxed">
                  "Turning ideas into clean, modern, and meaningful digital experiences."
                </p>
              </motion.div>

              {/* Stats row with count-up */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 divide-x divide-border pt-4 border-t border-border">
                {stats.map((s) => (
                  <a key={s.label} href={s.link} className="group px-4 first:pl-0 last:pr-0 flex flex-col gap-1 cursor-pointer">
                    <div className="font-serif text-3xl md:text-4xl font-light text-brown group-hover:text-brown-2 transition-colors">
                      <CountUp target={s.num} suffix={s.suffix} />
                    </div>
                    <div className="text-[9px] tracking-[2px] uppercase text-brown-3 font-sans group-hover:text-brown transition-colors flex items-center gap-1">
                      {s.label} <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px]">↗</span>
                    </div>
                  </a>
                ))}
              </motion.div>

              {/* CTA buttons — Download CV + View Projects */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href="/cv-fadlan.pdf"
                  download
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-sm text-sm font-sans font-medium tracking-wide
                             bg-brown text-cream border border-brown
                             hover:bg-brown-2 hover:border-brown-2 transition-all duration-300 shadow-sm"
                >
                  {/* Download icon */}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </a>
                <a
                  href="#showcase"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-sm text-sm font-sans font-medium tracking-wide
                             bg-transparent text-brown border border-border
                             hover:border-border-2 hover:bg-cream-2 transition-all duration-300"
                >
                  {/* Arrow icon */}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                  View Projects
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
