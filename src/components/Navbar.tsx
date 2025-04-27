
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-800 hover:text-black transition-colors cursor-pointer">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-black transition-colors cursor-pointer">
            About Us
          </Link>
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-gray-800 hover:text-black transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-gray-800 hover:text-black transition-colors cursor-pointer"
          >
            How it Works
          </button>
          <button 
            onClick={() => scrollToSection('stats')} 
            className="text-gray-800 hover:text-black transition-colors cursor-pointer"
          >
            Statistics
          </button>
          <Link to="/contact" className="text-gray-800 hover:text-black transition-colors cursor-pointer">
            Contact Us
          </Link>
          <Link to="/login" className="text-gray-800 hover:text-black transition-colors cursor-pointer">
            Client Portal
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about" className="w-full">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => scrollToSection('features')}>
                Features
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => scrollToSection('how-it-works')}>
                How it Works
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => scrollToSection('stats')}>
                Statistics
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact" className="w-full">Contact Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login" className="w-full">Client Portal</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button 
          className="bg-black hover:bg-gray-800 text-white hidden md:inline-flex"
          onClick={() => scrollToSection('get-started')}
        >
          Free Audit
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
