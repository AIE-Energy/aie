import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const CTA = () => {
  const { toast } = useToast();
  const [auditType, setAuditType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    electricityUsage: '',
    waterUsage: '',
    monthlyBill: '',
    additionalInfo: '',
    file: null as File | null,
  });
  
  const benefits = [
    "Comprehensive electricity and water usage analysis",
    "Monthly AI-generated optimization reports",
    "Personalized cost-saving recommendations",
    "Utility bill analysis and benchmarking",
    "24/7 usage monitoring and alerts"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let filePath = null;
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('utility_bills')
          .upload(fileName, formData.file);
          
        if (uploadError) throw uploadError;
        filePath = fileName;
      }

      const { error: insertError } = await supabase
        .from('audit_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          audit_type: auditType,
          electricity_usage: auditType !== 'water' ? parseFloat(formData.electricityUsage) : null,
          water_usage: auditType !== 'electricity' ? parseFloat(formData.waterUsage) : null,
          monthly_bill: parseFloat(formData.monthlyBill),
          additional_info: formData.additionalInfo,
          file_path: filePath,
        });

      if (insertError) throw insertError;

      toast({
        title: "Audit request submitted",
        description: "Thank you for your interest. We'll analyze your data and contact you shortly.",
      });
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error submitting request",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
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
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Type of Audit</label>
                  <Select 
                    value={auditType} 
                    onValueChange={setAuditType}
                    required
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select audit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricity">Electricity Usage</SelectItem>
                      <SelectItem value="water">Water Usage</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(auditType === 'electricity' || auditType === 'both') && (
                  <div>
                    <label className="block text-white/90 mb-1">Current Monthly Electricity Usage (kWh)</label>
                    <Input 
                      type="number" 
                      placeholder="e.g., 800"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      required
                      value={formData.electricityUsage}
                      onChange={(e) => setFormData(prev => ({ ...prev, electricityUsage: e.target.value }))}
                    />
                  </div>
                )}

                {(auditType === 'water' || auditType === 'both') && (
                  <div>
                    <label className="block text-white/90 mb-1">Current Monthly Water Usage (Litres)</label>
                    <Input 
                      type="number" 
                      placeholder="e.g., 10000"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      required
                      value={formData.waterUsage}
                      onChange={(e) => setFormData(prev => ({ ...prev, waterUsage: e.target.value }))}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-white/90 mb-1">Average Monthly Bill ($)</label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 150"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    required
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyBill: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-1">Additional Information</label>
                  <Textarea 
                    placeholder="Tell us about your energy usage patterns or concerns"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
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
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-white/50">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100">
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
