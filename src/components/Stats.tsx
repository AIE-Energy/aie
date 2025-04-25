
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    { name: 'Mon', usage: 35 },
    { name: 'Tue', usage: 42 },
    { name: 'Wed', usage: 38 },
    { name: 'Thu', usage: 40 },
    { name: 'Fri', usage: 45 },
    { name: 'Sat', usage: 52 },
    { name: 'Sun', usage: 32 },
  ];

  return (
    <section id="stats" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real <span className="gradient-text">Results</span></h2>
          <p className="text-eco-gray-dark max-w-2xl mx-auto">
            See how EcoEye helps customers track and reduce their resource consumption
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
                  <p className="font-bold text-xl">5.1 kWh</p>
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
              <p className="text-eco-gray-dark mb-4">Daily water usage (gallons)</p>
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
                  <p className="font-bold text-xl">40.6 gal</p>
                </div>
                <div>
                  <p className="text-sm text-eco-gray-dark">Total Savings</p>
                  <p className="font-bold text-xl text-eco-green">8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;
