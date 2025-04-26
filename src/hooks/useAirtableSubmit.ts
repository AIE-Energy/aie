
import { supabase } from "@/integrations/supabase/client";

export const useAirtableSubmit = () => {
  const submitToAirtable = async (formType: string, formData: any) => {
    try {
      const { error } = await supabase.functions.invoke('airtable-submit', {
        body: { formType, formData },
      });

      if (error) throw error;
      
      console.log('Successfully submitted to Airtable');
      return true;
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      return false;
    }
  };

  return { submitToAirtable };
};
