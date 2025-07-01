import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import WhatWeDoSection from '../components/sections/WhatWeDoSection';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user?.role === 'hr') {
      navigate('/hr');
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhatWeDoSection />
      <ContactSection />
    </>
  );
};

export default Home;