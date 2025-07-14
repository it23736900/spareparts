import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandLogos from './components/BrandLogos';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import LoginSystem from './components/LoginSystem';

import './index.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200, // animation duration in ms
      once: true,     // animate only once
      offset: 100     // how early to trigger animations
    });
  }, []);

  return (
    <>
      <div className="App"></div>

      <div className="min-h-screen bg-[#1B2A2F] text-white">
        {/* Pass the onSignInClick prop to open modal */}
        <Navbar onSignInClick={() => setShowLogin(true)} />

        <Hero />
        <BrandLogos />
        <Footer />
        <FloatingWhatsAppButton />

        {/* Show LoginSystem as a modal only when showLogin is true */}
        {showLogin && <LoginSystem onClose={() => setShowLogin(false)} />}
      </div>
    </>
  );
}

export default App;
