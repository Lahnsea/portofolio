import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const skills = [
  { 
    name: 'HTML / CSS', 
    cat: 'Frontend', 
    desc: 'The backbone of web layout and styling. Experienced in semantic HTML5, modern CSS layouts (Grid/Flexbox), variables, responsive design, and CSS transitions.',
    useCase: 'Web structure, Responsive layout, Clean styling'
  },
  { 
    name: 'JavaScript', 
    cat: 'Frontend', 
    desc: 'Core language for client-side interactivity. Skilled in ES6+ syntax, asynchronous programming (Promises/async-await), DOM manipulation, and modern web APIs.',
    useCase: 'Dynamic interactions, API fetching, Client-side logic'
  },
  { 
    name: 'React.js', 
    cat: 'Frontend', 
    desc: 'A robust declarative framework for building component-based user interfaces. Familiar with Hooks, Context API, state management, and optimized render cycles.',
    useCase: 'Single-page applications, Component libraries, State logic'
  },
  { 
    name: 'Tailwind CSS', 
    cat: 'Frontend', 
    desc: 'A utility-first framework for rapid, maintainable design implementations. Expert at custom theme configs, responsive design modifiers, and writing zero custom CSS.',
    useCase: 'Rapid styling, Custom design systems, Clean markup'
  },
  { 
    name: 'Flutter', 
    cat: 'Mobile', 
    desc: "Google's UI software development kit. Capable of building cross-platform native applications for Android and iOS with fluid animations and native integrations.",
    useCase: 'Cross-platform apps, Rich custom widgets, Smooth mobile UX'
  },
  { 
    name: 'Dart', 
    cat: 'Mobile', 
    desc: 'An object-oriented, class-based language optimized for client app development. Powers Flutter development with asynchronous programming and sound null safety.',
    useCase: 'Flutter logic, Asynchronous streams, OOP structures'
  },
  { 
    name: 'Java', 
    cat: 'Backend', 
    desc: 'A class-based, object-oriented language for building server-side applications, handling backend logic, object relations, and database connection pools.',
    useCase: 'Enterprise backend logic, System architecture, Algorithms'
  },
  { 
    name: 'Python & AI', 
    cat: 'AI/ML', 
    desc: 'Versatile environment for machine learning, data processing, and scripting. Experienced in automation and utilizing packages to integrate AI models.',
    useCase: 'Automation scripts, AI APIs, Data parsing'
  },
  { 
    name: 'Database', 
    cat: 'Backend', 
    desc: 'Structuring, managing, and retrieving data using relational databases (SQL) and non-relational database models (NoSQL). Focusing on queries and data integrity.',
    useCase: 'Data persistence, Schema design, Secure queries'
  },
  { 
    name: 'API Integration', 
    cat: 'Backend', 
    desc: 'Designing and consuming RESTful and GraphQL APIs. Implementing middleware, request validation, authentication, and secure client-server communication.',
    useCase: 'Third-party integrations, Microservices, Client updates'
  },
  { 
    name: 'Unity 2D / C#', 
    cat: 'Game Dev', 
    desc: 'Crafting interactive 2D gameplay experiences. Implementing logic using C# scripts, collision physics, tilemaps, state machines, and canvas UI.',
    useCase: '2D Game logic, Physics scripting, Interactive menus'
  },
  { 
    name: 'UI/UX Design', 
    cat: 'Design', 
    desc: 'Applying visual design principles, hierarchy, and usability studies to create digital layouts that are functional, accessible, and delightful to interact with.',
    useCase: 'Wireframes, User flows, Visual hierarchy'
  },
  { 
    name: 'Figma', 
    cat: 'Design', 
    desc: 'Vector graphics and prototyping platform. Building structured design systems, components, auto-layouts, and clickable high-fidelity wireframes.',
    useCase: 'High-fidelity mockups, Prototyping, Asset exporting'
  },
  { 
    name: 'Git & GitHub', 
    cat: 'Tools', 
    desc: 'Distributed version control and remote repositories. Proficient in branch management, merging, pull requests, and collaborative code reviews.',
    useCase: 'Version control, Code hosting, Team collaboration'
  },
  { 
    name: 'Postman', 
    cat: 'Tools', 
    desc: 'An API client tool for testing endpoints. Creating request collections, environment variables, automation scripts, and validating API response structures.',
    useCase: 'API testing, Request mocking, End-to-end collection runs'
  },
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
  const [selectedSkill, setSelectedSkill] = useState(skills[14]); // Pre-select Postman to immediately display detail and demonstrate action

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.cat]) acc[skill.cat] = [];
    acc[skill.cat].push(skill);
    return acc;
  }, {});

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
                A directory of tools, frameworks, and programming environments.
              </p>
              <p className="text-[11px] font-sans text-brown-3 tracking-wide italic">
                * Click on any badge to explore details.
              </p>
            </div>
          </motion.div>

          {/* Interactive split-screen layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Sticky dossier detail display card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 z-10">
              <div className="bg-[#FAF7F2] border border-[#D0C7C3] p-8 rounded-sm shadow-[0_4px_32px_rgba(86,69,63,0.04)] min-h-[360px] flex flex-col justify-between relative overflow-hidden group/card">
                
                {/* Tech background elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brown/5 rounded-full blur-2xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {selectedSkill ? (
                    <motion.div
                      key={selectedSkill.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Dossier Header Info */}
                        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                          <span className="text-[9px] tracking-[2.5px] uppercase font-sans text-brown-3 font-medium">
                            Technique Dossier
                          </span>
                          <span className={`text-[9px] tracking-[1.5px] px-2.5 py-0.5 rounded-sm border uppercase font-medium ${catColors[selectedSkill.cat]}`}>
                            {selectedSkill.cat}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-3xl text-brown font-light mb-4">
                          {selectedSkill.name}
                        </h3>

                        {/* Detailed desc */}
                        <p className="text-sm font-sans text-brown-2 leading-relaxed font-light mb-6">
                          {selectedSkill.desc}
                        </p>
                      </div>

                      {/* Use cases / features */}
                      <div className="pt-4 border-t border-border/80">
                        <span className="text-[9px] tracking-[2px] uppercase font-sans text-brown-3 block mb-2 font-medium">
                          Primary Use Case
                        </span>
                        <p className="text-xs font-sans font-medium text-brown-2">
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
                      className="flex-1 flex flex-col justify-between text-center py-10"
                    >
                      <div className="flex flex-col items-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-brown-3 mb-4 animate-pulse">
                          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        <h3 className="font-serif text-xl text-brown font-light mb-2">
                          Select an Item
                        </h3>
                        <p className="text-xs font-sans text-brown-3 max-w-[240px] leading-relaxed">
                          Click on any skill badge on the right to view its proficiency, features, and core usage.
                        </p>
                      </div>
                      <div className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3/60">
                        Awaiting input...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Categorized Folder View */}
            <div className="lg:col-span-7 space-y-6">
              {Object.keys(groupedSkills).map((category, idx) => (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  className="bg-[#FAF7F2] border border-[#D0C7C3] p-6 rounded-sm transition-all duration-300 hover:shadow-[0_6px_20px_rgba(86,69,63,0.03)]"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-2">
                    <h3 className="font-serif text-base text-brown font-medium flex items-center gap-2">
                      <span className="text-xs text-brown-3 font-sans font-light">0{idx + 1}.</span>
                      {category}
                    </h3>
                    <span className="text-[9px] font-sans tracking-[1.5px] text-brown-3 uppercase">
                      {groupedSkills[category].length} Item{groupedSkills[category].length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {groupedSkills[category].map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      return (
                        <motion.button
                          key={skill.name}
                          whileHover={{ y: -1, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`inline-flex items-center px-4 py-2 rounded-sm border text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-[#56453f] text-[#fbfbfb] border-[#56453f] shadow-[0_4px_16px_rgba(86,69,63,0.15)] font-semibold'
                              : 'bg-[#f5f0ec] border-border text-brown hover:border-brown-2 hover:bg-[#FAF7F2]'
                          }`}
                        >
                          {skill.name}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Bottom divider with count */}
          <motion.div variants={fadeUp} className="mt-16 pt-8 border-t border-border flex items-center gap-4">
            <span className="font-serif text-4xl font-light text-brown">{skills.length}</span>
            <span className="text-[10px] tracking-[3px] uppercase text-brown-3 font-sans">Technologies & Tools</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

