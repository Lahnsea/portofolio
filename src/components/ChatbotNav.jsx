import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Knowledge Base ─────────────────────────────────────────────────────────
const KB = [
  {
    keys: ['halo', 'hai', 'hello', 'hi', 'hey', 'selamat', 'salam', 'p', 'hei'],
    answer:
      'Halo! 👋 Selamat datang di portofolio Fadlan.\nSaya siap menjawab pertanyaan seputar Fadlan, keahlian, proyek, atau cara menghubungi. Silakan tanya apa saja!',
  },
  {
    keys: ['siapa', 'who', 'kamu', 'fadlan', 'nama', 'name', 'perkenalan', 'diri', 'tentang', 'about'],
    answer:
      'Saya **Fadlansyahrulloh Ajib** 👋\n\nSeorang developer muda dari Indonesia yang berfokus pada pengembangan digital yang elegan dan berperforma tinggi. Saya passionate di bidang:\n\n⚛️ Frontend Development\n📱 Mobile Development\n🕹️ Game Development\n🎨 UI/UX Design',
  },
  {
    keys: ['kerja', 'bidang', 'spesialisasi', 'skill', 'keahlian', 'bisa', 'work', 'expertise', 'apa yang', 'kemampuan'],
    answer:
      'Saya bekerja di beberapa bidang:\n\n• **Frontend** — React, HTML, CSS, JavaScript, Tailwind\n• **Mobile** — Flutter & Dart\n• **Game Dev** — Unity 2D & C#\n• **UI/UX Design** — antarmuka premium & intuitif\n• **Fullstack & AI** — eksplorasi backend dan AI',
  },
  {
    keys: ['project', 'proyek', 'portofolio', 'karya', 'dibuat', 'projects', 'hasil', 'buatan'],
    answer:
      'Proyek unggulan saya:\n\n🚉 **APP-KRL** — Pelacak kereta real-time dengan Flutter & API Transit.\n\n⚔️ **Aetheria2D** — Game platformer 2D narrative-driven di Unity & C#.\n\n🌐 **Portfolio Website** — Website ini sendiri, dibangun dengan React + Tailwind CSS.',
  },
  {
    keys: ['sertifikat', 'certificate', 'sertifikasi', 'award', 'penghargaan', 'achievements'],
    answer:
      'Fadlan memiliki berbagai sertifikat di bidang pemrograman dan desain. Cek bagian **Certificates & Awards** di halaman ini untuk melihat selengkapnya! 🏅',
  },
  {
    keys: ['perjalanan', 'journey', 'karir', 'pendidikan', 'latar', 'background', 'career', 'path', 'milestone', 'pengalaman', 'experience'],
    answer:
      'Perjalanan Fadlan dimulai dari rasa penasaran terhadap teknologi dan desain. Terus berkembang melalui berbagai proyek, belajar mandiri, dan eksplorasi teknologi modern.\n\nCek bagian **My Path** untuk timeline lengkapnya! 🗺️',
  },
  {
    keys: ['kontak', 'contact', 'hire', 'collab', 'kolaborasi', 'hubungi', 'email', 'rekrut', 'freelance', 'kerja sama'],
    answer:
      'Fadlan **terbuka untuk peluang baru** 🟢\n\nFreelance, kolaborasi proyek, maupun posisi full-time!\n\n📧 **Email:** fadlansyahrullohajib@gmail.com\n🐙 **GitHub:** github.com/Lahnsea\n\nAtau isi form di bagian **Let\'s Collaborate** di halaman ini.',
  },
  {
    keys: ['github', 'repo', 'kode', 'source', 'code', 'open source'],
    answer:
      'Kode-kode Fadlan bisa dilihat di:\n\n🐙 **GitHub: github.com/Lahnsea**\n\nDi sana ada semua proyek open-source dan eksperimen yang pernah dibuat.',
  },
  {
    keys: ['teknologi', 'tech', 'stack', 'tools', 'tool', 'framework', 'bahasa', 'language', 'pakai', 'gunakan'],
    answer:
      'Tech stack Fadlan:\n\n⚛️ React · Next.js\n🎯 Flutter · Dart\n🕹️ Unity · C#\n🌐 HTML · CSS · JavaScript\n🎨 Tailwind CSS\n🐍 Python\n🐙 Git & GitHub',
  },
  {
    keys: ['indonesia', 'lokasi', 'tinggal', 'location', 'where', 'domisili', 'dari mana', 'asal'],
    answer:
      'Fadlan berbasis di **Indonesia** 🇮🇩\n\nMeski begitu, terbuka untuk bekerja secara **remote** di mana saja di seluruh dunia!',
  },
  {
    keys: ['ui', 'ux', 'design', 'desain', 'antarmuka', 'interface', 'tampilan'],
    answer:
      'Salah satu passion utama Fadlan adalah **UI/UX Design** — menciptakan antarmuka yang tidak hanya indah secara visual, tetapi juga intuitif dan elegan.\n\nSeperti website portofolio yang sedang kamu lihat ini! ✨',
  },
  {
    keys: ['umur', 'usia', 'age', 'lahir', 'born', 'berapa tahun'],
    answer:
      'Fadlan adalah developer muda dari Indonesia yang terus berkembang. Untuk informasi lebih lanjut, jangan ragu hubungi langsung lewat form kontak! 😊',
  },
  {
    keys: ['flutter', 'dart', 'mobile', 'aplikasi', 'app', 'android', 'ios'],
    answer:
      'Fadlan menggunakan **Flutter & Dart** untuk mobile development.\n\nSalah satu proyeknya adalah **APP-KRL** — aplikasi pelacak kereta real-time yang memanfaatkan Flutter dan Transit API. 🚉',
  },
  {
    keys: ['unity', 'game', 'gaming', 'c#', 'csharp', '2d', 'platformer'],
    answer:
      'Fadlan membuat game menggunakan **Unity** dengan bahasa **C#**.\n\nProyek terbarunya: **Aetheria2D** — game platformer 2D dengan alur cerita yang mendalam. ⚔️',
  },
  {
    keys: ['react', 'next', 'nextjs', 'frontend', 'web', 'website', 'tailwind'],
    answer:
      'Fadlan mahir dalam **React** dan **Next.js** untuk frontend, dengan styling menggunakan **Tailwind CSS**.\n\nPortofolio website ini sendiri adalah bukti nyata kemampuannya! 🌐',
  },
  {
    keys: ['terima kasih', 'makasih', 'thanks', 'thank you', 'thx', 'tq'],
    answer: 'Sama-sama! 😊 Jika ada pertanyaan lain seputar Fadlan atau websitenya, jangan ragu untuk tanya ya!',
  },
  {
    keys: ['bagus', 'keren', 'mantap', 'nice', 'great', 'wow', 'kece', 'amazing', 'awesome', 'cool'],
    answer: 'Terima kasih! 🙏✨ Semua ini dirancang dengan penuh dedikasi. Apakah ada yang ingin kamu ketahui lebih lanjut?',
  },
  {
    keys: ['python', 'ai', 'machine learning', 'ml', 'data', 'backend'],
    answer:
      'Selain frontend dan mobile, Fadlan juga mengeksplorasi **Python**, **AI**, dan **backend development**.\n\nIni menjadi bagian dari perjalanannya menuju fullstack & AI engineering! 🤖',
  },
];

function matchAnswer(input) {
  const lower = input.toLowerCase().trim();

  // Cek frasa multi-kata dulu (prioritas lebih tinggi)
  for (const entry of KB) {
    const multiWord = entry.keys.filter((k) => k.includes(' '));
    if (multiWord.some((k) => lower.includes(k))) return entry.answer;
  }
  // Kemudian cek kata tunggal
  for (const entry of KB) {
    const singleWord = entry.keys.filter((k) => !k.includes(' '));
    if (singleWord.some((k) => lower.includes(k))) return entry.answer;
  }

  return 'Hmm, saya belum punya jawaban untuk itu. 🤔\n\nCoba tanyakan tentang:\n• Siapa Fadlan\n• Keahlian & tech stack\n• Proyek yang dibuat\n• Cara menghubungi\n• Sertifikat & penghargaan';
}

function parseMarkdown(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// ── Suggestions ───────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Siapa Fadlan?',
  'Proyek apa saja?',
  'Tech stack apa?',
  'Cara menghubungi?',
  'Pengalaman apa?',
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function ChatbotNav() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Halo! 👋 Saya asisten virtual Fadlan.\nTanyakan apa saja tentang Fadlan, keahlian, proyek, atau cara menghubunginya!',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  // Listen to close-chatbot event from side menu
  useEffect(() => {
    const handleClose = () => setOpen(false);
    window.addEventListener('close-chatbot', handleClose);
    return () => window.removeEventListener('close-chatbot', handleClose);
  }, []);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q || typing) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setTyping(true);
    setTimeout(() => {
      const answer = matchAnswer(q);
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
      if (!open) setUnread((n) => n + 1);
    }, 600 + Math.random() * 400);
  };

  const handleToggle = () => {
    const nextState = !open;
    setOpen(nextState);
    if (nextState) {
      window.dispatchEvent(new CustomEvent('close-sidenav'));
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Chatbot Trigger Tab ── */}
      <motion.button
        id="chatbot-nav-trigger"
        aria-label="Open virtual assistant"
        onClick={handleToggle}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 z-[900] flex flex-col items-center justify-center gap-[4px] w-10 h-14 bg-cream border border-border border-l-0 rounded-r-sm shadow-[2px_0_16px_rgba(86,69,63,0.08)] hover:bg-cream-2 transition-colors duration-300"
        style={{ top: 'calc(50% + 52px)' }}
      >
        <div className="relative">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={open ? '#8B6F65' : '#9d8c84'}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="0.5" fill={open ? '#8B6F65' : '#9d8c84'} />
            <circle cx="12" cy="10" r="0.5" fill={open ? '#8B6F65' : '#9d8c84'} />
            <circle cx="15" cy="10" r="0.5" fill={open ? '#8B6F65' : '#9d8c84'} />
          </svg>
          {!open && unread > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #B89055)', fontSize: '7px', fontWeight: 700 }}
            >
              {unread}
            </span>
          )}
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="chat-backdrop"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[850]"
            />

            <motion.div
              key="chat-panel"
              initial={{ x: -420, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -420, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 z-[860] flex"
              style={{ top: '108px', bottom: '0px', width: 'min(380px, 92vw)' }}
            >
              {/* Accent strip */}
              <div className="w-1 h-full flex-shrink-0 bg-gradient-to-b from-[#e0d0c8] via-[#c9b4ac] to-[#e0d0c8]" />

              {/* Outer frame */}
              <div
                className="flex flex-col flex-1 h-full"
                style={{
                  padding: '5px 5px 5px 0',
                  background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                  boxShadow: '4px 0 24px rgba(86,69,63,0.12), 0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                {/* Inner border */}
                <div
                  className="flex flex-col flex-1 h-full overflow-hidden"
                  style={{ padding: '3px 3px 3px 0', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}
                >
                  <div className="flex flex-col h-full overflow-hidden bg-[#FAF8F5]">

                    {/* Header */}
                    <div
                      className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
                      style={{ borderColor: '#E0DAD4', background: 'linear-gradient(135deg, #F5F0EB, #EDE6DC)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #C9A96E, #B89055)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-serif text-brown text-sm leading-none">Ask Fadlan</p>
                          <p className="font-sans text-[8px] tracking-[2px] uppercase text-brown-3 mt-0.5 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse inline-block" />
                            Virtual Assistant · Online
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        aria-label="Close chatbot"
                        className="w-7 h-7 flex items-center justify-center text-brown-3 hover:text-brown transition-colors rounded-sm hover:bg-cream-2"
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <line x1="1" y1="1" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="10" y1="1" x2="1" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-none">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.role === 'bot' && (
                            <div
                              className="w-5 h-5 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center"
                              style={{ background: 'linear-gradient(135deg, #C9A96E, #B89055)' }}
                            >
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                            </div>
                          )}
                          <div
                            className="max-w-[82%] px-3.5 py-2.5 font-sans leading-relaxed"
                            style={{
                              fontSize: '12px',
                              background: msg.role === 'user'
                                ? 'linear-gradient(135deg, #C9A96E, #B89055)'
                                : 'linear-gradient(145deg, #FFFFFF, #F5F1EC)',
                              color: msg.role === 'user' ? '#FFF8F0' : '#5A4A44',
                              border: msg.role === 'bot' ? '1px solid #E0DAD4' : 'none',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                              borderRadius: msg.role === 'user' ? '8px 2px 8px 8px' : '2px 8px 8px 8px',
                            }}
                            dangerouslySetInnerHTML={{
                              __html: msg.text
                                .split('\n')
                                .map((l) => `<span style="display:block;${l === '' ? 'height:6px' : 'margin-bottom:1px'}">${parseMarkdown(l)}</span>`)
                                .join(''),
                            }}
                          />
                        </div>
                      ))}

                      {/* Typing indicator */}
                      {typing && (
                        <div className="flex gap-2 justify-start">
                          <div
                            className="w-5 h-5 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #C9A96E, #B89055)' }}
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                          </div>
                          <div
                            className="px-3.5 py-2.5 flex items-center gap-1.5"
                            style={{
                              background: 'linear-gradient(145deg, #FFFFFF, #F5F1EC)',
                              border: '1px solid #E0DAD4',
                              borderRadius: '2px 8px 8px 8px',
                            }}
                          >
                            {[0, 1, 2].map((d) => (
                              <span
                                key={d}
                                style={{
                                  width: 6, height: 6, borderRadius: '50%',
                                  background: '#C9A96E',
                                  display: 'inline-block',
                                  animation: `chatbotBounce 1.2s ease-in-out ${d * 0.15}s infinite`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <div ref={bottomRef} />
                    </div>

                    {/* Suggestion Chips */}
                    {messages.length <= 2 && (
                      <div className="px-4 pb-2 flex flex-wrap gap-1.5 border-t border-[#E8E2DC] pt-2.5 flex-shrink-0">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="text-[10px] font-sans px-2.5 py-1 rounded-sm border text-brown-2 hover:text-brown hover:border-brown-3 transition-all duration-200"
                            style={{ borderColor: '#D8D3CE', background: '#FAF8F5' }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Gold separator */}
                    <div className="mx-4 h-px flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E40, transparent)' }} />

                    {/* Input Row */}
                    <div className="px-3 py-3 flex gap-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F5F0EB, #EDE6DC)' }}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Tanya tentang Fadlan…"
                        className="flex-1 font-sans px-3 py-2 outline-none bg-white/70 text-brown placeholder-brown-3/60 rounded-sm"
                        style={{ fontSize: '12px', border: '1px solid #D8D3CE' }}
                      />
                      <button
                        onClick={() => send()}
                        disabled={!input.trim() || typing}
                        className="w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-200 flex-shrink-0"
                        style={{
                          background: input.trim() && !typing ? 'linear-gradient(135deg, #C9A96E, #B89055)' : '#E0DAD4',
                          color: input.trim() && !typing ? 'white' : '#A89890',
                        }}
                        aria-label="Send"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center py-1.5 flex-shrink-0" style={{ background: '#EDE6DC' }}>
                      <p className="font-sans" style={{ fontSize: '7px', letterSpacing: '2px', color: '#A89080', textTransform: 'uppercase' }}>
                        Ask Fadlan · Portfolio Assistant
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyframes */}
      <style>{`
        @keyframes chatbotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
