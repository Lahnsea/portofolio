import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── localStorage helpers ─── */
const STORAGE_KEY = 'portfolio_comments';

function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

/* ─── Comment card ─── */
function CommentCard({ comment, onDelete }) {
  const date = new Date(comment.timestamp);
  const timeAgo = (() => {
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60)   return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div
        style={{
          padding: '4px',
          background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
        }}
      >
        <div style={{ padding: '3px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
          <div className="bg-cream p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                {/* Avatar monogram */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-cream text-[10px] font-serif font-light flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #56453f, #8B6E5A)' }}
                >
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-serif text-sm text-brown font-light leading-none mb-0.5">{comment.name}</p>
                  <p className="font-sans text-[8px] tracking-[1px] uppercase text-brown-3">{timeAgo}</p>
                </div>
              </div>
              <button
                onClick={() => onDelete(comment.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-brown-3 hover:text-brown p-1"
                aria-label="Delete comment"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm font-sans text-brown-2 leading-relaxed font-light">{comment.text}</p>
            {comment.image && (
              <div className="mt-3 overflow-hidden border border-border" style={{ maxHeight: '140px' }}>
                <img src={comment.image} alt="Comment attachment" className="w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-1 text-center">
        <p className="font-sans" style={{ fontSize: '6.5px', letterSpacing: '1px', color: '#857872', textTransform: 'uppercase' }}>
          Comment · {comment.id.slice(-4)}
        </p>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus]         = useState('idle');
  const [focusedField, setFocusedField] = useState(null);

  /* Comments state */
  const [comments, setComments]     = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentImg, setCommentImg] = useState(null);
  const [commentStatus, setCommentStatus] = useState('idle'); // idle | posting | done
  const fileRef = useRef(null);

  useEffect(() => { setComments(loadComments()); }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const name    = e.target.name.value;
    const email   = e.target.email.value;
    const message = e.target.message.value;
    const subject = encodeURIComponent(`Portfolio Contact – ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:fadlansyahrullohajib@gmail.com?subject=${subject}&body=${body}`;
    setStatus('sent');
    setTimeout(() => { setStatus('idle'); e.target.reset(); }, 3000);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCommentImg(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handlePostComment(e) {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    setCommentStatus('posting');
    const newComment = {
      id: Date.now().toString(),
      name: commentName.trim(),
      text: commentText.trim(),
      image: commentImg || null,
      timestamp: Date.now(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(updated);
    setCommentName('');
    setCommentText('');
    setCommentImg(null);
    if (fileRef.current) fileRef.current.value = '';
    setTimeout(() => setCommentStatus('idle'), 600);
  }

  function handleDeleteComment(id) {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
    saveComments(updated);
  }

  const getInputClass = (field) =>
    `w-full bg-transparent border-b ${
      focusedField === field ? 'border-[#56453f]' : 'border-border/80'
    } py-3 text-sm font-sans text-brown placeholder:text-brown-3/40 focus:outline-none transition-all duration-300`;

  return (
    <section id="kontak" className="bg-cream border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
              <span className="inline-block w-8 h-px bg-[#9d8c84]" />
              Get In Touch
            </p>
            <h2
              className="font-serif font-light text-brown leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Let's<br /><em className="italic">Collaborate.</em>
            </h2>
          </motion.div>

          {/* ── Row 1: Contact info + Contact form ── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-20"
          >
            {/* Left — CTA text */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <p className="text-sm font-sans text-brown-2 leading-relaxed font-light max-w-sm">
                Have a project idea, question, or just want to chat? Fill out the form or reach out directly. Let's make something incredible together.
              </p>

              {/* Contact links */}
              <div className="flex flex-col divide-y divide-border border-t border-b border-border/80">
                {[
                  { label: 'EMAIL',  value: 'fadlansyahrullohajib@gmail.com', href: 'mailto:fadlansyahrullohajib@gmail.com' },
                  { label: 'GITHUB', value: 'github.com/Lahnsea',             href: 'https://github.com/Lahnsea' },
                ].map(({ label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 py-5 group transition-all duration-300 hover:pl-2"
                  >
                    <span className="text-[9px] tracking-[3px] uppercase text-brown-3 min-w-[60px] font-sans font-medium">{label}</span>
                    <span className="text-xs md:text-sm font-sans text-brown group-hover:text-brown-2 transition-colors flex-1 truncate">{value}</span>
                    <span className="text-brown-3 group-hover:text-brown group-hover:translate-x-1.5 transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>

              {/* Social cards */}
              <div>
                <p className="text-[9px] tracking-[3px] uppercase text-brown-3 font-sans mb-4 font-medium">Social Links</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'GitHub',    href: 'https://github.com/Lahnsea',           icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                    { label: 'LinkedIn',  href: 'https://linkedin.com/',                icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                    { label: 'Instagram', href: 'https://instagram.com/',               icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="group flex items-center gap-2 px-3 py-2 border border-border hover:border-[#9d8c84] hover:bg-cream-2 transition-all duration-300"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-brown-3 group-hover:text-brown transition-colors"
                      >
                        <path d={social.icon} />
                      </svg>
                      <span className="text-[9px] tracking-[1.5px] uppercase font-sans text-brown-3 group-hover:text-brown transition-colors">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-7 p-1">
              {/* Outer elegant stone frame */}
              <div
                style={{
                  padding: '5px',
                  background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div style={{ padding: '4px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
                  <div className="relative bg-cream p-8 md:p-10 overflow-hidden">
                    <h3 className="font-serif text-xl text-brown font-light mb-8 pb-3 border-b border-border/40">
                      Send a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className={`text-[9px] tracking-[3px] uppercase font-sans transition-colors duration-300 ${focusedField === 'name' ? 'text-brown font-semibold' : 'text-brown-3'}`}>
                          Name
                        </label>
                        <input
                          type="text" name="name" required placeholder="Full name"
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={getInputClass('name')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={`text-[9px] tracking-[3px] uppercase font-sans transition-colors duration-300 ${focusedField === 'email' ? 'text-brown font-semibold' : 'text-brown-3'}`}>
                          Email
                        </label>
                        <input
                          type="email" name="email" required placeholder="email@example.com"
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={getInputClass('email')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={`text-[9px] tracking-[3px] uppercase font-sans transition-colors duration-300 ${focusedField === 'message' ? 'text-brown font-semibold' : 'text-brown-3'}`}>
                          Message
                        </label>
                        <textarea
                          name="message" required rows={4} placeholder="Tell me about your project or inquiry…"
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={`${getInputClass('message')} resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'sent'}
                        className={`group self-start inline-flex items-center gap-2.5 px-8 py-3.5 rounded-sm text-xs font-sans font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                          status === 'sent'
                            ? 'bg-green-700 border-green-700 text-cream shadow-sm'
                            : 'bg-brown text-cream border-brown hover:bg-brown-2 hover:border-brown-2 shadow-sm'
                        }`}
                      >
                        {status === 'sent' ? (
                          <span>✓ Message Sent</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-2.5 px-0.5 text-center opacity-60">
                <p className="font-sans leading-tight" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
                  Correspondence · Desk 01
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Row 2: Comments Section ── */}
          <motion.div variants={fadeUp}>
            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <span className="inline-block w-8 h-px bg-[#9d8c84]" />
              <span className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3">Comments</span>
              <span className="flex-1 h-px bg-border/60" />
              <span className="text-[10px] font-sans text-brown-3 tracking-wide">
                {comments.length} comment{comments.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left: Comment form */}
              <div className="lg:col-span-5">
                <div
                  style={{
                    padding: '5px',
                    background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ padding: '4px', background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)' }}>
                    <div className="bg-cream p-6 md:p-8">
                      <h3 className="font-serif text-lg text-brown font-light mb-2 pb-3 border-b border-border/40">
                        Leave a Comment
                      </h3>
                      <p className="text-xs font-sans text-brown-3 mb-6 font-light">
                        Leave your thoughts here.
                      </p>

                      <form onSubmit={handlePostComment} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            className="w-full bg-transparent border-b border-border/80 py-3 text-sm font-sans text-brown placeholder:text-brown-3/40 focus:outline-none focus:border-[#56453f] transition-all duration-300"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] tracking-[3px] uppercase font-sans text-brown-3">Your Comment</label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Share your thoughts…"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full bg-transparent border-b border-border/80 py-3 text-sm font-sans text-brown placeholder:text-brown-3/40 focus:outline-none focus:border-[#56453f] transition-all duration-300 resize-none"
                          />
                        </div>

                        {/* Image upload */}
                        <div>
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="comment-image"
                          />
                          <label
                            htmlFor="comment-image"
                            className="inline-flex items-center gap-2 text-[10px] tracking-[2px] uppercase font-sans text-brown-3 hover:text-brown transition-colors cursor-pointer border border-border/60 hover:border-border px-3 py-2"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {commentImg ? 'Image Selected ✓' : 'Upload Image (optional)'}
                          </label>
                          {commentImg && (
                            <button
                              type="button"
                              onClick={() => { setCommentImg(null); if (fileRef.current) fileRef.current.value = ''; }}
                              className="ml-2 text-[9px] text-brown-3 hover:text-brown underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        {commentImg && (
                          <div className="overflow-hidden border border-border" style={{ maxHeight: '100px' }}>
                            <img src={commentImg} alt="Preview" className="w-full object-cover" />
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={commentStatus === 'posting'}
                          className="self-start inline-flex items-center gap-2.5 px-7 py-3 rounded-sm text-xs font-sans font-medium tracking-wider uppercase transition-all duration-300 bg-brown text-cream border border-brown hover:bg-brown-2 hover:border-brown-2 shadow-sm disabled:opacity-60 cursor-pointer"
                        >
                          {commentStatus === 'posting' ? 'Posting…' : 'Post Comment'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center opacity-60">
                  <p className="font-sans" style={{ fontSize: '7px', letterSpacing: '1.5px', color: '#857872', textTransform: 'uppercase' }}>
                    Guestbook · Comments
                  </p>
                </div>
              </div>

              {/* Right: Comment feed */}
              <div className="lg:col-span-7">
                {comments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-10 h-10 mb-4 opacity-20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="font-serif font-light text-brown text-lg mb-1">No comments yet</p>
                    <p className="font-sans text-[10px] tracking-[2px] uppercase text-brown-3">Be the first to leave a thought.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} onDelete={handleDeleteComment} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
