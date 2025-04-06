
import React from 'react';
import { Chair, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccessoryProps = {
  name: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

const Accessory = ({ name, icon, isSelected, onClick }: AccessoryProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-md border transition-all",
        isSelected 
          ? "border-purple bg-purple/5 text-purple" 
          : "border-neutral-200 hover:border-neutral-300"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{name}</span>
    </button>
  );
};

const RunnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M4 10h16" />
    <path d="M4 14h16" />
  </svg>
);

export const AccessorySelection = () => {
  const [selectedAccessory, setSelectedAccessory] = React.useState<string | null>("Chair");

  const accessories = [
    { name: "Chair", icon: <Chair size={20} /> },
    { name: "Runn", icon: <RunnIcon /> },
    { name: "Elastic", icon: <Waves size={20} /> },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-center">Select Accessories</h2>
      <div className="flex gap-3 flex-wrap">
        {accessories.map((accessory) => (
          <Accessory
            key={accessory.name}
            name={accessory.name}
            icon={accessory.icon}
            isSelected={selectedAccessory === accessory.name}
            onClick={() => setSelectedAccessory(accessory.name)}
          />
        ))}
      </div>
    </div>
  );
};
