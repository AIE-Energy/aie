
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface MetricsFormProps {
  reportId: string;
  onSuccess?: () => void;
}

const MetricsForm = ({ reportId, onSuccess }: MetricsFormProps) => {
  const [electricityUsage, setElectricityUsage] = useState('');
  const [waterUsage, setWaterUsage] = useState('');
  const [electricitySavings, setElectricitySavings] = useState('');
  const [waterSavings, setWaterSavings] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('client_metrics').insert({
        report_id: reportId,
        electricity_usage: parseFloat(electricityUsage),
        water_usage: parseFloat(waterUsage),
        electricity_savings_percentage: parseFloat(electricitySavings),
        water_savings_percentage: parseFloat(waterSavings),
        measurement_date: new Date().toISOString().split('T')[0]
      });

      if (error) throw error;

      toast.success('Metrics added successfully!');
      onSuccess?.();
      
      // Reset form
      setElectricityUsage('');
      setWaterUsage('');
      setElectricitySavings('');
      setWaterSavings('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add metrics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="electricityUsage">Electricity Usage (kWh)</Label>
        <Input
          id="electricityUsage"
          type="number"
          step="0.01"
          value={electricityUsage}
          onChange={(e) => setElectricityUsage(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="waterUsage">Water Usage (L)</Label>
        <Input
          id="waterUsage"
          type="number"
          step="0.01"
          value={waterUsage}
          onChange={(e) => setWaterUsage(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="electricitySavings">Electricity Savings (%)</Label>
        <Input
          id="electricitySavings"
          type="number"
          step="0.01"
          value={electricitySavings}
          onChange={(e) => setElectricitySavings(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="waterSavings">Water Savings (%)</Label>
        <Input
          id="waterSavings"
          type="number"
          step="0.01"
          value={waterSavings}
          onChange={(e) => setWaterSavings(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Metrics'}
      </Button>
    </form>
  );
};

export default MetricsForm;
