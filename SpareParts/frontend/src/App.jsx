import React from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandLogos from './components/BrandLogos';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './index.css';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // animation time in ms
      once: true,     // animate only once
      offset: 100     // how early to trigger
    });
  }, []);
  return (
    <>
      <div className="min-h-screen bg-[#1B2A2F] text-white">
  <Navbar />
  <Hero />
  <BrandLogos />
  <Footer />
</div>

    </>
  );
}

export default App;
