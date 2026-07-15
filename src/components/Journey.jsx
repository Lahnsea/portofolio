import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const timeline = [
  {
    id: '2025',
    year: '2025 – 2026',
    title: 'Mobile Development with Flutter',
    sub: 'Cross-Platform Applications',
    desc: 'Mastered Flutter and Dart, building cross-platform mobile apps with beautiful UI, smooth performance, and solid database integrations.',
    achievements: [
      'Built fully functional mobile applications for Android & iOS.',
      'Integrated REST APIs and handled offline storage architectures.',
      'Optimized application performance and animations.'
    ],
    skills: ['Flutter', 'Dart', 'State Management', 'API Integration', 'Mobile UX']
  },
  {
    id: '2024',
    year: '2024',
    title: 'Web Development & UI/UX Design',
    sub: 'React.js, Tailwind CSS & Figma',
    desc: 'Expanded into modern frontend frameworks like React.js and collaborative prototyping tools like Figma. Focused on creating responsive and intuitive user designs.',
    achievements: [
      'Adopted component-driven development with React.js.',
      'Designed high-fidelity mockups and interactive user flows in Figma.',
      'Implemented design systems using Tailwind CSS.'
    ],
    skills: ['React.js', 'Tailwind CSS', 'Figma Prototyping', 'UI/UX Principles', 'Git & GitHub']
  },
  {
    id: '2023',
    year: '2023',
    title: 'The Foundations of Coding',
    sub: 'HTML, CSS, JavaScript & Java',
    desc: 'Began the journey with core web structure, styles, and logic. Mastered programming fundamentals and object-oriented paradigms using Java.',
    achievements: [
      'Mastered HTML5 semantics and CSS Flexbox/Grid layouts.',
      'Understood Java core concepts (OOP, variables, data structures).',
      'Developed simple interactive web calculators and logic games.'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Java OOP', 'Basic Algorithms']
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState(timeline[0]);

  return (
    <section id="perjalanan" className="bg-[#EFE5D5] border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Section Header */}
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

          {/* Interactive timeline grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Vertical Timeline Track (Year Selectors) */}
            <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-4 border-b lg:border-b-0 lg:border-l border-border/80 scrollbar-none">
              {timeline.map((item) => {
                const isActive = activeTab.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item)}
                    className="relative py-3 px-6 text-left cursor-pointer flex-shrink-0 focus:outline-none transition-all duration-300 group"
                  >
                    {/* Active line indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineLine"
                        className="absolute left-0 bottom-0 lg:bottom-auto lg:top-0 h-0.5 lg:h-full w-full lg:w-0.5 bg-[#857872]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className={`text-[10px] tracking-[3px] uppercase font-sans block mb-1 transition-colors duration-300 ${
                      isActive ? 'text-brown font-semibold' : 'text-brown-3 group-hover:text-brown'
                    }`}>
                      {item.year}
                    </span>
                    <span className={`font-serif text-lg font-light transition-colors duration-300 ${
                      isActive ? 'text-brown' : 'text-brown-2 group-hover:text-brown'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Display Card with drag/swipe support */}
            <div className="lg:col-span-8 min-h-[380px]">
              <div className="text-right text-[10px] text-brown-3 font-sans tracking-widest uppercase mb-2 select-none">
                ← Swipe card or click years to navigate →
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(event, info) => {
                    const swipeThreshold = 50;
                    const currentIndex = timeline.findIndex(t => t.id === activeTab.id);
                    if (info.offset.x < -swipeThreshold) {
                      // Swipe Left -> Older years (index + 1)
                      if (currentIndex < timeline.length - 1) {
                        setActiveTab(timeline[currentIndex + 1]);
                      }
                    } else if (info.offset.x > swipeThreshold) {
                      // Swipe Right -> Newer years (index - 1)
                      if (currentIndex > 0) {
                        setActiveTab(timeline[currentIndex - 1]);
                      }
                    }
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-cream border border-border p-8 md:p-10 rounded-sm shadow-[0_8px_32px_rgba(86,69,63,0.04)] cursor-grab active:cursor-grabbing select-none touch-pan-y"
                >
                  <div className="border-b border-border/60 pb-5 mb-6 pointer-events-none">
                    <p className="text-[10px] tracking-[3px] uppercase font-sans text-brown-3 mb-2">{activeTab.year} Milestone</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-brown font-light mb-1">{activeTab.title}</h3>
                    <p className="text-xs font-sans tracking-[2px] uppercase text-brown-3">{activeTab.sub}</p>
                  </div>

                  <p className="text-sm font-sans text-brown-2 leading-relaxed font-light mb-8 pointer-events-none">
                    {activeTab.desc}
                  </p>

                  {/* Achievements section */}
                  <div className="mb-8 pointer-events-none">
                    <span className="text-[9px] tracking-[2px] uppercase font-sans text-brown-3 block mb-4 font-semibold">
                      Key Highlights & Learnings
                    </span>
                    <ul className="space-y-3.5">
                      {activeTab.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#857872] mt-2 flex-shrink-0" />
                          <span className="text-sm font-sans text-brown-2 font-light leading-snug">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack items acquired */}
                  <div className="border-t border-border/60 pt-6 pointer-events-none">
                    <span className="text-[9px] tracking-[2px] uppercase font-sans text-brown-3 block mb-3 font-semibold">
                      Focus Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeTab.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-sans px-3 py-1 bg-cream-2 border border-border text-brown-2 rounded-sm tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
