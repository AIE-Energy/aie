
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAirtableSubmit = () => {
  const submitToAirtable = async (formType: string, formData: any) => {
    try {
      console.log('Submitting to Airtable:', { formType, formData });
      
      const { data, error } = await supabase.functions.invoke('airtable-submit', {
        body: { formType, formData },
      });

      if (error) {
        console.error('Supabase function error:', error);
        toast.error("Error submitting form: " + error.message);
        return false;
      }
      
      if (!data?.success) {
        console.error('Airtable API error:', data?.error);
        toast.error("Error submitting to Airtable: " + (data?.error || "Unknown error"));
        return false;
      }
      
      console.log('Successfully submitted to Airtable:', data);
      return true;
    } catch (error: any) {
      console.error('Error submitting to Airtable:', error);
      toast.error("Error submitting form: " + (error.message || "An unknown error occurred"));
      return false;
    }
  };

  return { submitToAirtable };
};
