
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

type Option = {
  label: string;
  value: string;
};

type OptionButtonProps = {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
};

const OptionButton = ({ option, isSelected, onClick, variant = 'primary' }: OptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md transition-all",
        variant === 'primary' 
          ? isSelected 
            ? "bg-purple text-white" 
            : "bg-neutral-100 hover:bg-neutral-200" 
          : isSelected 
            ? "bg-neutral-200 font-medium" 
            : "bg-neutral-100 hover:bg-neutral-200"
      )}
    >
      {option.label}
    </button>
  );
};

export const OrderSpecifications = () => {
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedWeight, setSelectedWeight] = useState('120');
  const [selectedSize, setSelectedSize] = useState('Small');

  const weights: Option[] = [
    { label: '120', value: '120' },
    { label: '150', value: '150' },
    { label: '180', value: '180' },
    { label: '200', value: '200' },
    { label: 'C', value: 'C' },
  ];

  const sizes: Option[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Order Specifications</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700">
            Quantity
          </label>
          <Input 
            id="quantity"
            placeholder="Enter quantity" 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="delivery-date" className="block text-sm font-medium text-neutral-700">
            Delivery Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-neutral-500 font-normal">
                {date ? format(date, 'PPP') : 'Select date'}
                <Calendar className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <h3 className="font-medium">Product Specifications</h3>

      <div className="space-y-3 bg-neutral-50 p-3 rounded-md">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            Weight (GSM)
          </label>
          <div className="flex flex-wrap gap-2">
            {weights.map((weight) => (
              <OptionButton
                key={weight.value}
                option={weight}
                isSelected={selectedWeight === weight.value}
                onClick={() => setSelectedWeight(weight.value)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <OptionButton
                key={size.value}
                option={size}
                isSelected={selectedSize === size.label}
                onClick={() => setSelectedSize(size.label)}
                variant="secondary"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
