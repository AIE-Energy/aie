
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="w-full p-4 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-2">
            <span className="text-black text-2xl font-bold">AIE</span>
          </Link>
          <div className="hidden md:flex text-gray-700 text-sm ml-2">
            AI-Powered Resource Monitoring
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-800 hover:text-black transition-colors">Home</Link>
          <Link to="/about" className="text-gray-800 hover:text-black transition-colors">About Us</Link>
          <Link to="/contact" className="text-gray-800 hover:text-black transition-colors">Contact</Link>
          <a href="#features" className="text-gray-800 hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-800 hover:text-black transition-colors">How it Works</a>
          <a href="#stats" className="text-gray-800 hover:text-black transition-colors">Stats</a>
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
