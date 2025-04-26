
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAirtableSubmit = () => {
  const { toast } = useToast();

  const submitToAirtable = async (formType: string, formData: any) => {
    try {
      console.log('Submitting to Airtable:', { formType, formData });
      
      const { data, error } = await supabase.functions.invoke('airtable-submit', {
        body: { formType, formData },
      });

      if (error) {
        console.error('Supabase function error:', error);
        toast({
          title: "Error submitting to Airtable",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      if (data?.error) {
        console.error('Airtable API error:', data.error);
        toast({
          title: "Error submitting to Airtable",
          description: data.error,
          variant: "destructive",
        });
        return false;
      }
      
      console.log('Successfully submitted to Airtable:', data);
      return true;
    } catch (error: any) {
      console.error('Error submitting to Airtable:', error);
      toast({
        title: "Error submitting to Airtable",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return { submitToAirtable };
};
