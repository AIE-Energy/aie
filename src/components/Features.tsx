
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bolt, Droplet, Gauge, Bot, Cpu, CloudCog, FileText } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CloudCog className="h-10 w-10 text-black p-2 bg-gray-100 rounded-lg" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms detect patterns and anomalies in your resource consumption"
    },
    {
      icon: <Cpu className="h-10 w-10 text-black p-2 bg-gray-100 rounded-lg" />,
      title: "Software Integration",
      description: "Easy-to-implement software solution that connects directly to your existing utility data"
    },
    {
      icon: <Bolt className="h-10 w-10 text-black p-2 bg-gray-100 rounded-lg" />,
      title: "Energy Monitoring",
      description: "Track electricity usage in real-time with detailed breakdowns by device and time"
    },
    {
      icon: <Droplet className="h-10 w-10 text-black p-2 bg-gray-100 rounded-lg" />,
      title: "Water Usage Tracking",
      description: "Monitor water consumption patterns and identify potential leaks or waste"
    },
    {
      icon: <Gauge className="h-10 w-10 text-black p-2 bg-gray-100 rounded-lg" />,
      title: "Real-time Alerts",
      description: "Get instant notifications for unusual consumption patterns or potential issues"
    },
    {
      icon: <Bot className="h-10 w-10 text-black p-2 bg-gray-100 rounded-lg" />,
      title: "Smart Recommendations",
      description: "Receive personalized tips to reduce consumption based on your unique usage patterns"
    },
    {
      icon: <FileText className="h-10 w-10 text-white p-2 bg-gradient-to-r from-black to-gray-700 rounded-lg" />,
      title: "AI Insights Reporting",
      description: "Receive comprehensive monthly reports with deep AI-generated insights, predicting future usage and suggesting personalized optimization strategies"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful <span className="gradient-text">Features</span></h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            AIE combines cutting-edge AI with sophisticated software integration to give you unprecedented insights into your resource usage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-800">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
