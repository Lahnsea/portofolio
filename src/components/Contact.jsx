import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState('idle');

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

  const inputCls = `w-full px-4 py-3 bg-[#EFE5D5] border border-border rounded-sm text-sm font-sans text-brown
    placeholder:text-brown-3 focus:outline-none focus:border-[#9d8c84] focus:bg-cream
    transition-all duration-300`;

  return (
    <section id="kontak" className="bg-cream border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28"
        >
          {/* Left — CTA text */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <motion.p variants={fadeUp} className="text-[10px] tracking-[4px] uppercase font-sans text-brown-3 flex items-center gap-3 mb-5">
                <span className="inline-block w-8 h-px bg-[#9d8c84]" />
                Get In Touch
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-light text-brown leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                Let's<br /><em className="italic">Collaborate.</em>
              </motion.h2>
            </div>

            <motion.p variants={fadeUp} className="text-base font-sans text-brown-2 leading-relaxed font-light max-w-sm">
              Have a project idea or just want to chat? Reach out — let's build something remarkable together.
            </motion.p>

            {/* Contact links */}
            <motion.div variants={fadeUp} className="flex flex-col divide-y divide-border">
              {[
                { label: 'EMAIL',  value: 'fadlansyahrullohajib@gmail.com', href: 'mailto:fadlansyahrullohajib@gmail.com' },
                { label: 'GITHUB', value: 'github.com/Lahnsea',             href: 'https://github.com/Lahnsea' },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-5 py-5 group hover:pl-2 transition-all duration-300"
                >
                  <span className="text-[9px] tracking-[3px] uppercase text-brown-3 min-w-[60px] font-sans">{label}</span>
                  <span className="text-sm font-sans text-brown group-hover:text-brown-2 transition-colors flex-1 truncate">{value}</span>
                  <span className="text-brown-3 group-hover:text-brown group-hover:translate-x-1 transition-all duration-200">→</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[3px] uppercase text-brown-3 font-sans">Name</label>
              <input type="text" name="name" required placeholder="Full name" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[3px] uppercase text-brown-3 font-sans">Email</label>
              <input type="email" name="email" required placeholder="email@example.com" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[3px] uppercase text-brown-3 font-sans">Message</label>
              <textarea name="message" required rows={5} placeholder="Tell me about your project…" className={`${inputCls} resize-none`} />
            </div>
            <button
              type="submit"
              data-cursor-hover
              disabled={status === 'sent'}
              className={`self-start btn-primary transition-all duration-300 ${status === 'sent' ? 'bg-green-100 border-green-200 text-green-700' : ''}`}
            >
              {status === 'sent' ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
