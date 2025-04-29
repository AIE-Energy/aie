
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Droplet, Search, DollarSign } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              <span className="text-black">Stop Watching Your Profits</span>
              <br />Disappear Into Your Energy Bills
            </h1>
            <p className="text-sm md:text-base mb-4 text-gray-800 max-w-md">
              Our AI-powered platform helps business owners cut electricity and water costs by up to 30% with zero upfront investment and minimal setup time.
            </p>
            <div>
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white" onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Free Audit
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 text-green-600 mr-1.5" />
                <span className="text-xs">Cost Reduction</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-3 w-3 text-amber-500 mr-1.5" />
                <span className="text-xs">Energy Savings</span>
              </div>
              <div className="flex items-center">
                <Droplet className="h-3 w-3 text-blue-500 mr-1.5" />
                <span className="text-xs">Water Optimization</span>
              </div>
              <div className="flex items-center">
                <Search className="h-3 w-3 text-black mr-1.5" />
                <span className="text-xs">Free Audit</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-5 border border-gray-200 animate-float">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base">Business Savings Dashboard</h3>
                <span className="text-xs text-gray-600 px-2 py-1 rounded-full bg-gray-100">Live</span>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Zap className="h-7 w-7 text-amber-500 p-1.5 bg-white rounded-full mr-3" />
                      <div>
                        <p className="text-xs font-medium">Monthly Electricity Cost</p>
                        <h4 className="text-lg font-bold">R24,850 <span className="text-xs text-green-600 font-normal">-18%</span></h4>
                      </div>
                    </div>
                    <div className="text-green-600 text-xs font-medium">
                      R5,460 saved
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Droplet className="h-7 w-7 text-blue-500 p-1.5 bg-white rounded-full mr-3" />
                      <div>
                        <p className="text-xs font-medium">Water Usage Cost</p>
                        <h4 className="text-lg font-bold">R10,750 <span className="text-xs text-green-600 font-normal">-12%</span></h4>
                      </div>
                    </div>
                    <div className="text-green-600 text-xs font-medium">
                      R1,465 saved
                    </div>
                  </div>
                </div>
                
                <div className="p-2.5 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-black animate-pulse-slow mr-1"></div>
                    <span className="text-xs text-gray-600">AI analyzing business expense patterns...</span>
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
