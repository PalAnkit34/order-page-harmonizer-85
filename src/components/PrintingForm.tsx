
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PrintingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId?: string;
}

export const PrintingForm: React.FC<PrintingFormProps> = ({ 
  open, 
  onOpenChange,
  orderId 
}) => {
  const { toast } = useToast();
  const [location, setLocation] = useState('');
  const [materialUsed, setMaterialUsed] = useState('');
  const [wastage, setWastage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!location || !materialUsed || !wastage) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log({
      orderId,
      location,
      materialUsed,
      wastage
    });

    // Show success message
    toast({
      title: "Printing details saved",
      description: `Successfully added printing details for order #${orderId || 'new'}`,
    });

    // Reset form and close dialog
    setLocation('');
    setMaterialUsed('');
    setWastage('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {orderId ? `Add Printing Details for Order #${orderId}` : 'Add New Printing Task'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="external">External</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="material-used">Material Used (meters)</Label>
            <Input
              id="material-used"
              type="number"
              value={materialUsed}
              onChange={(e) => setMaterialUsed(e.target.value)}
              placeholder="Enter material quantity in meters"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wastage">Wastage (meters)</Label>
            <Input
              id="wastage"
              type="number"
              value={wastage}
              onChange={(e) => setWastage(e.target.value)}
              placeholder="Enter wastage in meters"
            />
          </div>
          
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
