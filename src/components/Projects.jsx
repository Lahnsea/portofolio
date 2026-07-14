import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'APP-KRL',
    subtitle: 'Mobile & API',
    category: 'mobile',
    tags: ['Flutter', 'Dart', 'API'],
    image: '/appkrl.png',
    desc: 'Real-time transit tracker built with Flutter. Consumes live transit APIs to deliver instant train schedules, dramatically reducing user planning time.',
    link: 'https://github.com/Lahnsea',
    year: '2025',
  },
  {
    id: 2,
    title: 'Aetheria2D',
    subtitle: 'Game Development',
    category: 'game',
    tags: ['Unity 2D', 'C#', 'Pixel Art'],
    image: '/gameproject.png',
    desc: 'Narrative-driven 2D platformer built with Unity. Features custom C# state machines and dynamic tilemaps for an immersive gameplay experience.',
    link: 'https://github.com/Lahnsea',
    year: '2025',
  },
  {
    id: 3,
    title: 'Portfolio',
    subtitle: 'Web Development',
    category: 'web',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: '/portoweb.png',
    desc: 'Personal portfolio website hand-coded using HTML, CSS, and vanilla JavaScript. Now rebuilt with React + Tailwind CSS.',
    link: 'https://github.com/Lahnsea',
    year: '2026',
  },
];

const filters = [
  { key: 'all',    label: 'All' },
  { key: 'web',    label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'game',   label: 'Game' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ project, isDragging }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    if (isDragging) { e.preventDefault(); e.stopPropagation(); }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] bg-cream border border-border rounded-sm overflow-hidden hover:border-[#9d8c84] hover:shadow-[0_20px_60px_rgba(86,69,63,0.10)] transition-all duration-500 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-cream-3 pointer-events-none">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover object-top transition-all duration-700 ${hovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#56453f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <span className="text-xs tracking-[2px] uppercase font-sans text-white/90">View Project →</span>
        </div>
        {/* Year badge */}
        <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm border border-border text-[9px] tracking-[2px] uppercase text-brown-2 px-2.5 py-1 rounded-sm">
          {project.year}
        </div>
        {/* Category badge */}
        <div className="absolute top-4 right-4 bg-[#E4C7B8]/90 backdrop-blur-sm border border-[#D0C7C3] text-[9px] tracking-[1.5px] uppercase text-[#56453f] px-2.5 py-1 rounded-sm">
          {project.subtitle}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 pb-6">
        <h3 className="font-serif font-light text-2xl text-brown leading-tight mb-1">{project.title}</h3>
        <p className="text-sm font-sans text-brown-2 leading-relaxed mb-4 font-light line-clamp-2">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-sm border border-border text-brown-3 bg-cream-3 font-sans tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Full clickable overlay */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="absolute inset-0 z-10"
        aria-label={`Open ${project.title} repository`}
      />
    </motion.article>
  );
}

export default function Projects() {
  const ref          = useRef(null);
  const inView       = useInView(ref, { once: true, margin: '-80px' });
  const containerRef = useRef(null);

  const [activeFilter,   setActiveFilter]   = useState('all');
  const [isDragging,     setIsDragging]     = useState(false);
  const dragHasMoved = useRef(false);
  const startX       = useRef(0);
  const scrollLeft   = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide,    setActiveSlide]    = useState(1);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft: sL, scrollWidth, clientWidth } = containerRef.current;
    setScrollProgress(scrollWidth > clientWidth ? (sL / (scrollWidth - clientWidth)) * 100 : 0);
    const cards = containerRef.current.querySelectorAll('article');
    if (!cards.length) return;
    const center = sL + clientWidth / 2;
    let closest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setActiveSlide(closest + 1);
  };

  const onMouseDown  = (e) => { setIsDragging(true); dragHasMoved.current = false; startX.current = e.pageX - containerRef.current.offsetLeft; scrollLeft.current = containerRef.current.scrollLeft; };
  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp    = () => setIsDragging(false);
  const onMouseMove  = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    if (Math.abs(x - startX.current) > 5) dragHasMoved.current = true;
    containerRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const onClickCapture = (e) => { if (dragHasMoved.current) { e.preventDefault(); e.stopPropagation(); } };

  const arrow = (dir) => {
    const c = containerRef.current;
    if (!c) return;
    const card = c.querySelector('article');
    if (!card) return;
    c.scrollBy({ left: (card.offsetWidth + 24) * (dir === 'prev' ? -1 : 1), behavior: 'smooth' });
  };

  useEffect(() => { window.addEventListener('resize', handleScroll); return () => window.removeEventListener('resize', handleScroll); }, []);
  useEffect(() => { setTimeout(handleScroll, 100); }, [activeFilter]);

  return (
    <section id="proyek" className="bg-cream border-t border-border overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
              <span className="inline-block w-8 h-px bg-[#9d8c84]" />
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-light text-brown tracking-tight leading-[0.9]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Latest<br /><em className="italic">Projects.</em>
            </motion.h2>
          </div>

          {/* Filter + arrows */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  data-cursor-hover
                  className={`text-[11px] px-4 py-2 rounded-sm border transition-all duration-300 tracking-[1.5px] uppercase font-sans ${
                    activeFilter === f.key
                      ? 'bg-brown text-cream border-brown'
                      : 'bg-transparent text-brown-2 border-border hover:border-[#9d8c84] hover:text-brown'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {['prev', 'next'].map((d) => (
                <button
                  key={d}
                  onClick={() => arrow(d)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-brown hover:bg-brown hover:text-cream hover:border-brown transition-all duration-300"
                  aria-label={d === 'prev' ? 'Previous' : 'Next'}
                  data-cursor-hover
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={d === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrollable card track */}
      <div className="relative w-full pl-6 md:pl-10 lg:pl-[max(40px,calc((100vw-1400px)/2+40px))]">
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onScroll={handleScroll}
          onClickCapture={onClickCapture}
          data-cursor-drag
          className="flex gap-5 overflow-x-auto scrollbar-none pb-10 pr-6 scroll-smooth"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} isDragging={isDragging} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar + counter */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-28 flex items-center justify-between gap-6 border-t border-border pt-6">
        <div className="font-sans text-[10px] tracking-[4px] uppercase text-brown-2">
          {String(activeSlide).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
        </div>
        <div className="flex-1 max-w-[180px] h-[1px] bg-border/60 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-brown transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <a
          href="https://github.com/Lahnsea"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-sans tracking-[2px] uppercase text-brown hover:text-brown-2 transition-colors font-medium flex items-center gap-1"
          data-cursor-hover
        >
          All Projects on GitHub ↗
        </a>
      </div>
    </section>
  );
}
