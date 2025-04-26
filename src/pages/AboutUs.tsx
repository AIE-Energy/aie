
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About AIE</h1>
          <div className="prose lg:prose-xl">
            <p className="mb-6">
              AIE (Artificial Intelligence for Energy) is at the forefront of revolutionizing 
              how businesses and individuals monitor and optimize their resource consumption. 
              Our AI-powered platform provides intelligent insights and actionable 
              recommendations to reduce energy waste and promote sustainability.
            </p>
            <p className="mb-6">
              Founded with a mission to make resource monitoring intelligent and accessible, 
              we combine cutting-edge AI technology with user-friendly interfaces to help 
              our clients achieve their sustainability goals while reducing costs.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              To empower organizations and individuals with AI-driven insights that drive 
              sustainable resource management and environmental responsibility.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
