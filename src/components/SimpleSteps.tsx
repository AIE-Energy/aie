
import React from 'react';
import { Circle1, Circle2, Circle3 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const SimpleSteps = () => {
  const steps = [
    {
      icon: <Circle1 className="w-12 h-12" />,
      title: "Free Installation within minutes",
      description: "Quick and hassle-free setup process"
    },
    {
      icon: <Circle2 className="w-12 h-12" />,
      title: "30 Days AI Insights",
      description: "Comprehensive analysis of your resource usage"
    },
    {
      icon: <Circle3 className="w-12 h-12" />,
      title: "Start Saving through our AI Optimization",
      description: "Implement our recommendations and see immediate results"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Start Saving in 3 Simple Steps
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-black">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleSteps;
