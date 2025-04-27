
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOutIcon, PlusCircle, Users } from 'lucide-react';
import { toast } from "sonner";
import ReportUpload from '@/components/ReportUpload';
import MetricsForm from '@/components/MetricsForm';
import ClientSelector from '@/components/ClientSelector';
import { useAuth } from '@/contexts/AuthContext';

interface Report {
  id: string;
  title: string;
  description: string | null;
  uploaded_at: string;
  client_id: string | null;
  client_email?: string;
}

const OwnerDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
  const [selectedClientEmail, setSelectedClientEmail] = useState<string>('');
  const { logout, user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (role !== 'owner') {
      toast.error('You do not have permission to access the owner dashboard');
      navigate('/login');
      return;
    }

    fetchReports();
  }, [navigate, user, role]);

  const fetchReports = async () => {
    try {
      let query = supabase.from('client_reports').select('*').order('uploaded_at', { ascending: false });

      if (selectedClientId) {
        query = query.eq('client_id', selectedClientId);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Failed to fetch reports');
        return;
      }

      // Fetch client emails for the reports
      const reportsWithClients = await Promise.all(data.map(async (report) => {
        if (!report.client_id) return { ...report, client_email: 'No client' };

        try {
          const { data: userData, error: userError } = await supabase.auth.admin.getUserById(report.client_id);

          if (userError || !userData.user) {
            return { ...report, client_email: 'Unknown client' };
          }
          
          return { ...report, client_email: userData.user.email };
        } catch (error) {
          console.error('Error fetching client email:', error);
          return { ...report, client_email: 'Error fetching client' };
        }
      }));

      setReports(reportsWithClients);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleClientSelect = (clientId: string, clientEmail: string) => {
    setSelectedClientId(clientId);
    setSelectedClientEmail(clientEmail);
    setSelectedReport(null);
    fetchReportsByClient(clientId);
  };

  const fetchReportsByClient = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('client_reports')
        .select('*')
        .eq('client_id', clientId)
        .order('uploaded_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch client reports');
        return;
      }

      setReports(data.map(report => ({
        ...report,
        client_email: selectedClientEmail
      })));
    } catch (error) {
      console.error('Error fetching client reports:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AIE Owner Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOutIcon size={18} />
            Logout
          </Button>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Client Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientSelector onClientSelect={handleClientSelect} selectedClientId={selectedClientId} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">Client Reports</TabsTrigger>
            <TabsTrigger value="upload">Upload New Report</TabsTrigger>
            {selectedReport && <TabsTrigger value="metrics">Add Metrics</TabsTrigger>}
          </TabsList>

          <TabsContent value="reports">
            <div className="grid gap-6">
              {reports.map((report) => (
                <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleReportSelect(report)}>
                  <CardHeader className={selectedReport && selectedReport.id === report.id ? "bg-gray-100" : ""}>
                    <div className="flex justify-between items-start">
                      <CardTitle>{report.title}</CardTitle>
                      {report.client_email && (
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {report.client_email}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Uploaded: {new Date(report.uploaded_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {reports.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    {selectedClientId 
                      ? `No reports uploaded yet for ${selectedClientEmail}. Use the Upload Report tab to add a report.`
                      : 'Select a client or use the Upload Report tab to add a new report.'}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Report</CardTitle>
              </CardHeader>
              <CardContent>
                <ReportUpload onSuccess={fetchReports} />
              </CardContent>
            </Card>
          </TabsContent>

          {selectedReport && (
            <TabsContent value="metrics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Metrics for {selectedReport.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricsForm
                      reportId={selectedReport.id}
                      onSuccess={() => fetchReports()}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default OwnerDashboard;
