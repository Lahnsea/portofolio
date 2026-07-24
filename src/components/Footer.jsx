export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EFE9E1 0%, #EAE3D8 100%)' }}
    >
      {/* ── Gallery Top Divider ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="inline-block w-8 h-px bg-brown-3/50" />
          <span className="text-[8px] tracking-[4px] uppercase font-sans text-brown-3">Gallery — Contact & Info</span>
          <span className="flex-1 h-px bg-border/60" />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

        {/* Brand info (col-span-6) — inside museum frame */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <div
            className="relative inline-block self-start"
            style={{
              padding: '5px',
              background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            <div style={{ padding: '4px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
              <div className="bg-cream px-6 py-4">
                <a href="#" className="font-serif text-2xl text-brown tracking-tight font-medium hover:text-brown-2 transition-colors duration-200 block mb-1">
                  FADLAN.
                </a>
                <p className="text-[9px] tracking-[2px] uppercase font-sans text-brown-3/80">Portfolio · Indonesia 🇮🇩</p>
              </div>
            </div>
          </div>

          <p className="text-sm font-sans text-brown-2 leading-relaxed font-light max-w-[300px]">
            Building design-driven, high-performance digital experiences from Indonesia. Open to freelance, collaboration, and full-time opportunities.
          </p>

          {/* Available badge */}
          <div className="flex items-center gap-2.5 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] tracking-[2.5px] uppercase font-sans text-brown-3">Available for opportunities</span>
          </div>
        </div>

        {/* Navigation (col-span-3) — inside museum frame */}
        <div className="md:col-span-3">
          {/* Frame */}
          <div
            className="relative"
            style={{
              padding: '4px',
              background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
            }}
          >
            <div style={{ padding: '3px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
              <div className="bg-cream p-5 flex flex-col gap-3">
                <p className="text-[8px] tracking-[3px] uppercase text-brown-3 mb-1 font-medium border-b border-border pb-2">Navigation</p>
                {[
                  { label: 'About',     href: '#tentang' },
                  { label: 'Portfolio', href: '#showcase' },
                  { label: 'Journey',   href: '#perjalanan' },
                  { label: 'Contact',   href: '#kontak' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group text-sm font-sans text-brown-2 hover:text-brown transition-colors tracking-wide flex items-center gap-2 self-start"
                  >
                    <span className="h-px w-0 bg-brown group-hover:w-3.5 transition-all duration-300" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Museum placard */}
          <div className="mt-1.5 text-center">
            <p className="font-sans" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
              Sitemap · Directory
            </p>
          </div>
        </div>

        {/* Socials (col-span-3) — inside museum frame */}
        <div className="md:col-span-3">
          {/* Frame */}
          <div
            className="relative"
            style={{
              padding: '4px',
              background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
            }}
          >
            <div style={{ padding: '3px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
              <div className="bg-cream p-5 flex flex-col gap-3">
                <p className="text-[8px] tracking-[3px] uppercase text-brown-3 mb-1 font-medium border-b border-border pb-2">Socials & Contact</p>
                {[
                  { label: 'GitHub ↗', href: 'https://github.com/Lahnsea' },
                  { label: 'Email ↗',  href: 'mailto:fadlansyahrullohajib@gmail.com' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group text-sm font-sans text-brown-2 hover:text-brown transition-colors tracking-wide flex items-center gap-2 self-start"
                  >
                    <span className="h-px w-0 bg-brown group-hover:w-3.5 transition-all duration-300" />
                    {item.label}
                  </a>
                ))}

                {/* Spotlight accent */}
                <div className="mt-2 pt-2 border-t border-border/60">
                  <p className="text-[9px] font-sans text-brown-3/70 tracking-wide leading-relaxed">
                    Available for freelance & full-time roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Museum placard */}
          <div className="mt-1.5 text-center">
            <p className="font-sans" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
              Correspondence · Connect
            </p>
          </div>
        </div>
      </div>

      {/* ── Horizontal gold separator ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E40, #C9A96E70, #C9A96E40, transparent)' }} />
      </div>

      {/* Massive Infinite Marquee Banner — FADLAN (kept as-is) */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-6 relative z-0">
        <div className="flex whitespace-nowrap w-full">
          <div className="marquee-track flex gap-16 pr-16">
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
          </div>
          <div className="marquee-track flex gap-16 pr-16" aria-hidden="true">
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.06] font-bold tracking-tight">FADLAN</span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border/50 relative z-10" style={{ background: 'rgba(220,211,200,0.5)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[9px] font-sans text-brown-3 tracking-widest uppercase">
            © {year} Fadlansyahrulloh Ajib. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {/* Gold accent separator */}
            <span className="w-px h-3" style={{ background: 'linear-gradient(180deg, transparent, #C9A96E60, transparent)' }} />
            <p className="text-[9px] font-sans text-brown-3 tracking-widest uppercase flex items-center gap-1.5">
              Built with React <span className="text-[8px] text-[#C9A96E]">•</span> Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
