
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AIE</h3>
            <p className="text-gray-400">
              Optimizing resource usage for a sustainable future. 
              Save energy, water, and reduce costs while contributing to environmental conservation.
            </p>
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
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 text-center">
          <p>&copy; 2025 AIE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
