
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EcoOptimize</h3>
            <p className="text-gray-400">
              Optimizing resource usage for a sustainable future. 
              Save energy, water, and reduce costs while contributing to environmental conservation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/uploads" className="text-gray-400 hover:text-white transition-colors">View Uploads</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electricity Optimization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Water Conservation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Energy Audits</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p>123 Green Street</p>
              <p>Eco City, EC 12345</p>
              <p className="mt-2">Email: contact@ecooptimize.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} EcoOptimize. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
