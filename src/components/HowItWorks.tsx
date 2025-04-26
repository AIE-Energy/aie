
import React from 'react';
import { Cpu, Monitor, CloudCog, TrendingDown } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Cpu className="w-12 h-12 text-white" />,
      title: "Integrate Our Software",
      description: "Set up our AI-powered software platform to connect with your utility data sources",
      position: "left"
    },
    {
      icon: <Monitor className="w-12 h-12 text-white" />,
      title: "Monitor Resources",
      description: "The software begins tracking electricity and water consumption in real-time",
      position: "right"
    },
    {
      icon: <CloudCog className="w-12 h-12 text-white" />,
      title: "AI Analysis",
      description: "Our AI engine processes your usage data to identify patterns and optimization opportunities",
      position: "left"
    },
    {
      icon: <TrendingDown className="w-12 h-12 text-white" />,
      title: "Save & Optimize",
      description: "Receive personalized recommendations and watch your utility bills decrease",
      position: "right"
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-800 text-lg max-w-3xl mx-auto">
            Getting started with AIE is simple - follow these steps to begin optimizing your resource usage
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-8 ${
                  step.position === 'right' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${
                  step.position === 'left' ? 'text-right pr-8' : 'pl-8'
                }`}>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-700">{step.description}</p>
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                    {step.icon}
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"></div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
