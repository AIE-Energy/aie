
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Droplet, Search, DollarSign } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-black">Stop Watching Your Profits</span>
              <br />Disappear Into Your Energy Bills
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-800 max-w-lg">
              Our AI-powered platform helps business owners cut electricity and water costs by up to 30% with zero upfront investment and minimal setup time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white" onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Free Audit
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                Learn More
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm">Cost Reduction</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-sm">Energy Savings</span>
              </div>
              <div className="flex items-center">
                <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm">Water Optimization</span>
              </div>
              <div className="flex items-center">
                <Search className="h-5 w-5 text-black mr-2" />
                <span className="text-sm">Free Audit</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 animate-float">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Business Savings Dashboard</h3>
                <span className="text-xs text-gray-600 px-2 py-1 rounded-full bg-gray-100">Live</span>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Zap className="h-8 w-8 text-amber-500 p-1.5 bg-white rounded-full mr-3" />
                      <div>
                        <p className="text-sm font-medium">Monthly Electricity Cost</p>
                        <h4 className="text-xl font-bold">$4,250 <span className="text-sm text-green-600 font-normal">-18%</span></h4>
                      </div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">
                      $935 saved
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Droplet className="h-8 w-8 text-blue-500 p-1.5 bg-white rounded-full mr-3" />
                      <div>
                        <p className="text-sm font-medium">Water Usage Cost</p>
                        <h4 className="text-xl font-bold">$1,850 <span className="text-sm text-green-600 font-normal">-12%</span></h4>
                      </div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">
                      $252 saved
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-black animate-pulse-slow mr-1"></div>
                    <span className="text-sm text-gray-600">AI analyzing business expense patterns...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-64 w-64 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
