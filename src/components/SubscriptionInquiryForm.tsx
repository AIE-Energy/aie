import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAirtableSubmit } from '@/hooks/useAirtableSubmit';

const SubscriptionInquiryForm = ({ onClose }: { onClose: () => void }) => {
  const { submitToAirtable } = useAirtableSubmit();
  const [formData, setFormData] = React.useState({
    fullName: '',
    companyName: '',
    email: '',
    location: '',
    inquiryType: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('subscription_inquiries')
        .insert({
          full_name: formData.fullName,
          company_name: formData.companyName,
          email: formData.email,
          location: formData.location,
          inquiry_type: formData.inquiryType,
          additional_info: formData.additionalInfo,
        });

      if (error) throw error;

      console.log('Submitting subscription inquiry to Airtable...');
      const airtableSuccess = await submitToAirtable('subscription_inquiry', {
        FullName: formData.fullName,
        CompanyName: formData.companyName,
        Email: formData.email,
        Location: formData.location,
        InquiryType: formData.inquiryType,
        AdditionalInfo: formData.additionalInfo,
      });

      if (!airtableSuccess) {
        console.warn('Airtable submission failed, but database record was created');
      }

      toast.success("Thank you for your interest! Our team will contact you within 24 hours to discuss subscription options.");
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was a problem submitting your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left p-4 bg-gradient-to-r from-black to-gray-800 rounded-lg">
      <div>
        <label className="block text-white/90 mb-1">Full Name</label>
        <Input
          required
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          placeholder="Enter your full name"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>
      
      <div>
        <label className="block text-white/90 mb-1">Company Name</label>
        <Input
          required
          value={formData.companyName}
          onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
          placeholder="Enter your company name"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-1">Email Address</label>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter your email address"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-1">Location</label>
        <Input
          required
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Enter your location"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-1">Inquiry Type</label>
        <Select
          required
          value={formData.inquiryType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
        >
          <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white/50">
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border border-white/30">
            <SelectItem value="electricity" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
              Electricity Monitoring
            </SelectItem>
            <SelectItem value="water" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
              Water Management
            </SelectItem>
            <SelectItem value="both" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
              Complete Solution
            </SelectItem>
            <SelectItem value="other" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-white/90 mb-1">Additional Information</label>
        <Textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
          placeholder="Please share any specific requirements or questions"
          className="h-24 bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          className="text-white bg-transparent border-white/30 hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-gray-100"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  );
};

export default SubscriptionInquiryForm;
