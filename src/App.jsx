import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Cursor              from './components/Cursor';
import Loader              from './components/Loader';
import AnnouncementBar     from './components/AnnouncementBar';
import Navbar              from './components/Navbar';
import SideNavbar          from './components/SideNavbar';
import ProfileCard         from './components/ProfileCard';
import ChatbotNav          from './components/ChatbotNav';
import Hero                from './components/Hero';
import About               from './components/About';
import PortfolioShowcase   from './components/PortfolioShowcase';
import Journey             from './components/Journey';
import Contact             from './components/Contact';
import Footer              from './components/Footer';

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
          <ProfileCard />
          <ChatbotNav />
          <main>
            <Hero />
            <About />
            <PortfolioShowcase />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
