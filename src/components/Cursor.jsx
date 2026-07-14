import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorClass, setCursorClass] = useState('');

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const move = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    };

    const handleMouseEnterHover = () => {
      setCursorClass('hover');
    };

    const handleMouseLeaveHover = () => {
      setCursorClass('');
    };

    const handleMouseEnterDrag = () => {
      setCursorClass('drag');
      setCursorText('DRAG');
    };

    const handleMouseLeaveDrag = () => {
      setCursorClass('');
      setCursorText('');
    };

    document.addEventListener('mousemove', move);

    const setupListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterHover);
        el.removeEventListener('mouseleave', handleMouseLeaveHover);
        el.addEventListener('mouseenter', handleMouseEnterHover);
        el.addEventListener('mouseleave', handleMouseLeaveHover);
      });

      document.querySelectorAll('[data-cursor-drag]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterDrag);
        el.removeEventListener('mouseleave', handleMouseLeaveDrag);
        el.addEventListener('mouseenter', handleMouseEnterDrag);
        el.addEventListener('mouseleave', handleMouseLeaveDrag);
      });
    };

    setupListeners();

    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`cursor-dot hidden md:flex items-center justify-center pointer-events-none z-[99999] fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full font-sans transition-[width,height,background-color,border-color] duration-300 ${
        cursorClass === 'hover'
          ? 'w-12 h-12 bg-brown/5 border border-brown/20'
          : cursorClass === 'drag'
          ? 'w-16 h-16 bg-brown text-cream text-[9px] font-bold tracking-[2px]'
          : 'w-2.5 h-2.5 bg-brown mix-blend-multiply'
      }`}
    >
      {cursorText}
    </div>
  );
}
