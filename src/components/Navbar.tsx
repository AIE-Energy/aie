
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Bolt, Droplet } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <span className="text-eco-blue text-2xl font-bold">Eco</span>
            <span className="text-eco-green text-2xl font-bold">Eye</span>
          </div>
          <div className="hidden md:flex text-eco-gray-dark text-sm ml-2">
            AI-Powered Resource Monitoring
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-eco-gray-dark hover:text-eco-blue transition-colors">Features</a>
          <a href="#how-it-works" className="text-eco-gray-dark hover:text-eco-blue transition-colors">How it Works</a>
          <a href="#stats" className="text-eco-gray-dark hover:text-eco-blue transition-colors">Stats</a>
          <a href="#get-started" className="text-eco-gray-dark hover:text-eco-blue transition-colors">Get Started</a>
        </div>

        <Button className="bg-eco-blue hover:bg-eco-blue-dark text-white">
          Try Demo
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
