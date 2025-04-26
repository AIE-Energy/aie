
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileIcon, Loader2 } from 'lucide-react';

interface FileObject {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
  bucket_id: string;
}

const Uploads = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('utility_bills')
          .list();

        if (error) {
          throw error;
        }

        if (data) {
          setFiles(data);
        }
      } catch (err: any) {
        console.error('Error fetching files:', err);
        setError(err.message || 'Failed to load files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase
      .storage
      .from('utility_bills')
      .getPublicUrl(fileName);
    
    return data?.publicUrl;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Uploaded Files</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-2 text-lg">Loading files...</span>
            </div>
          ) : error ? (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <p className="text-red-600">{error}</p>
                <p className="mt-2">Please ensure the utility_bills storage bucket exists.</p>
              </CardContent>
            </Card>
          ) : files.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No files have been uploaded yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {files.map((file) => {
                const publicUrl = getPublicUrl(file.name);
                const isImage = file.metadata?.mimetype?.startsWith('image/');
                
                return (
                  <Card key={file.id} className="overflow-hidden">
                    {isImage && publicUrl && (
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={publicUrl} 
                          alt={file.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center text-base font-medium">
                        <FileIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Uploaded: {formatDate(file.created_at)}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(publicUrl, '_blank')}
                      >
                        View File <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Uploads;
