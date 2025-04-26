
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SimpleSteps from '@/components/SimpleSteps';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <SimpleSteps />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
