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
  const [focusedField, setFocusedField] = useState(null);

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

  const getInputClass = (field) => {
    return `w-full bg-transparent border-b ${
      focusedField === field ? 'border-[#56453f]' : 'border-border/80'
    } py-3 text-sm font-sans text-brown placeholder:text-brown-3/40 focus:outline-none transition-all duration-300`;
  };

  return (
    <section id="kontak" className="bg-cream border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start"
        >
          {/* Left — CTA text */}
          <div className="lg:col-span-5 flex flex-col gap-10">
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

            <motion.p variants={fadeUp} className="text-sm font-sans text-brown-2 leading-relaxed font-light max-w-sm">
              Have a project idea, question, or just want to chat? Fill out the form or reach out directly. Let's make something incredible together.
            </motion.p>

            {/* Contact links */}
            <motion.div variants={fadeUp} className="flex flex-col divide-y divide-border border-t border-b border-border/80">
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
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div variants={fadeUp} className="lg:col-span-7 bg-[#FAF7F2] border border-[#D0C7C3] p-8 md:p-10 rounded-sm shadow-[0_4px_32px_rgba(86,69,63,0.03)]">
            <h3 className="font-serif text-xl text-brown font-light mb-8 pb-3 border-b border-border/40">
              Send a Message
            </h3>
            
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-1.5">
                <label className={`text-[9px] tracking-[3px] uppercase font-sans transition-colors duration-300 ${
                  focusedField === 'name' ? 'text-[#56453f] font-semibold' : 'text-brown-3'
                }`}>
                  Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Full name" 
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClass('name')} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`text-[9px] tracking-[3px] uppercase font-sans transition-colors duration-300 ${
                  focusedField === 'email' ? 'text-[#56453f] font-semibold' : 'text-brown-3'
                }`}>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="email@example.com" 
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClass('email')} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`text-[9px] tracking-[3px] uppercase font-sans transition-colors duration-300 ${
                  focusedField === 'message' ? 'text-[#56453f] font-semibold' : 'text-brown-3'
                }`}>
                  Message
                </label>
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  placeholder="Tell me about your project or inquiry…" 
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`${getInputClass('message')} resize-none`} 
                />
              </div>

              <button
                type="submit"
                data-cursor-hover
                disabled={status === 'sent'}
                className={`group self-start inline-flex items-center gap-2.5 px-8 py-3.5 rounded-sm text-xs font-sans font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  status === 'sent' 
                    ? 'bg-green-700 border-green-700 text-[#fbfbfb] shadow-sm' 
                    : 'bg-[#56453f] text-[#fbfbfb] border-[#56453f] hover:bg-[#8B654E] hover:border-[#8B654E] shadow-sm hover:shadow-[0_4px_16px_rgba(86,69,63,0.15)]'
                }`}
              >
                {status === 'sent' ? (
                  <>
                    <span>✓ Message Sent</span>
                  </>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
