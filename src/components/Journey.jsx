import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timeline = [
  {
    year: '2025 – 2026',
    title: 'Mobile Development with Flutter',
    sub: 'Cross-Platform Applications',
    desc: 'Mastered Flutter and Dart, building cross-platform mobile apps with beautiful UI and smooth performance.',
  },
  {
    year: '2024',
    title: 'Web Development Foundations',
    sub: 'HTML, CSS, JavaScript & Java',
    desc: 'Started the coding journey with core web technologies and Java programming. Built my first websites and fell in love with creating digital experiences.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="perjalanan" className="bg-[#EFE5D5] border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-[#9d8c84]" />
            Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-light text-brown leading-[0.9] tracking-tight mb-16"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            My Path.<br /><em className="italic">My Story.</em>
          </motion.h2>

          {/* Timeline */}
          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-0 top-3 bottom-3 w-px bg-border" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative pl-10 mb-14 last:mb-0 group"
              >
                {/* Dot */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#EFE5D5] border-2 border-[#857872] -translate-x-[3.5px] group-hover:bg-brown group-hover:border-brown transition-all duration-300" />

                {/* Year */}
                <p className="text-[9px] tracking-[3px] uppercase text-brown-3 font-sans mb-3">{item.year}</p>

                {/* Card — norevo style: minimal border */}
                <div className="bg-cream border border-border rounded-sm px-6 py-5 group-hover:border-[#9d8c84] group-hover:translate-x-1 group-hover:shadow-[0_8px_32px_rgba(86,69,63,0.07)] transition-all duration-300">
                  <h3 className="font-serif font-light text-xl text-brown mb-1">{item.title}</h3>
                  <p className="text-[9px] tracking-[2px] uppercase text-brown-3 mb-3">{item.sub}</p>
                  <p className="text-sm font-sans text-brown-2 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
