export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#EFE5D5] border-t border-border">
      {/* Top row */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Brand info (col-span-6) */}
        <div className="md:col-span-6 flex flex-col gap-5">
          <a href="#" className="font-serif text-2xl text-brown tracking-tight self-start font-medium hover:text-brown-2 transition-colors duration-200">
            FADLAN.
          </a>
          <p className="text-sm font-sans text-brown-2 leading-relaxed font-light max-w-[280px]">
            Building design-driven, high-performance digital experiences from Indonesia 🇮🇩.
          </p>
        </div>

        {/* Navigation (col-span-3) */}
        <div className="md:col-span-3 flex flex-col gap-3.5">
          <p className="text-[9px] tracking-[3px] uppercase text-brown-3 mb-2 font-medium">Navigation</p>
          {[
            { label: 'About',        href: '#tentang' },
            { label: 'Skills',       href: '#keahlian' },
            { label: 'Projects',     href: '#proyek' },
            { label: 'Certificates', href: '#sertifikat' },
            { label: 'Journey',      href: '#perjalanan' },
            { label: 'Contact',      href: '#kontak' },
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

        {/* External Links (col-span-3) */}
        <div className="md:col-span-3 flex flex-col gap-3.5">
          <p className="text-[9px] tracking-[3px] uppercase text-brown-3 mb-2 font-medium">Socials & Contact</p>
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
        </div>
      </div>

      {/* Massive Infinite Marquee Banner */}
      <div className="w-full overflow-hidden select-none mt-8 border-t border-border/20 pt-8 relative z-0">
        <div className="flex whitespace-nowrap w-full">
          <div className="marquee-track flex gap-16 pr-16">
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
          </div>
          <div className="marquee-track flex gap-16 pr-16" aria-hidden="true">
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
            <span className="font-serif text-[14vw] leading-none text-[#56453f] opacity-[0.03] hover:opacity-10 hover:text-brown active:opacity-25 transition-all duration-300 font-bold tracking-tight cursor-default pointer-events-auto">FADLAN</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-[#EFE5D5] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-sans text-brown-3 tracking-widest uppercase">
            © {year} Fadlansyahrulloh Ajib. All rights reserved.
          </p>
          <p className="text-[10px] font-sans text-brown-3 tracking-widest uppercase flex items-center gap-1.5">
            Built with React <span className="text-[8px]">•</span> Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
