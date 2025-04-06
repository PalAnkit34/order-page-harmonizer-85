
import React from 'react';

type SpecificationRowProps = {
  label: string;
  value: string;
  valueColor?: string;
};

const SpecificationRow = ({ label, value, valueColor = "text-purple" }: SpecificationRowProps) => {
  return (
    <div className="flex justify-between py-1">
      <span className="text-neutral-700">{label}</span>
      <span className={valueColor}>{value}</span>
    </div>
  );
};

export const BasicSpecifications = () => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-center font-medium mb-2">Specifications</h3>
      <SpecificationRow label="Length" value="24 inches" />
      <SpecificationRow label="Material" value="Stainless Steel" />
      <SpecificationRow label="Quantity" value="2 pieces" />
    </div>
  );
};
