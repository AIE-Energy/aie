import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionInquiryForm from './SubscriptionInquiryForm';
import { useAirtableSubmit } from '@/hooks/useAirtableSubmit';

const CTA = () => {
  const { toast: toastUI } = useToast();
  const { submitToAirtable } = useAirtableSubmit();
  const [showDialog, setShowDialog] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
      toastUI({
        title: "File selected",
        description: `Selected file: ${e.target.files[0].name}`,
      });
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
      toastUI({
        title: "File uploaded",
        description: `Uploaded file: ${e.dataTransfer.files[0].name}`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const createStorageBucketIfNeeded = async () => {
    try {
      const { data: bucketList } = await supabase.storage.listBuckets();
      
      if (!bucketList?.find(bucket => bucket.name === 'utility_bills')) {
        const { error } = await supabase.storage.createBucket('utility_bills', {
          public: true,
          fileSizeLimit: 10 * 1024 * 1024
        });
        
        if (error) throw error;
        console.log('Created utility_bills bucket');
      }
    } catch (error) {
      console.error('Error checking/creating bucket:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createStorageBucketIfNeeded();
      
      let filePath = null;
      let fileUrl = null;
      
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        const { error: uploadError, data: fileData } = await supabase.storage
          .from('utility_bills')
          .upload(fileName, formData.file);
          
        if (uploadError) throw uploadError;
        filePath = fileName;
        
        const { data: publicURLData } = supabase.storage
          .from('utility_bills')
          .getPublicUrl(fileName);
          
        if (publicURLData) {
          fileUrl = publicURLData.publicUrl;
          console.log('File uploaded successfully. Public URL:', fileUrl);
        }
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

      console.log('Submitting audit request to Airtable...');
      const airtableSuccess = await submitToAirtable('audit_request', {
        Name: formData.name,
        Email: formData.email,
        AuditType: auditType,
        ElectricityUsage: auditType !== 'water' ? parseFloat(formData.electricityUsage) : null,
        WaterUsage: auditType !== 'electricity' ? parseFloat(formData.waterUsage) : null,
        MonthlyBill: parseFloat(formData.monthlyBill),
        AdditionalInfo: formData.additionalInfo,
        HasAttachment: !!filePath,
        file_url: fileUrl
      });

      if (!airtableSuccess) {
        console.warn('Airtable submission failed, but database record was created');
      }

      toast.success("Audit request submitted successfully! Our team will contact you shortly to discuss your audit in detail.");
      
      setFormData({
        name: '',
        email: '',
        electricityUsage: '',
        waterUsage: '',
        monthlyBill: '',
        additionalInfo: '',
        file: null,
      });
      setAuditType('');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                <h3 className="text-xl font-bold mb-4 text-white">Monthly Subscription Benefits</h3>
                <ul className="space-y-2 mb-6 text-white/90">
                  <li>• Detailed monthly AI analysis reports</li>
                  <li>• Custom optimization strategies</li>
                  <li>• Real-time usage monitoring</li>
                  <li>• Cost prediction and budgeting tools</li>
                </ul>
                <Button 
                  variant="secondary"
                  className="text-white bg-gray-800/60 hover:bg-gray-700 border border-white/30 hover:border-white"
                  onClick={() => setShowDialog(true)}
                >
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
                    <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white/50">
                      <SelectValue placeholder="Select audit type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border border-white/30">
                      <SelectItem value="electricity" className="focus:bg-gray-700 focus:text-white hover:bg-gray-700">Electricity Usage</SelectItem>
                      <SelectItem value="water" className="focus:bg-gray-700 focus:text-white hover:bg-gray-700">Water Usage</SelectItem>
                      <SelectItem value="both" className="focus:bg-gray-700 focus:text-white hover:bg-gray-700">Both</SelectItem>
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
                  <label className="block text-white/90 mb-1">Average Monthly Bill (R)</label>
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
                  <div 
                    className="mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-white/30 border-dashed rounded-md hover:border-white/50 transition-colors cursor-pointer"
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleFileDrop}
                  >
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-white hover:text-white/80 transition-colors" />
                      <div className="flex flex-col text-sm text-white/90">
                        <span className="font-medium text-white cursor-pointer hover:text-white/80 transition-colors">
                          Upload a file or drag and drop
                        </span>
                        <input 
                          ref={fileInputRef}
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                        <p className="text-xs text-white/50 mt-1">PDF, PNG, JPG up to 10MB</p>
                        {formData.file && (
                          <p className="text-sm text-white mt-2">
                            Selected: {formData.file.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Free Audit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Subscription Inquiry</DialogTitle>
          </DialogHeader>
          <SubscriptionInquiryForm onClose={() => setShowDialog(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTA;
