
import React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { toast } from "sonner";

interface ReportDownloadProps {
  filePath: string | null;
  reportTitle: string;
}

const ReportDownload = ({ filePath, reportTitle }: ReportDownloadProps) => {
  const handleDownload = async () => {
    if (!filePath) {
      toast.error('No file available for download');
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from('client-reports')
        .download(filePath);

      if (error) throw error;

      // Create a download link and trigger the download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = reportTitle ? `${reportTitle.replace(/\s+/g, '_')}.pdf` : filePath.split('/').pop() || 'report';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      <Download size={16} />
      <span>Download</span>
    </Button>
  );
};

export default ReportDownload;
