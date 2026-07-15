import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const skills = [
  { name: 'HTML / CSS',      cat: 'Frontend', desc: 'The building blocks of the web, used to structure content and design visually appealing layouts.' },
  { name: 'JavaScript',      cat: 'Frontend', desc: 'A dynamic programming language used to implement interactive features and logic on web pages.' },
  { name: 'React.js',        cat: 'Frontend', desc: 'A powerful component-based JavaScript library for building responsive and fast user interfaces.' },
  { name: 'Tailwind CSS',    cat: 'Frontend', desc: 'A utility-first CSS framework that allows rapid UI styling directly within HTML markup.' },
  { name: 'Flutter',         cat: 'Mobile',   desc: "Google's cross-platform framework for building beautiful, natively compiled apps from a single codebase." },
  { name: 'Dart',            cat: 'Mobile',   desc: 'A client-optimized, typed programming language designed for fast apps on any platform, powering Flutter.' },
  { name: 'Java',            cat: 'Backend',  desc: 'A robust, object-oriented programming language popular for high-performance and enterprise backend architectures.' },
  { name: 'Python & AI',     cat: 'AI/ML',    desc: 'Versatile language used for AI, machine learning, data engineering, and automation scripts.' },
  { name: 'Database',        cat: 'Backend',  desc: 'Systems like PostgreSQL, MySQL, or MongoDB used to store, query, and manage application data securely.' },
  { name: 'API Integration', cat: 'Backend',  desc: 'Connecting systems to allow seamless communication and data exchange between different software services.' },
  { name: 'Unity 2D / C#',  cat: 'Game Dev', desc: 'A popular cross-platform game development engine using C# to script gameplay mechanics and UI.' },
  { name: 'UI/UX Design',   cat: 'Design',   desc: 'The process of designing digital products that provide meaningful, intuitive, and relevant user experiences.' },
  { name: 'Figma',           cat: 'Design',   desc: 'A collaborative, cloud-based design tool used for creating vector layouts, wireframes, and prototypes.' },
  { name: 'Git & GitHub',    cat: 'Tools',    desc: 'Essential version control tool and cloud hosting service for code collaboration and tracking revisions.' },
  { name: 'Postman',         cat: 'Tools',    desc: 'An API client and platform that simplifies building, testing, sending requests, and documenting APIs.' },
];

const catColors = {
  Frontend: 'bg-[#F0DCD2] text-[#8B654E] border-[#E4C7B8]',
  Mobile:   'bg-[#E8DFD3] text-[#857872] border-[#D0C7C3]',
  Backend:  'bg-[#EFE5D5] text-[#857872] border-[#D0C7C3]',
  'AI/ML':  'bg-[#F4F0EA] text-[#9f9896] border-[#D0C7C3]',
  'Game Dev': 'bg-[#EFE5D5] text-[#857872] border-[#D0C7C3]',
  Design:   'bg-[#F0DCD2] text-[#8B654E] border-[#E4C7B8]',
  Tools:    'bg-[#F4F0EA] text-[#9f9896] border-[#D0C7C3]',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="keahlian" className="bg-[#EFE5D5] border-t border-border">
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
                Skills & Technologies
              </p>
              <h2
                className="font-serif font-light text-brown leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                My Arsenal.
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-sans text-brown-2 max-w-xs leading-relaxed font-light">
                Technologies and tools I use to bring ideas to reality.
              </p>
              <p className="text-[11px] font-sans text-brown-3 font-normal tracking-wide italic">
                * Click on any tool below to view its description.
              </p>
            </div>
          </motion.div>

          {/* ── Horizontal flowing tags — norevo catalog-pill style ── */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {skills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                  className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border cursor-pointer select-none transition-all duration-300 ${catColors[skill.cat]} ${
                    isSelected ? 'ring-2 ring-[#8B654E]/40 border-[#8B654E]' : ''
                  }`}
                >
                  <span className="text-sm font-sans font-medium">{skill.name}</span>
                  <span className="text-[9px] tracking-[1.5px] uppercase opacity-60">{skill.cat}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Description Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="bg-[#FAF7F2] border border-[#D0C7C3] p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_4px_24px_rgba(86,69,63,0.04)]">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-serif text-2xl text-brown font-medium">{selectedSkill.name}</span>
                      <span className={`text-[9px] tracking-[1.5px] px-2.5 py-1 rounded-sm border uppercase font-medium ${catColors[selectedSkill.cat]}`}>
                        {selectedSkill.cat}
                      </span>
                    </div>
                    <p className="text-sm font-sans text-brown-2 max-w-3xl leading-relaxed font-light">
                      {selectedSkill.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs font-sans text-brown-3 hover:text-brown underline cursor-pointer self-start md:self-center transition-colors duration-200"
                  >
                    Close Detail
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom divider with count */}
          <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-border flex items-center gap-4">
            <span className="font-serif text-4xl font-light text-brown">{skills.length}</span>
            <span className="text-[10px] tracking-[3px] uppercase text-brown-3 font-sans">Technologies & Tools</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

