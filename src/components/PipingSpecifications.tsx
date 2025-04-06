
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type ColorOption = 'Black' | 'White' | 'Navy' | 'Red' | 'Custom';

export const PipingSpecifications = () => {
  const [gsmType, setGsmType] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorOption>('Black');
  
  // Calculate total meters based on width and length
  const totalMeters = width && length ? (parseFloat(width) * parseFloat(length) / 100).toFixed(1) : '24.5';

  const colorOptions: ColorOption[] = ['Black', 'White', 'Navy', 'Red', 'Custom'];

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Piping Specifications</h2>
      
      <div className="space-y-2">
        <label htmlFor="gsm-type" className="block text-sm font-medium text-neutral-700">
          GSM Type
        </label>
        <Input 
          id="gsm-type"
          placeholder="Enter GSM type" 
          value={gsmType}
          onChange={(e) => setGsmType(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="width" className="block text-sm font-medium text-neutral-700">
            Width (cm)
          </label>
          <Input 
            id="width"
            placeholder="Enter width" 
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="length" className="block text-sm font-medium text-neutral-700">
            Length (m)
          </label>
          <Input 
            id="length"
            placeholder="Enter length" 
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Total Meters
        </label>
        <div className="bg-neutral-100 rounded-md p-3 text-neutral-700">
          {totalMeters} meters
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-700">
          Piping Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "px-4 py-2 rounded-md transition-all",
                selectedColor === color 
                  ? color === 'Black' 
                    ? "bg-purple text-white" 
                    : "bg-neutral-200 font-medium"
                  : "bg-neutral-100 hover:bg-neutral-200",
                color === 'Custom' && "bg-neutral-100"
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
