
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Stats = () => {
  const energyData = [
    { name: 'Mon', usage: 4.5 },
    { name: 'Tue', usage: 5.1 },
    { name: 'Wed', usage: 4.8 },
    { name: 'Thu', usage: 5.3 },
    { name: 'Fri', usage: 6.2 },
    { name: 'Sat', usage: 5.7 },
    { name: 'Sun', usage: 4.2 },
  ];

  const waterData = [
    { name: 'Mon', usage: 132.5 },
    { name: 'Tue', usage: 158.9 },
    { name: 'Wed', usage: 143.8 },
    { name: 'Thu', usage: 151.4 },
    { name: 'Fri', usage: 170.3 },
    { name: 'Sat', usage: 196.8 },
    { name: 'Sun', usage: 121.1 },
  ];

  // Industry average data, now more general and not client-specific
  const industryAverages = [
    { name: 'Warehousing', energy: 7.2, water: 180 },
    { name: 'Schools', energy: 6.8, water: 210 },
    { name: 'Healthcare', energy: 9.5, water: 245 },
    { name: 'Retail', energy: 5.2, water: 120 },
    { name: 'Offices', energy: 4.8, water: 95 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry <span className="gradient-text">Statistics</span></h2>
            <p className="text-eco-gray-dark max-w-2xl mx-auto">
              Average resource consumption across different industry sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-2">Energy Consumption</h3>
                <p className="text-eco-gray-dark mb-4">Daily electricity usage (kWh)</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={energyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="usage" stroke="#1EAEDB" fillOpacity={1} fill="url(#colorEnergy)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-2">Water Consumption</h3>
                <p className="text-eco-gray-dark mb-4">Daily water usage (liters)</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={waterData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="usage" stroke="#4CAF50" fillOpacity={1} fill="url(#colorWater)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Industry Averages Section - Now more general and not client-specific */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Industry Resource Consumption</h2>
            <p className="text-center max-w-2xl mx-auto mb-8 text-eco-gray-dark">
              Average resource consumption across different industry sectors
            </p>
            
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={industryAverages}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#1EAEDB" />
                      <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" name="Average Energy (kWh)" dataKey="energy" fill="#1EAEDB" />
                      <Bar yAxisId="right" name="Average Water (L)" dataKey="water" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-eco-gray-dark">
                    This chart shows industry average consumption data collected from various sectors.
                    Understanding these benchmarks can help businesses identify optimization opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stats;
