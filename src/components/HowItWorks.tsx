
import React from 'react';
import { Cpu, Bolt, CloudCog, Activity, ListOrdered, Check } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Cpu className="h-12 w-12 text-white" />,
      title: "Integrate Software",
      description: "Set up our AI-powered software platform to connect with your utility data sources",
      color: "bg-black",
      position: "left"
    },
    {
      icon: <Bolt className="h-12 w-12 text-white" />,
      title: "Monitor Resources",
      description: "The software begins tracking electricity and water consumption in real-time",
      color: "bg-gray-700",
      position: "right"
    },
    {
      icon: <CloudCog className="h-12 w-12 text-white" />,
      title: "AI Analysis",
      description: "Our AI engine processes your usage data to identify patterns and optimization opportunities",
      color: "bg-black",
      position: "left"
    },
    {
      icon: <Activity className="h-12 w-12 text-white" />,
      title: "Save & Optimize",
      description: "Receive personalized recommendations and watch your utility bills decrease",
      color: "bg-gray-700",
      position: "right"
    }
  ];

  const savingSteps = [
    {
      title: "Free Installation within minutes",
      description: "Quick and hassle-free setup process"
    },
    {
      title: "30 Days AI Insights",
      description: "Comprehensive analysis of your resource usage patterns"
    },
    {
      title: "Start Saving through our AI Optimization",
      description: "Implement AI-driven recommendations for maximum savings"
    }
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How <span className="gradient-text">It Works</span></h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Getting started with AIE is simple - follow these steps to begin optimizing your resource usage
          </p>
        </div>

        <div className="relative mb-20">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 relative">
                <div className={`w-full md:w-1/2 ${step.position === 'left' ? 'md:text-right md:pr-12' : 'md:order-1 md:pl-12'}`}>
                  <div className={`inline-block p-4 rounded-full ${step.color} mb-4 md:mb-0`}>
                    {step.icon}
                  </div>
                  <div className="md:inline-block">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-800">{step.description}</p>
                  </div>
                </div>
                
                {/* Circle on timeline */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 hidden md:block ${step.color} w-4 h-4 rounded-full border-4 border-white`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Saving in 3 Simple Steps */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ListOrdered className="h-6 w-6 text-black" />
              <h2 className="text-3xl md:text-4xl font-bold">Start Saving in <span className="gradient-text">3 Simple Steps</span></h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {savingSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
