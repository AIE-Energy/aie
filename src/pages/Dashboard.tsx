
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOutIcon } from 'lucide-react';
import { toast } from "sonner";
import ReportUpload from '@/components/ReportUpload';
import MetricsForm from '@/components/MetricsForm';
import MetricsChart from '@/components/MetricsChart';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login');
        return;
      }
      setUser(data.session.user);
      fetchReports();
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('client_reports')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch reports');
      return;
    }

    setReports(data);
  };

  const fetchMetrics = async (reportId) => {
    const { data, error } = await supabase
      .from('client_metrics')
      .select('*')
      .eq('report_id', reportId)
      .order('measurement_date', { ascending: true });

    if (error) {
      toast.error('Failed to fetch metrics');
      return;
    }

    setMetrics(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Successfully logged out");
    navigate('/login');
  };

  const handleReportSelect = (report) => {
    setSelectedReport(report);
    fetchMetrics(report.id);
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOutIcon size={18} />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="upload">Upload Report</TabsTrigger>
            {selectedReport && <TabsTrigger value="metrics">Add Metrics</TabsTrigger>}
          </TabsList>

          <TabsContent value="reports">
            <div className="grid gap-6">
              {reports.map((report) => (
                <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleReportSelect(report)}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
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
                    No reports uploaded yet. Use the Upload Report tab to add your first report.
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
                <ReportUpload />
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
                      onSuccess={() => fetchMetrics(selectedReport.id)}
                    />
                  </CardContent>
                </Card>

                {metrics.length > 0 && <MetricsChart data={metrics} />}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
