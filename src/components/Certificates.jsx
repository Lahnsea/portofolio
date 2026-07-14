import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const certificates = [
  {
    id: 1,
    title: 'Workshop Pengembangan Aplikasi Jadwal KRL',
    subtitle: 'Berbasis Web & Mobile — REST API & MeetAp Developer',
    issuer: 'SMK Industri Kreatif Ghama Caraka × MeetAp',
    date: '25 April 2026',
    category: 'Workshop',
    image: '/serti.png',
  },
  // Tambahkan sertifikat lain di sini bila sudah ada
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-cream rounded-sm overflow-hidden shadow-[0_32px_80px_rgba(86,69,63,0.25)] max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="w-full aspect-[4/3] bg-cream-3 overflow-hidden">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info bar */}
          <div className="px-6 py-5 border-t border-border flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif font-light text-lg text-brown leading-snug mb-1">{cert.title}</h3>
              <p className="text-[10px] tracking-[2px] uppercase text-brown-3 font-sans">{cert.issuer} · {cert.date}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-brown-2 hover:bg-brown hover:text-cream hover:border-brown transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="sertifikat" className="bg-cream border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
                  <span className="inline-block w-8 h-px bg-[#9d8c84]" />
                  Achievements
                </p>
                <h2
                  className="font-serif font-light text-brown leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
                >
                  Certificates.<br /><em className="italic">& Awards.</em>
                </h2>
              </div>
              <p className="text-sm font-sans text-brown-2 max-w-xs leading-relaxed font-light">
                Recognitions and achievements earned through workshops, competitions, and formal training programs.
              </p>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelected(cert)}
                  className="group bg-cream-2 border border-border rounded-sm overflow-hidden cursor-pointer
                             hover:border-[#9d8c84] hover:shadow-[0_16px_48px_rgba(86,69,63,0.10)]
                             transition-all duration-500"
                  data-cursor-hover
                >
                  {/* Certificate thumbnail */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-cream-3">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#56453f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <span className="text-[9px] tracking-[2px] uppercase font-sans text-white/90 flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Certificate
                      </span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 right-3 bg-[#E4C7B8]/90 backdrop-blur-sm border border-[#D0C7C3] text-[9px] tracking-[1.5px] uppercase text-[#56453f] px-2.5 py-1 rounded-sm">
                      {cert.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-serif font-light text-lg text-brown leading-snug mb-1.5 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-sans text-brown-2 leading-relaxed mb-3 line-clamp-2 font-light">
                      {cert.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] tracking-[2px] uppercase text-brown-3 font-sans">{cert.date}</span>
                      <span className="text-[9px] tracking-[1.5px] uppercase text-brown-3 font-sans truncate max-w-[140px] text-right">{cert.issuer}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom count */}
            <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-border flex items-center gap-4">
              <span className="font-serif text-4xl font-light text-brown">{certificates.length}</span>
              <span className="text-[10px] tracking-[3px] uppercase text-brown-3 font-sans">
                Certificate{certificates.length !== 1 ? 's' : ''} Earned
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
