
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';

type FeatureToggleProps = {
  name: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

const FeatureToggle = ({ name, enabled, onToggle }: FeatureToggleProps) => {
  return (
    <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-md">
      <span className="font-medium">{name}</span>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-purple"
      />
    </div>
  );
};

export const AdditionalFeatures = () => {
  const [features, setFeatures] = useState({
    borderDetails: false,
    pipingDetails: false,
    chainRunnerElastic: false
  });

  const handleToggle = (featureName: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [featureName]: !prev[featureName]
    }));
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Additional Features</h2>
      
      <div className="bg-neutral-50 p-3 rounded-md space-y-3">
        <FeatureToggle 
          name="Border Details" 
          enabled={features.borderDetails} 
          onToggle={() => handleToggle('borderDetails')} 
        />
        <FeatureToggle 
          name="Piping Details" 
          enabled={features.pipingDetails} 
          onToggle={() => handleToggle('pipingDetails')} 
        />
        <FeatureToggle 
          name="Chain/Runner/Elastic" 
          enabled={features.chainRunnerElastic} 
          onToggle={() => handleToggle('chainRunnerElastic')} 
        />
      </div>

      <button className="w-full bg-purple hover:bg-purple-dark text-white py-3 rounded-md transition-colors">
        Save Specifications
      </button>
    </div>
  );
};
