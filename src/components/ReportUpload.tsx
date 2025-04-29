import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

// Define the Client interface outside of component
interface Client {
  id: string;
  email: string;
}

interface ReportUploadProps {
  onSuccess: () => void;
}

const ReportUpload: React.FC<ReportUploadProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [clientId, setClientId] = useState<string>('');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('role', 'client');

      if (error) {
        toast.error('Failed to fetch clients');
        return;
      }

      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !file || !clientId || !user) {
      toast.error('Please fill out all required fields');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload the file to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `reports/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('reports')
        .upload(filePath, file);

      if (uploadError) {
        toast.error('Error uploading file');
        setLoading(false);
        return;
      }

      // 2. Create report record in database
      const { error: dbError } = await supabase
        .from('client_reports')
        .insert({
          title,
          description: description || null,
          file_path: filePath,
          client_id: clientId,
          user_id: user.id
        });

      if (dbError) {
        toast.error('Error saving report data');
        setLoading(false);
        return;
      }

      toast.success('Report uploaded successfully');
      setTitle('');
      setDescription('');
      setFile(null);
      setClientId('');
      
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      onSuccess();
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Report Title *
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quarterly Resource Assessment"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the report content"
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="client" className="block text-sm font-medium mb-1">
          Client *
        </label>
        <select
          id="client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="file-upload" className="block text-sm font-medium mb-1">
          Report File *
        </label>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.xlsx,.csv"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: PDF, Word, Excel, CSV
        </p>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Uploading...' : 'Upload Report'}
      </Button>
    </form>
  );
};

export default ReportUpload;
