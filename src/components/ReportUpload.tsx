
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ClientSelector from './ClientSelector';

interface ReportUploadProps {
  onSuccess?: () => void;
}

const ReportUpload = ({ onSuccess }: ReportUploadProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
  const [selectedClientEmail, setSelectedClientEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleClientSelect = (clientId: string, clientEmail: string) => {
    setSelectedClientId(clientId);
    setSelectedClientEmail(clientEmail);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!selectedClientId) {
      toast.error('Please select a client');
      return;
    }

    // Check if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user) {
      toast.error('You must be logged in to upload reports');
      return;
    }

    const userId = sessionData.session.user.id;

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('client-reports')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create report record with client_id
      const { error: insertError } = await supabase.from('client_reports').insert({
        title,
        description,
        file_path: filePath,
        user_id: userId,
        client_id: selectedClientId
      });

      if (insertError) throw insertError;

      toast.success(`Report uploaded successfully for ${selectedClientEmail}!`);
      setTitle('');
      setDescription('');
      setFile(null);
      setSelectedClientId(undefined);
      setSelectedClientEmail('');
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to upload report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <Label htmlFor="client">Select Client</Label>
        <ClientSelector 
          onClientSelect={handleClientSelect} 
          selectedClientId={selectedClientId}
        />
      </div>
      <div>
        <Label htmlFor="title">Report Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="file">Report File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Report'}
      </Button>
    </form>
  );
};

export default ReportUpload;
