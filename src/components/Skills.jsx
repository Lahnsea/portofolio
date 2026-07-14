import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'HTML / CSS',      cat: 'Frontend' },
  { name: 'JavaScript',      cat: 'Frontend' },
  { name: 'React.js',        cat: 'Frontend' },
  { name: 'Tailwind CSS',    cat: 'Frontend' },
  { name: 'Flutter',         cat: 'Mobile' },
  { name: 'Dart',            cat: 'Mobile' },
  { name: 'Java',            cat: 'Backend' },
  { name: 'Python & AI',     cat: 'AI/ML' },
  { name: 'Database',        cat: 'Backend' },
  { name: 'API Integration', cat: 'Backend' },
  { name: 'Unity 2D / C#',  cat: 'Game Dev' },
  { name: 'UI/UX Design',   cat: 'Design' },
  { name: 'Figma',           cat: 'Design' },
  { name: 'Git & GitHub',    cat: 'Tools' },
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
            <p className="text-sm font-sans text-brown-2 max-w-xs leading-relaxed font-light">
              Technologies and tools I use to bring ideas to reality.
            </p>
          </motion.div>

          {/* ── Horizontal flowing tags — norevo catalog-pill style ── */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border cursor-default select-none transition-all duration-300 ${catColors[skill.cat]}`}
              >
                <span className="text-sm font-sans font-medium">{skill.name}</span>
                <span className="text-[9px] tracking-[1.5px] uppercase opacity-60">{skill.cat}</span>
              </motion.div>
            ))}
          </motion.div>

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
