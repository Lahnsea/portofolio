import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * CSSLanyard — A physics-inspired lanyard ID card using CSS transforms + framer-motion springs.
 * Renders: lanyard strap → clip → ID card that follows mouse position with spring physics.
 */
export default function CSSLanyard() {
  const containerRef = useRef(null);
  const [containerRect, setContainerRect] = useState(null);

  // Mouse position relative to the center of the container
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring config — mimics pendulum/elastic physics
  const springConfig = { stiffness: 80, damping: 18, mass: 1.2 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  // Rotate card slightly based on X position
  const rotateZ = useTransform(springX, [-120, 120], [-14, 14]);
  const rotateX = useTransform(springY, [-80, 80], [6, -6]);

  // Track mouse movement globally
  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRect) return;
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      const dx = (e.clientX - centerX) * 0.4;
      const dy = (e.clientY - centerY) * 0.3;
      rawX.set(dx);
      rawY.set(dy);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('mousemove', handleMouse);
    document.body.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.body.removeEventListener('mouseleave', handleLeave);
    };
  }, [containerRect, rawX, rawY]);

  // Lanyard strap SVG path that warps with card position
  const strapRotate = useTransform(springX, [-120, 120], [-8, 8]);

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ width: '220px', height: '360px', perspective: '800px' }}
    >
      {/* ── Strap (lanyard cord) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ zIndex: 1 }}>
        {/* Two vertical strap strips */}
        <motion.div
          style={{ rotate: strapRotate, transformOrigin: 'top center' }}
          className="flex gap-[4px]"
        >
          <div
            className="w-[10px] rounded-b-sm"
            style={{
              height: '120px',
              background: 'linear-gradient(180deg, #56453f 0%, #6B5347 40%, #56453f 100%)',
              boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.25), inset 1px 0 1px rgba(255,255,255,0.15)',
            }}
          />
          <div
            className="w-[10px] rounded-b-sm"
            style={{
              height: '120px',
              background: 'linear-gradient(180deg, #4A3A35 0%, #56453f 40%, #4A3A35 100%)',
              boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.2)',
            }}
          />
        </motion.div>

        {/* Clip / connector */}
        <div
          className="relative mt-0 z-10"
          style={{
            width: '28px',
            height: '22px',
            background: 'linear-gradient(145deg, #D8D3CE, #B8B3AE)',
            borderRadius: '3px 3px 8px 8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          <div
            className="absolute inset-x-2 bottom-0"
            style={{
              height: '6px',
              background: 'linear-gradient(145deg, #C0BBB6, #A8A3A0)',
              borderRadius: '0 0 4px 4px',
            }}
          />
        </div>
      </div>

      {/* ── ID Card ── */}
      <motion.div
        style={{
          rotateZ,
          rotateX,
          x: springX,
          y: springY,
          transformStyle: 'preserve-3d',
          position: 'absolute',
          top: '120px',
          left: '50%',
          translateX: '-50%',
          zIndex: 2,
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Outer museum frame */}
        <div
          style={{
            padding: '5px',
            background: 'linear-gradient(145deg, #E6E2DC, #D4CEC6, #DFD9D0)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
            borderRadius: '4px',
            width: '180px',
          }}
        >
          {/* Inner inset */}
          <div
            style={{
              padding: '3px',
              background: 'linear-gradient(145deg, #FAF9F6, #EDEAE5, #F5F3F0)',
              borderRadius: '2px',
            }}
          >
            {/* Card canvas */}
            <div
              className="relative overflow-hidden"
              style={{
                background: '#FAF9F6',
                borderRadius: '1px',
              }}
            >
              {/* Photo area */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: '130px',
                  background: 'radial-gradient(ellipse at 50% 30%, #EDEAE5 0%, #D8D3CE 100%)',
                  borderBottom: '1px solid #D8D3CE',
                }}
              >
                {/* Try to show the actual photo, fallback to initials */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #E6E2DC',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    background: '#EDEAE5',
                  }}
                >
                  <img
                    src="/foto.jpg"
                    alt="Fadlan"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Fallback monogram */}
                  <div
                    className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-light"
                    style={{ color: '#56453f' }}
                  >
                    F
                  </div>
                </div>
                {/* Spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  }}
                />
              </div>

              {/* Info section */}
              <div className="px-3 py-3 text-center">
                <p
                  className="font-serif font-light leading-tight mb-0.5"
                  style={{ fontSize: '0.85rem', color: '#2C2825', letterSpacing: '0.01em' }}
                >
                  Fadlan
                </p>
                <p
                  className="font-sans uppercase"
                  style={{ fontSize: '6px', letterSpacing: '2px', color: '#9A9390', marginBottom: '6px' }}
                >
                  Full-Stack · UI/UX Developer
                </p>
                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #D8D3CE, transparent)',
                    marginBottom: '6px',
                  }}
                />
                {/* Status */}
                <div className="flex items-center justify-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{ animation: 'pulse 2s infinite' }}
                  />
                  <span
                    className="font-sans"
                    style={{ fontSize: '6px', letterSpacing: '1.5px', color: '#6B6460', textTransform: 'uppercase' }}
                  >
                    Open to Work
                  </span>
                </div>
              </div>

              {/* Bottom barcode strip */}
              <div
                className="px-3 pb-3 flex items-center justify-center"
                style={{ borderTop: '1px solid #EDEAE5' }}
              >
                <div className="flex gap-[1.5px]">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i % 3 === 0 ? '2px' : '1px',
                        height: '16px',
                        background: '#2C2825',
                        opacity: 0.7 + (i % 5) * 0.06,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Museum placard below card */}
        <div className="mt-2 text-center">
          <p
            className="font-sans"
            style={{ fontSize: '6px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
          >
            Identity · Card 01
          </p>
        </div>
      </motion.div>
    </div>
  );
}
