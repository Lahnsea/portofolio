import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Cursor           from './components/Cursor';
import Loader           from './components/Loader';
import AnnouncementBar  from './components/AnnouncementBar';
import Navbar           from './components/Navbar';
import SideNavbar       from './components/SideNavbar';
import ChatbotNav       from './components/ChatbotNav';
import Hero             from './components/Hero';
import About            from './components/About';
import Skills           from './components/Skills';
import Projects         from './components/Projects';
import Certificates     from './components/Certificates';
import Journey          from './components/Journey';
import Contact          from './components/Contact';
import Footer           from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor />

      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <AnnouncementBar />
          <Navbar />
          <SideNavbar />
          <ChatbotNav />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
