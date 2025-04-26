
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';

const CTA = () => {
  const benefits = [
    "Comprehensive electricity and water usage analysis",
    "Personalized AI-driven optimization recommendations",
    "Identify potential savings and efficiency improvements",
    "No-commitment free initial consultation"
  ];

  return (
    <section id="get-started" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Free Resource Audit</h2>
              <p className="text-white/90 mb-8 text-lg">
                Want a free electricity or water audit? Fill in your details to find out more.
              </p>
              
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Get Free Audit
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn How It Works
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
              <h3 className="text-white text-xl font-bold mb-4">Schedule Your Free Audit</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Resource of Interest</label>
                  <select 
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option>Electricity Audit</option>
                    <option>Water Audit</option>
                    <option>Both Audits</option>
                  </select>
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  Request Free Audit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
