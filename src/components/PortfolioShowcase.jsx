import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Devicon CDN ─── */
const DV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/* ─── DATA ─── */
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
];

const skills = [
  { name: 'HTML / CSS',     cat: 'Frontend', year: '2021', icon: `${DV}/html5/html5-original.svg` },
  { name: 'JavaScript',     cat: 'Frontend', year: '2021', icon: `${DV}/javascript/javascript-original.svg` },
  { name: 'React.js',       cat: 'Frontend', year: '2022', icon: `${DV}/react/react-original.svg` },
  { name: 'Tailwind CSS',   cat: 'Frontend', year: '2022', icon: `${DV}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Flutter',        cat: 'Mobile',   year: '2022', icon: `${DV}/flutter/flutter-original.svg` },
  { name: 'Dart',           cat: 'Mobile',   year: '2022', icon: `${DV}/dart/dart-original.svg` },
  { name: 'Java',           cat: 'Backend',  year: '2021', icon: `${DV}/java/java-original.svg` },
  { name: 'Python & AI',    cat: 'AI/ML',    year: '2023', icon: `${DV}/python/python-original.svg` },
  { name: 'Database',       cat: 'Backend',  year: '2022', icon: `${DV}/mysql/mysql-original.svg` },
  { name: 'API Integration',cat: 'Backend',  year: '2022', icon: `${DV}/fastapi/fastapi-original.svg` },
  { name: 'Unity 2D / C#',  cat: 'Game Dev', year: '2023', icon: `${DV}/unity/unity-original.svg` },
  { name: 'Figma',          cat: 'Design',   year: '2021', icon: `${DV}/figma/figma-original.svg` },
  { name: 'Git & GitHub',   cat: 'Tools',    year: '2021', icon: `${DV}/git/git-original.svg` },
  { name: 'Postman',        cat: 'Tools',    year: '2022', icon: `${DV}/postman/postman-original.svg` },
];

const catAccent = {
  Frontend:   '#A0866A',
  Mobile:     '#7A8A9A',
  Backend:    '#6A8A7A',
  'AI/ML':    '#9A8060',
  'Game Dev': '#7A80A0',
  Design:     '#9A7A8A',
  Tools:      '#808070',
};

const filters = [
  { key: 'all',    label: 'All' },
  { key: 'web',    label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'game',   label: 'Game' },
];

const tabs = [
  { key: 'projects',     label: 'Projects' },
  { key: 'certificates', label: 'Certificates' },
  { key: 'techstack',    label: 'Tech Stack' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Cert Modal ─── */
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
          className="relative max-w-3xl w-full p-1.5"
          style={{
            background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '4px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
            <div className="bg-cream overflow-hidden">
              <div className="w-full aspect-[4/3] bg-cream-3 overflow-hidden">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
              </div>
              <div className="px-6 py-5 border-t border-border flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif font-light text-lg text-brown leading-snug mb-1">{cert.title}</h3>
                  <p className="text-[10px] tracking-[2px] uppercase text-brown-3 font-sans">{cert.issuer} · {cert.date}</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-brown-2 hover:bg-brown hover:text-cream hover:border-brown transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── ProjectCard component ─── */
function ProjectCard({ project: p, isDragging }) {
  const [hovered, setHovered] = useState(false);
  const handleClick = (e) => { if (isDragging) { e.preventDefault(); e.stopPropagation(); } };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative transition-all duration-500"
        style={{
          padding: '5px',
          background: hovered
            ? 'linear-gradient(135deg, #C9A96E, #EDEAE5, #C9A96E)'
            : 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
          boxShadow: hovered
            ? '0 12px 30px rgba(201, 169, 110, 0.15), 0 4px 16px rgba(0,0,0,0.04)'
            : '0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        <div style={{ padding: '4px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
          <div className="relative overflow-hidden transition-all duration-500 bg-cream">
            <div className="relative overflow-hidden aspect-[4/3] bg-cream-3 pointer-events-none">
              <img
                src={p.image}
                alt={p.title}
                className={`w-full h-full object-cover object-top transition-all duration-700 ${hovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 169, 110, 0.15) 0%, transparent 70%)' }}
              />
              <div
                className="absolute top-4 left-4 border text-[9px] tracking-[2px] uppercase px-2.5 py-1 rounded-sm shadow-sm font-sans font-medium"
                style={{ background: '#FAF9F6', borderColor: '#D8D3CE', color: '#6B6460' }}
              >
                {p.year}
              </div>
              <div
                className="absolute top-4 right-4 border text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-sm shadow-sm font-sans font-medium"
                style={{ background: 'rgba(201, 169, 110, 0.12)', borderColor: 'rgba(201, 169, 110, 0.3)', color: '#C9A96E' }}
              >
                {p.subtitle}
              </div>
            </div>
            <div className="p-5 pb-6">
              <h3 className="font-serif font-light text-2xl text-brown leading-tight mb-2">{p.title}</h3>
              <p className="text-sm font-sans text-brown-2 leading-relaxed mb-5 font-light line-clamp-2">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-sm border border-border text-brown-3 bg-cream-3 font-sans tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2.5 px-0.5 transition-all duration-300 text-center" style={{ opacity: hovered ? 1 : 0.6 }}>
        <p className="font-sans leading-tight" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
          {p.subtitle} · Exhibit {p.id}
        </p>
      </div>
      <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={handleClick} className="absolute inset-0 z-10" aria-label={`Open ${p.title}`} />
    </motion.article>
  );
}

/* ─── Projects Tab ─── */
function ProjectsTab() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const dragHasMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1);

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

  useEffect(() => { setTimeout(handleScroll, 100); }, [activeFilter]);

  return (
    <div>
      {/* Filter + arrows */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
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
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={d === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Card strip */}
      <div className="relative w-full -mx-6 md:-mx-10 overflow-hidden">
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onScroll={handleScroll}
          onClickCapture={onClickCapture}
          className="flex gap-5 overflow-x-auto scrollbar-none pb-6 px-6 md:px-10 scroll-smooth"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} isDragging={isDragging} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between gap-6 border-t border-border pt-5 mt-2">
        <div className="font-sans text-[10px] tracking-[4px] uppercase text-brown-2">
          {String(activeSlide).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
        </div>
        <div className="flex-1 max-w-[180px] h-[1px] bg-border/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-brown transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
        </div>
        <a href="https://github.com/Lahnsea" target="_blank" rel="noopener noreferrer" className="text-[10px] font-sans tracking-[2px] uppercase text-brown hover:text-brown-2 transition-colors font-medium flex items-center gap-1">
          All Projects ↗
        </a>
      </div>
    </div>
  );
}

/* ─── Certificates Tab ─── */
function CertificatesTab() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelected(cert)}
            className="group cursor-pointer select-none"
          >
            <div
              className="relative transition-all duration-500"
              style={{
                padding: '4px',
                background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              <div style={{ padding: '3px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
                <div className="relative overflow-hidden bg-cream">
                  <div className="relative overflow-hidden aspect-[4/3] bg-cream-3">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 169, 110, 0.15) 0%, transparent 70%)' }}
                    />
                    <div
                      className="absolute top-3 right-3 border text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-sm shadow-sm font-sans font-medium"
                      style={{ background: 'rgba(201, 169, 110, 0.12)', borderColor: 'rgba(201, 169, 110, 0.3)', color: '#C9A96E' }}
                    >
                      {cert.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-light text-lg text-brown leading-snug mb-1.5 line-clamp-2">{cert.title}</h3>
                    <p className="text-xs font-sans text-brown-2 leading-relaxed mb-3 line-clamp-2 font-light">{cert.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] tracking-[2px] uppercase text-brown-3 font-sans">{cert.date}</span>
                      <span className="text-[9px] tracking-[1.5px] uppercase text-brown-3 font-sans truncate max-w-[140px] text-right">{cert.issuer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2.5 px-0.5 transition-all duration-300 text-center opacity-60 group-hover:opacity-100">
              <p className="font-sans leading-tight" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
                {cert.category} · Exhibit {cert.id}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-border flex items-center gap-4">
        <span className="font-serif text-4xl font-light text-brown">{certificates.length}</span>
        <span className="text-[10px] tracking-[3px] uppercase text-brown-3 font-sans">
          Certificate{certificates.length !== 1 ? 's' : ''} Earned
        </span>
      </div>
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

/* ─── Tech Stack Tab ─── */
function TechStackTab() {
  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.cat]) acc[s.cat] = [];
    acc[s.cat].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([cat, items], catIdx) => {
        const accent = catAccent[cat];
        return (
          <div key={cat}>
            {/* Wing header */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-sans text-[7px] tracking-[3px] uppercase" style={{ color: '#9A9390' }}>
                Wing {String(catIdx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-px" style={{ background: '#D8D3CE' }} />
              <span
                className="font-sans text-[8px] tracking-[2px] uppercase px-3 py-1"
                style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}33` }}
              >
                {cat}
              </span>
              <div className="h-px w-4" style={{ background: '#D8D3CE' }} />
            </div>

            {/* Gallery wall */}
            <div
              className="relative p-5 md:p-6"
              style={{
                background: 'linear-gradient(180deg, #FAF9F6 0%, #EDEAE5 100%)',
                boxShadow: '0 4px 20px rgba(44, 40, 37, 0.03), inset 0 1px 0 rgba(255,255,255,0.8)',
                border: '1px solid #D8D3CE',
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {items.map((skill, idx) => (
                  <div key={skill.name} className="group flex flex-col items-center gap-2">
                    {/* Mini exhibit frame */}
                    <div
                      className="relative flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-1"
                      style={{
                        padding: '3px',
                        background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                        width: '64px',
                        height: '64px',
                      }}
                    >
                      <div style={{ padding: '2px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          width={32}
                          height={32}
                          loading="lazy"
                          style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'grayscale(60%)', transition: 'filter 0.3s' }}
                          className="group-hover:!filter-none"
                          onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                          onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(60%)'}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <span
                        className="absolute top-1 right-1 font-sans"
                        style={{ fontSize: '5px', letterSpacing: '0.5px', color: '#9A9390' }}
                      >
                        {skill.year}
                      </span>
                    </div>
                    <span
                      className="font-serif font-light text-center leading-tight"
                      style={{ fontSize: '0.6rem', color: '#6B6460', letterSpacing: '0.02em' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-6 border-t border-border flex items-center gap-4">
        <span className="font-serif text-4xl font-light text-brown">{skills.length}</span>
        <span className="text-[10px] tracking-[3px] uppercase text-brown-3 font-sans">Technologies & Tools</span>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function PortfolioShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <section id="showcase" className="bg-cream border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20 md:pb-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
              <span className="inline-block w-8 h-px bg-[#9d8c84]" />
              Portfolio
            </p>
            <h2
              className="font-serif font-light text-brown tracking-tight leading-[0.9] mb-3"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Showcase.<br /><em className="italic">Explore.</em>
            </h2>
            <p className="text-sm font-sans text-brown-2 font-light max-w-md">
              Explore my journey through projects, certifications, and technical expertise.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div variants={fadeUp} className="mb-12">
            <div
              className="inline-flex p-1 gap-1"
              style={{
                background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                padding: '4px',
              }}
            >
              <div style={{ padding: '3px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
                <div className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-6 py-2.5 text-xs font-sans tracking-[2px] uppercase transition-all duration-300 ${
                        activeTab === tab.key
                          ? 'bg-brown text-cream'
                          : 'bg-transparent text-brown-2 hover:text-brown'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <motion.div
                          layoutId="tabIndicator"
                          className="absolute inset-0 bg-brown"
                          style={{ zIndex: -1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'projects'     && <ProjectsTab />}
              {activeTab === 'certificates' && <CertificatesTab />}
              {activeTab === 'techstack'    && <TechStackTab />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
