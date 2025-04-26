
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CTA = () => {
  const benefits = [
    "Comprehensive electricity and water usage analysis",
    "Monthly AI-generated optimization reports",
    "Personalized cost-saving recommendations",
    "Utility bill analysis and benchmarking",
    "24/7 usage monitoring and alerts"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <section id="get-started" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-start">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Free Resource Audit</h2>
              <p className="text-white/90 mb-8 text-lg">
                Upload your utility bill and share your usage details for a comprehensive analysis of potential savings.
              </p>
              
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Monthly Subscription Benefits</h3>
                <ul className="space-y-2 mb-6">
                  <li>• Detailed monthly AI analysis reports</li>
                  <li>• Custom optimization strategies</li>
                  <li>• Real-time usage monitoring</li>
                  <li>• Cost prediction and budgeting tools</li>
                </ul>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More About Subscription
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
              <h3 className="text-white text-xl font-bold mb-4">Get Your Free Audit</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-1">Your Name</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your full name"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Current Monthly Usage (kWh)</label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 800"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Average Monthly Bill ($)</label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 150"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Additional Information</label>
                  <Textarea 
                    placeholder="Tell us about your energy usage patterns or concerns"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Upload Your Utility Bill</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/30 border-dashed rounded-md hover:border-white/50 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-white/50" />
                      <div className="flex text-sm text-white/90">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-white hover:text-white/90">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  Request Free Audit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
