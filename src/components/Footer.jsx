export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#EFE5D5] border-t border-border">
      {/* Top row */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <a href="#" className="font-serif text-2xl text-brown tracking-tight self-start">
            FADLAN.
          </a>
          <p className="text-sm font-sans text-brown-2 leading-relaxed font-light max-w-[220px]">
            Building digital experiences from Indonesia 🇮🇩
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <p className="text-[9px] tracking-[3px] uppercase text-brown-3 mb-2">Navigation</p>
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
              className="text-sm font-sans text-brown-2 hover:text-brown transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <p className="text-[9px] tracking-[3px] uppercase text-brown-3 mb-2">Links</p>
          <a
            href="https://github.com/Lahnsea"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans text-brown-2 hover:text-brown transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="mailto:fadlansyahrullohajib@gmail.com"
            className="text-sm font-sans text-brown-2 hover:text-brown transition-colors"
          >
            Email ↗
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-sans text-brown-3 tracking-wide">
            © {year} Fadlansyahrulloh Ajib. All rights reserved.
          </p>
          <p className="text-[10px] font-sans text-brown-3 tracking-wide">
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
