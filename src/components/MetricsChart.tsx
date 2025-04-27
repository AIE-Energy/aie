
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MetricsChartProps {
  data: {
    measurement_date: string;
    electricity_usage: number;
    water_usage: number;
    electricity_savings_percentage: number;
    water_savings_percentage: number;
  }[];
}

const MetricsChart = ({ data }: MetricsChartProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resource Usage & Savings Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="measurement_date" />
              <YAxis yAxisId="left" label={{ value: 'Usage', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Savings %', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="electricity_usage"
                name="Electricity Usage (kWh)"
                stroke="#8884d8"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="water_usage"
                name="Water Usage (L)"
                stroke="#82ca9d"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="electricity_savings_percentage"
                name="Electricity Savings %"
                stroke="#ff7300"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="water_savings_percentage"
                name="Water Savings %"
                stroke="#0088aa"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsChart;
