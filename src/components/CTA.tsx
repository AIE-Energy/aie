
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';

const CTA = () => {
  const benefits = [
    "Reduce your utility bills by 15-25%",
    "Detect problems before they become expensive",
    "Help the environment by optimizing resource usage",
    "Easy setup with Raspberry Pi - no technical skills required"
  ];

  return (
    <section id="get-started" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-eco-blue to-eco-green rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to optimize your home?</h2>
              <p className="text-white/90 mb-8 text-lg">
                Join thousands of households saving money and resources with EcoEye. Our 30-day money-back guarantee ensures you'll see real results.
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
                <Button size="lg" className="bg-white text-eco-blue hover:bg-white/90">
                  Get Started Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
              <h3 className="text-white text-xl font-bold mb-4">See how much you can save</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-1">Average monthly electricity bill ($)</label>
                  <input 
                    type="number" 
                    defaultValue="120" 
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Average monthly water bill ($)</label>
                  <input 
                    type="number" 
                    defaultValue="60" 
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-white/90">Estimated yearly savings</p>
                  <p className="text-3xl font-bold text-white">$324 - $540</p>
                </div>
                <Button className="w-full bg-white text-eco-blue hover:bg-white/90">
                  Calculate My Savings
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
