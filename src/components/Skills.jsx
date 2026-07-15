import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Devicon CDN — no package install needed
const DV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skills = [
  {
    name: 'HTML / CSS',
    cat: 'Frontend',
    year: '2021',
    medium: 'Web Structure & Styling',
    icon: `${DV}/html5/html5-original.svg`,
    desc: 'The backbone of web layout and styling. Experienced in semantic HTML5, modern CSS layouts (Grid/Flexbox), variables, responsive design, and CSS transitions.',
    useCase: 'Web structure, Responsive layout, Clean styling',
  },
  {
    name: 'JavaScript',
    cat: 'Frontend',
    year: '2021',
    medium: 'Client-Side Logic',
    icon: `${DV}/javascript/javascript-original.svg`,
    desc: 'Core language for client-side interactivity. Skilled in ES6+ syntax, asynchronous programming (Promises/async-await), DOM manipulation, and modern web APIs.',
    useCase: 'Dynamic interactions, API fetching, Client-side logic',
  },
  {
    name: 'React.js',
    cat: 'Frontend',
    year: '2022',
    medium: 'Component-Based UI',
    icon: `${DV}/react/react-original.svg`,
    desc: 'A robust declarative framework for building component-based user interfaces. Familiar with Hooks, Context API, state management, and optimized render cycles.',
    useCase: 'Single-page applications, Component libraries, State logic',
  },
  {
    name: 'Tailwind CSS',
    cat: 'Frontend',
    year: '2022',
    medium: 'Utility-First Styling',
    icon: `${DV}/tailwindcss/tailwindcss-original.svg`,
    desc: 'A utility-first framework for rapid, maintainable design implementations. Expert at custom theme configs, responsive design modifiers, and writing zero custom CSS.',
    useCase: 'Rapid styling, Custom design systems, Clean markup',
  },
  {
    name: 'Flutter',
    cat: 'Mobile',
    year: '2022',
    medium: 'Cross-Platform SDK',
    icon: `${DV}/flutter/flutter-original.svg`,
    desc: "Google's UI software development kit. Capable of building cross-platform native applications for Android and iOS with fluid animations and native integrations.",
    useCase: 'Cross-platform apps, Rich custom widgets, Smooth mobile UX',
  },
  {
    name: 'Dart',
    cat: 'Mobile',
    year: '2022',
    medium: 'Object-Oriented Language',
    icon: `${DV}/dart/dart-original.svg`,
    desc: 'An object-oriented, class-based language optimized for client app development. Powers Flutter development with asynchronous programming and sound null safety.',
    useCase: 'Flutter logic, Asynchronous streams, OOP structures',
  },
  {
    name: 'Java',
    cat: 'Backend',
    year: '2021',
    medium: 'Enterprise Language',
    icon: `${DV}/java/java-original.svg`,
    desc: 'A class-based, object-oriented language for building server-side applications, handling backend logic, object relations, and database connection pools.',
    useCase: 'Enterprise backend logic, System architecture, Algorithms',
  },
  {
    name: 'Python & AI',
    cat: 'AI/ML',
    year: '2023',
    medium: 'Machine Learning & Scripting',
    icon: `${DV}/python/python-original.svg`,
    desc: 'Versatile environment for machine learning, data processing, and scripting. Experienced in automation and utilizing packages to integrate AI models.',
    useCase: 'Automation scripts, AI APIs, Data parsing',
  },
  {
    name: 'Database',
    cat: 'Backend',
    year: '2022',
    medium: 'SQL & NoSQL',
    icon: `${DV}/mysql/mysql-original.svg`,
    desc: 'Structuring, managing, and retrieving data using relational databases (SQL) and non-relational database models (NoSQL). Focusing on queries and data integrity.',
    useCase: 'Data persistence, Schema design, Secure queries',
  },
  {
    name: 'API Integration',
    cat: 'Backend',
    year: '2022',
    medium: 'RESTful & GraphQL',
    icon: `${DV}/fastapi/fastapi-original.svg`,
    desc: 'Designing and consuming RESTful and GraphQL APIs. Implementing middleware, request validation, authentication, and secure client-server communication.',
    useCase: 'Third-party integrations, Microservices, Client updates',
  },
  {
    name: 'Unity 2D / C#',
    cat: 'Game Dev',
    year: '2023',
    medium: 'Interactive 2D Engine',
    icon: `${DV}/unity/unity-original.svg`,
    desc: 'Crafting interactive 2D gameplay experiences. Implementing logic using C# scripts, collision physics, tilemaps, state machines, and canvas UI.',
    useCase: '2D Game logic, Physics scripting, Interactive menus',
  },
  {
    name: 'UI/UX Design',
    cat: 'Design',
    year: '2021',
    medium: 'Visual Design Principles',
    icon: `${DV}/figma/figma-original.svg`,
    desc: 'Applying visual design principles, hierarchy, and usability studies to create digital layouts that are functional, accessible, and delightful to interact with.',
    useCase: 'Wireframes, User flows, Visual hierarchy',
  },
  {
    name: 'Figma',
    cat: 'Design',
    year: '2021',
    medium: 'Prototyping & Vectoring',
    icon: `${DV}/figma/figma-original.svg`,
    desc: 'Vector graphics and prototyping platform. Building structured design systems, components, auto-layouts, and clickable high-fidelity wireframes.',
    useCase: 'High-fidelity mockups, Prototyping, Asset exporting',
  },
  {
    name: 'Git & GitHub',
    cat: 'Tools',
    year: '2021',
    medium: 'Version Control',
    icon: `${DV}/git/git-original.svg`,
    desc: 'Distributed version control and remote repositories. Proficient in branch management, merging, pull requests, and collaborative code reviews.',
    useCase: 'Version control, Code hosting, Team collaboration',
  },
  {
    name: 'Postman',
    cat: 'Tools',
    year: '2022',
    medium: 'API Testing Client',
    icon: `${DV}/postman/postman-original.svg`,
    desc: 'An API client tool for testing endpoints. Creating request collections, environment variables, automation scripts, and validating API response structures.',
    useCase: 'API testing, Request mocking, End-to-end collection runs',
  },
];

// Category accent colors — refined, elegant, museum-appropriate
const catAccent = {
  Frontend:   { dot: '#A0866A', label: '#A0866A18', text: '#A0866A' },
  Mobile:     { dot: '#7A8A9A', label: '#7A8A9A18', text: '#7A8A9A' },
  Backend:    { dot: '#6A8A7A', label: '#6A8A7A18', text: '#6A8A7A' },
  'AI/ML':    { dot: '#9A8060', label: '#9A806018', text: '#9A8060' },
  'Game Dev': { dot: '#7A80A0', label: '#7A80A018', text: '#7A80A0' },
  Design:     { dot: '#9A7A8A', label: '#9A7A8A18', text: '#9A7A8A' },
  Tools:      { dot: '#808070', label: '#80807018', text: '#808070' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ── Exhibit Frame — each skill card ──────────────────────────────────────────
function ExhibitFrame({ skill, index, isSelected, onClick }) {
  const accent = catAccent[skill.cat];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col cursor-pointer text-left w-full"
      style={{ outline: 'none' }}
    >
      {/* ── Outer elegant stone frame ── */}
      <div
        className="relative transition-all duration-500"
        style={{
          padding: '4px',
          background: isSelected
            ? `linear-gradient(135deg, ${accent.dot}cc, ${accent.dot}44, ${accent.dot}cc)`
            : 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
          boxShadow: isSelected
            ? `0 0 0 1px ${accent.dot}44, 0 10px 30px rgba(160, 134, 106, 0.15), 0 0 20px ${accent.dot}22`
            : '0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* ── Inner inset border ── */}
        <div
          style={{
            padding: '3px',
            background: isSelected
              ? `linear-gradient(135deg, ${accent.dot}22, #FAF9F6, ${accent.dot}22)`
              : 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)',
          }}
        >
          {/* ── Canvas area (Light Gallery Theme) ── */}
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500"
            style={{
              minHeight: '120px',
              background: isSelected
                ? `radial-gradient(ellipse at 50% 20%, ${accent.dot}15 0%, #FAF9F6 75%)`
                : 'radial-gradient(ellipse at 50% 20%, #FAF9F6 0%, #EDEAE5 100%)',
            }}
          >
            {/* Spotlight cone from top */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: isSelected ? 1 : 0,
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent.dot}18 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent.dot}10 0%, transparent 70%)`,
              }}
            />

            {/* Exhibit number tag — top left */}
            <span
              className="absolute top-2 left-2.5 font-sans"
              style={{ fontSize: '7px', letterSpacing: '1px', color: '#9A9390' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Category accent dot — top right */}
            <span
              className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: accent.dot,
                opacity: isSelected ? 1 : 0.4,
                boxShadow: isSelected ? `0 0 6px ${accent.dot}` : 'none',
              }}
            />

            {/* ── Tech icon — the "artwork" ── */}
            <div className="relative z-10 flex flex-col items-center gap-2 px-3 py-4">
              <div
                className="transition-all duration-500"
                style={{
                  width: '44px',
                  height: '44px',
                  filter: isSelected
                    ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.06)) grayscale(0%) brightness(1)'
                    : 'grayscale(70%) opacity(0.55) brightness(0.9)',
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Skill name below icon */}
              <span
                className="font-serif font-light text-center leading-tight transition-all duration-300"
                style={{
                  fontSize: 'clamp(0.62rem, 1.3vw, 0.78rem)',
                  color: isSelected ? '#2C2825' : '#6B6460',
                  letterSpacing: '0.02em',
                }}
              >
                {skill.name}
              </span>
            </div>

            {/* Bottom shadow — floor of canvas */}
            <div
              className="absolute bottom-0 left-0 right-0 h-3 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.02), transparent)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Museum placard below frame ── */}
      <div
        className="mt-1.5 px-0.5 transition-all duration-300 text-center"
        style={{ opacity: isSelected ? 1 : 0.5 }}
      >
        <p
          className="font-sans leading-tight"
          style={{ fontSize: '6.5px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}
        >
          {skill.medium}
        </p>
      </div>
    </motion.button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedSkill, setSelectedSkill] = useState(skills[2]); // React pre-selected

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.cat]) acc[skill.cat] = [];
    acc[skill.cat].push(skill);
    return acc;
  }, {});

  const globalIndex = (cat, localIdx) => {
    const cats = Object.keys(groupedSkills);
    let offset = 0;
    for (const c of cats) {
      if (c === cat) break;
      offset += groupedSkills[c].length;
    }
    return offset + localIdx;
  };

  return (
    <section id="keahlian" className="border-t border-border" style={{ background: '#EDEAE5' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* ── Section Header ── */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
                <span className="inline-block w-8 h-px bg-[#A8A09C]" />
                Skills &amp; Technologies
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
                A curated gallery of tools, frameworks, and languages — each an exhibit in my digital practice.
              </p>
              <p className="text-[11px] font-sans text-brown-3 tracking-wide italic">
                * Click any exhibit to read its placard.
              </p>
            </div>
          </motion.div>

          {/* ── Museum Layout ── */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ── LEFT: Museum Information Placard (sticky, Light Elegant) ── */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 z-10">
              <div
                className="relative overflow-hidden"
                style={{
                  background: '#FAF9F6',
                  boxShadow: '0 10px 40px rgba(44, 40, 37, 0.05), 0 2px 0 rgba(255,255,255,0.8)',
                  border: '1px solid #D8D3CE',
                }}
              >
                {/* Accent top bar */}
                <div
                  className="h-0.5 w-full transition-all duration-700"
                  style={{
                    background: selectedSkill
                      ? `linear-gradient(90deg, transparent, ${catAccent[selectedSkill.cat].dot}, transparent)`
                      : 'linear-gradient(90deg, transparent, #A8A09C, transparent)',
                  }}
                />

                {/* Spotlight glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none transition-all duration-700"
                  style={{
                    background: selectedSkill
                      ? `radial-gradient(ellipse at 50% 0%, ${catAccent[selectedSkill.cat].dot}10 0%, transparent 70%)`
                      : 'radial-gradient(ellipse at 50% 0%, #A8A09C08 0%, transparent 70%)',
                  }}
                />

                <div className="relative p-8 flex flex-col justify-between" style={{ minHeight: '440px' }}>
                  <AnimatePresence mode="wait">
                    {selectedSkill ? (
                      <motion.div
                        key={selectedSkill.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col h-full justify-between"
                      >
                        <div>
                          {/* Header row */}
                          <div
                            className="flex items-center justify-between mb-6 pb-4"
                            style={{ borderBottom: '1px solid #E4E0DA' }}
                          >
                            <span className="font-sans text-[8px] tracking-[3px] uppercase" style={{ color: '#9A9390' }}>
                              Collection · Exhibit
                            </span>
                            <span
                              className="font-sans text-[8px] tracking-[2px] uppercase px-2.5 py-1"
                              style={{
                                color: catAccent[selectedSkill.cat].dot,
                                background: `${catAccent[selectedSkill.cat].dot}08`,
                                border: `1px solid ${catAccent[selectedSkill.cat].dot}22`,
                              }}
                            >
                              {selectedSkill.cat}
                            </span>
                          </div>

                          {/* Icon display in placard */}
                          <div className="flex items-center gap-5 mb-6">
                            <div
                              className="flex-shrink-0 flex items-center justify-center"
                              style={{
                                width: '64px',
                                height: '64px',
                                background: `radial-gradient(ellipse at 50% 30%, ${catAccent[selectedSkill.cat].dot}08 0%, #FAF9F6 100%)`,
                                border: `1px solid ${catAccent[selectedSkill.cat].dot}22`,
                                boxShadow: `0 4px 12px rgba(0,0,0,0.02)`,
                              }}
                            >
                              <img
                                src={selectedSkill.icon}
                                alt={selectedSkill.name}
                                width={38}
                                height={38}
                                loading="lazy"
                                style={{
                                  width: '38px',
                                  height: '38px',
                                  objectFit: 'contain',
                                }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                            <div>
                              <p className="font-sans text-[8px] tracking-[2px] uppercase mb-1" style={{ color: '#9A9390' }}>
                                {selectedSkill.medium}
                              </p>
                              <h3
                                className="font-serif font-light leading-tight"
                                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', color: '#2C2825' }}
                              >
                                {selectedSkill.name}
                              </h3>
                              <p className="font-sans text-[8px] tracking-[1.5px] mt-0.5" style={{ color: '#9A9390' }}>
                                Acquired {selectedSkill.year}
                              </p>
                            </div>
                          </div>

                          {/* Ornament separator */}
                          <div className="flex items-center gap-3 mb-5">
                            <div className="flex-1 h-px" style={{ background: '#E4E0DA' }} />
                            <span style={{ color: '#A8A09C', fontSize: '9px' }}>◆</span>
                            <div className="flex-1 h-px" style={{ background: '#E4E0DA' }} />
                          </div>

                          {/* Description */}
                          <p
                            className="font-sans font-light leading-relaxed"
                            style={{ fontSize: '0.78rem', color: '#6B6460', lineHeight: '1.8' }}
                          >
                            {selectedSkill.desc}
                          </p>
                        </div>

                        {/* Footer use case */}
                        <div className="mt-6 pt-5" style={{ borderTop: '1px solid #E4E0DA' }}>
                          <p className="font-sans text-[8px] tracking-[2px] uppercase mb-2" style={{ color: '#9A9390' }}>
                            Primary Application
                          </p>
                          <p className="font-sans text-xs" style={{ color: '#2C2825' }}>
                            {selectedSkill.useCase}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-4"
                      >
                        <div className="w-8 h-8 flex items-center justify-center" style={{ color: '#A8A09C' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                            <rect x="3" y="3" width="18" height="18" />
                            <path d="M8 3v18M16 3v18M3 8h18M3 16h18" strokeDasharray="2 2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-serif font-light mb-1" style={{ color: '#2C2825', fontSize: '1.1rem' }}>
                            Select an Exhibit
                          </h3>
                          <p className="font-sans text-[10px] leading-relaxed" style={{ color: '#6B6460' }}>
                            Choose a piece from the gallery to view its museum placard.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom museum strip */}
                <div
                  className="px-8 py-3 flex items-center justify-between"
                  style={{ background: '#EDEAE5', borderTop: '1px solid #D8D3CE' }}
                >
                  <span className="font-sans text-[7px] tracking-[2px] uppercase" style={{ color: '#6B6460' }}>
                    Digital Arts Collection
                  </span>
                  <span className="font-sans text-[7px] tracking-[2px] uppercase" style={{ color: '#6B6460' }}>
                    {skills.length} Exhibits
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Gallery Walls (Light Gallery Theme) ── */}
            <div className="lg:col-span-8 space-y-10">
              {Object.keys(groupedSkills).map((category, catIdx) => {
                const accent = catAccent[category];
                return (
                  <motion.div key={category} variants={fadeUp}>
                    {/* Wing header */}
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-sans text-[7px] tracking-[3px] uppercase" style={{ color: '#9A9390' }}>
                        Wing {String(catIdx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 h-px" style={{ background: '#D8D3CE' }} />
                      <span
                        className="font-sans text-[8px] tracking-[2px] uppercase px-3 py-1"
                        style={{
                          color: accent.dot,
                          background: accent.label,
                          border: `1px solid ${accent.dot}33`,
                        }}
                      >
                        {category}
                      </span>
                      <div className="h-px w-4" style={{ background: '#D8D3CE' }} />
                    </div>

                    {/* Gallery wall panel (Light Elegant Stone) */}
                    <div
                      className="relative p-6 md:p-8"
                      style={{
                        background: 'linear-gradient(180deg, #FAF9F6 0%, #EDEAE5 100%)',
                        boxShadow: '0 4px 20px rgba(44, 40, 37, 0.03), inset 0 1px 0 rgba(255,255,255,0.8)',
                        border: '1px solid #D8D3CE',
                      }}
                    >
                      {/* Wall texture */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.015]"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 48px)',
                        }}
                      />

                      {/* Floor shadow strip */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, transparent, rgba(44, 40, 37, 0.03))',
                          borderTop: '1px solid #D8D3CE',
                        }}
                      />

                      {/* Exhibit grid */}
                      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
                        {groupedSkills[category].map((skill, localIdx) => (
                          <ExhibitFrame
                            key={skill.name}
                            skill={skill}
                            index={globalIndex(category, localIdx)}
                            isSelected={selectedSkill?.name === skill.name}
                            onClick={() =>
                              setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* ── Bottom count ── */}
          <motion.div
            variants={fadeUp}
            className="mt-16 pt-8 border-t border-border flex items-center gap-4"
          >
            <span className="font-serif text-4xl font-light text-brown">{skills.length}</span>
            <span className="text-[10px] tracking-[3px] uppercase text-brown-3 font-sans">
              Technologies &amp; Tools
            </span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
