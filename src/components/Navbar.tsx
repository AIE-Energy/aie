
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="w-full p-4 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <span className="text-black text-2xl font-bold">AIE</span>
          </div>
          <div className="hidden md:flex text-gray-700 text-sm ml-2">
            AI-Powered Resource Monitoring
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-800 hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-800 hover:text-black transition-colors">How it Works</a>
          <a href="#stats" className="text-gray-800 hover:text-black transition-colors">Stats</a>
          <a href="#get-started" className="text-gray-800 hover:text-black transition-colors">Get Started</a>
        </div>

        <Button 
          className="bg-black hover:bg-gray-800 text-white"
          onClick={() => scrollToSection('get-started')}
        >
          Try Demo
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
