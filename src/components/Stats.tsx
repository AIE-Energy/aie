
import React from 'react';
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

  const industryAverages = [
    { name: 'Warehousing', energy: 7.2, water: 180, yourEnergy: 5.1, yourWater: 153 },
    { name: 'Schools', energy: 6.8, water: 210, yourEnergy: 5.6, yourWater: 165 },
    { name: 'Healthcare', energy: 9.5, water: 245, yourEnergy: 7.8, yourWater: 195 },
    { name: 'Retail', energy: 5.2, water: 120, yourEnergy: 4.5, yourWater: 110 },
    { name: 'Offices', energy: 4.8, water: 95, yourEnergy: 3.9, yourWater: 85 },
  ];

  return (
    <section id="stats" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real <span className="gradient-text">Results</span></h2>
          <p className="text-eco-gray-dark max-w-2xl mx-auto">
            See how AIE helps customers track and reduce their resource consumption
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-eco-gray-dark">Average</p>
                  <p className="font-bold text-xl">R 5.1 kWh</p>
                </div>
                <div>
                  <p className="text-sm text-eco-gray-dark">Total Savings</p>
                  <p className="font-bold text-xl text-eco-green">12%</p>
                </div>
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
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-eco-gray-dark">Average</p>
                  <p className="font-bold text-xl">R 153.5 L</p>
                </div>
                <div>
                  <p className="text-sm text-eco-gray-dark">Total Savings</p>
                  <p className="font-bold text-xl text-eco-green">8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Industry Averages Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Industry Comparisons</h2>
          <p className="text-center max-w-2xl mx-auto mb-8 text-eco-gray-dark">
            See how your resource consumption compares to industry averages across different sectors
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
                    <Bar yAxisId="left" name="Industry Avg Energy (kWh)" dataKey="energy" fill="#1EAEDB" />
                    <Bar yAxisId="left" name="Your Energy Usage (kWh)" dataKey="yourEnergy" fill="#0D8BBA" />
                    <Bar yAxisId="right" name="Industry Avg Water (L)" dataKey="water" fill="#4CAF50" />
                    <Bar yAxisId="right" name="Your Water Usage (L)" dataKey="yourWater" fill="#388E3C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center">
                <p className="text-eco-gray-dark">
                  Based on average consumption data collected from various industries. 
                  Your resource usage is consistently below industry averages, demonstrating 
                  the effectiveness of our optimization solutions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;
