
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from 'lucide-react';
import { toast } from "sonner";
import MetricsChart from '@/components/MetricsChart';
import ReportDownload from '@/components/ReportDownload';
import { useAuth } from '@/contexts/AuthContext';

interface Report {
  id: string;
  title: string;
  description: string | null;
  uploaded_at: string;
  file_path: string | null;
}

interface Metric {
  id: string;
  electricity_usage: number;
  water_usage: number;
  electricity_savings_percentage: number;
  water_savings_percentage: number;
  measurement_date: string;
}

const ClientDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { logout, user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (role !== 'client') {
      toast.error('You do not have permission to access the client dashboard');
      navigate('/login');
      return;
    }

    fetchReports();
  }, [navigate, user, role]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('client_reports')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch reports');
        return;
      }

      setReports(data);
      
      // Select the most recent report by default
      if (data.length > 0 && !selectedReport) {
        setSelectedReport(data[0]);
        fetchMetrics(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const fetchMetrics = async (reportId: string) => {
    try {
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
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
    fetchMetrics(report.id);
  };

  // Calculate latest savings if metrics are available
  const getLatestSavings = () => {
    if (metrics.length > 0) {
      const latest = metrics[metrics.length - 1];
      return {
        electricity: latest.electricity_savings_percentage,
        water: latest.water_savings_percentage
      };
    }
    return { electricity: 0, water: 0 };
  };

  const latestSavings = getLatestSavings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resource Monitoring Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOutIcon size={18} />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Electricity Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">
                {latestSavings.electricity}%
              </div>
              <p className="text-gray-500 mt-2">Based on your latest report data</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Water Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {latestSavings.water}%
              </div>
              <p className="text-gray-500 mt-2">Based on your latest report data</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Your Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.map((report) => (
                  <div 
                    key={report.id} 
                    className={`p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
                      selectedReport && selectedReport.id === report.id ? "bg-gray-100 border border-gray-200" : ""
                    }`}
                    onClick={() => handleReportSelect(report)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{report.title}</h3>
                      <ReportDownload filePath={report.file_path} reportTitle={report.title} />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(report.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}

                {reports.length === 0 && (
                  <div className="text-center text-gray-500">
                    No reports available yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {selectedReport && metrics.length > 0 ? (
              <MetricsChart data={metrics} />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="py-8 text-center text-gray-500">
                  {selectedReport 
                    ? "No metrics data available for this report yet" 
                    : "Select a report to view metrics"}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientDashboard;
