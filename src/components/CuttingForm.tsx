
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ArrowLeft, Pencil, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CuttingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId?: string;
}

export const CuttingForm: React.FC<CuttingFormProps> = ({ 
  open, 
  onOpenChange,
  orderId 
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState(false);
  
  // Cutting information
  const [cuttingSize, setCuttingSize] = useState('45cm x 35cm');
  const [machineType, setMachineType] = useState('automatic');
  const [totalFabric, setTotalFabric] = useState('850');
  
  // Wastage details
  const [wastage, setWastage] = useState('42');
  const [wastageReason, setWastageReason] = useState('Fabric Defects');
  const [efficiencyRate, setEfficiencyRate] = useState('95.1');
  const [notes, setNotes] = useState('The cutting process was completed with minimum wastage. Some fabric defects were found during inspection.');
  
  // Status information
  const [cuttingOperator, setCuttingOperator] = useState('John Smith');
  const [startDate, setStartDate] = useState('2023-03-18');
  const [startTime, setStartTime] = useState('09:30');
  const [completionDate, setCompletionDate] = useState('2023-03-20');
  const [completionTime, setCompletionTime] = useState('14:15');
  const [cuttingStatus, setCuttingStatus] = useState('completed');

  // Mock order data for display
  const mockOrderData = {
    companyName: 'EcoFabrics Ltd.',
    orderId: orderId || 'CUT-2023-0458',
    orderDate: '2023-03-15',
    quantity: '5,000',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!cuttingSize || !totalFabric) {
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
      cuttingSize,
      machineType,
      totalFabric,
      wastage,
      wastageReason,
      efficiencyRate,
      notes,
      cuttingOperator,
      startDate,
      startTime,
      completionDate,
      completionTime,
      cuttingStatus
    });

    // Show success message
    toast({
      title: "Cutting details saved",
      description: `Successfully added cutting details for order #${orderId || 'new'}`,
    });

    // Switch to view mode after saving
    setViewMode(true);
  };

  const handleEdit = () => {
    setViewMode(false);
  };

  const handleDelete = () => {
    toast({
      title: "Order deleted",
      description: `Cutting details for order #${orderId} have been deleted`,
      variant: "destructive"
    });
    onOpenChange(false);
  };

  // View mode - showing cutting details
  if (viewMode) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="flex flex-row items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => onOpenChange(false)} />
              <SheetTitle>Cutting Details - Order #{orderId}</SheetTitle>
            </div>
            <Button size="icon" variant="ghost" onClick={handleEdit}>
              <Pencil className="h-5 w-5 text-purple-600" />
            </Button>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            {/* Order Information */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Scissors size={20} className="text-purple-600" />
                </div>
                Order Information
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Company Name:</div>
                <div className="text-right font-medium">{mockOrderData.companyName}</div>
                
                <div className="text-gray-500">Order ID:</div>
                <div className="text-right font-medium">#{mockOrderData.orderId}</div>
                
                <div className="text-gray-500">Order Date:</div>
                <div className="text-right font-medium">{mockOrderData.orderDate}</div>
                
                <div className="text-gray-500">Order Quantity:</div>
                <div className="text-right font-medium">{mockOrderData.quantity} Bags</div>
              </div>
            </div>

            {/* Cutting Specifications */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Scissors size={20} className="text-purple-600" />
                </div>
                Cutting Specifications
              </h3>
              <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
                <span className="text-gray-400">Cutting template preview not available</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                <div className="text-gray-500">Cutting Size:</div>
                <div className="text-right font-medium">{cuttingSize}</div>
                
                <div className="text-gray-500">Machine Type:</div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                    {machineType.charAt(0).toUpperCase() + machineType.slice(1)}
                  </Badge>
                </div>
                
                <div className="text-gray-500">Total Fabric Used:</div>
                <div className="text-right font-medium">{totalFabric} Meters</div>
              </div>
            </div>

            {/* Wastage & Efficiency */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                    <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M3 21H21M10 10H14M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Wastage & Efficiency Tracking
              </h3>
              <div className="p-4 bg-red-50 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 font-medium">Material Wasted</p>
                    <p className="text-red-500 text-xl font-semibold">{wastage} Meters</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 font-medium">{efficiencyRate}%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Reason for Wastage:</div>
                <div className="text-right font-medium">{wastageReason}</div>
                
                <div className="text-gray-500">Efficiency Rate:</div>
                <div className="text-right font-medium text-emerald-600">{efficiencyRate}%</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">Notes/Remarks:</div>
                <div className="p-3 bg-gray-100 rounded-md text-sm">
                  {notes}
                </div>
              </div>
            </div>

            {/* Cutting Status & Progress */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Cutting Status & Progress
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Current Status:</div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    {cuttingStatus.charAt(0).toUpperCase() + cuttingStatus.slice(1)}
                  </Badge>
                </div>
                
                <div className="text-gray-500">Start Time:</div>
                <div className="text-right font-medium">
                  {new Date(`${startDate}T${startTime}`).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                
                <div className="text-gray-500">Completion Time:</div>
                <div className="text-right font-medium">
                  {new Date(`${completionDate}T${completionTime}`).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                
                <div className="text-gray-500">Cutting Operator:</div>
                <div className="text-right font-medium">{cuttingOperator}</div>
              </div>
            </div>
          </div>

          <SheetFooter className="flex flex-row gap-3 pt-4 border-t">
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={handleDelete}
            >
              Delete Order
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleEdit}
            >
              Edit Details
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Edit mode - form for adding or editing cutting details
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-[425px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {orderId ? `Add Cutting Details for Order #${orderId}` : 'Add New Cutting Task'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Cutting Specifications Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-purple-700">
              <Scissors size={16} className="text-purple-700" />
              Cutting Specifications
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cutting-size">Cutting Size</Label>
                  <Input
                    id="cutting-size"
                    type="text"
                    value={cuttingSize}
                    onChange={(e) => setCuttingSize(e.target.value)}
                    placeholder="e.g. 45cm x 35cm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="machine-type">Machine Type</Label>
                  <Select value={machineType} onValueChange={setMachineType}>
                    <SelectTrigger id="machine-type">
                      <SelectValue placeholder="Select machine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="total-fabric">Total Fabric Used (meters)</Label>
                <Input
                  id="total-fabric"
                  type="number"
                  value={totalFabric}
                  onChange={(e) => setTotalFabric(e.target.value)}
                  placeholder="Enter total fabric used"
                />
              </div>
            </div>
          </div>
          
          {/* Wastage & Efficiency Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-purple-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-700">
                <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M3 21H21M10 10H14M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Wastage & Efficiency
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wastage">Material Wastage (meters)</Label>
                  <Input
                    id="wastage"
                    type="number"
                    value={wastage}
                    onChange={(e) => setWastage(e.target.value)}
                    placeholder="Enter wastage amount"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="efficiency-rate">Efficiency Rate (%)</Label>
                  <Input
                    id="efficiency-rate"
                    type="number"
                    step="0.1"
                    value={efficiencyRate}
                    onChange={(e) => setEfficiencyRate(e.target.value)}
                    placeholder="Enter efficiency rate"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wastage-reason">Reason for Wastage</Label>
                <Input
                  id="wastage-reason"
                  type="text"
                  value={wastageReason}
                  onChange={(e) => setWastageReason(e.target.value)}
                  placeholder="Explain reason for wastage"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes/Remarks</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add additional notes or remarks"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
          
          {/* Status Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-purple-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-700">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Status Information
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cutting-status">Cutting Status</Label>
                  <Select value={cuttingStatus} onValueChange={setCuttingStatus}>
                    <SelectTrigger id="cutting-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cutting-operator">Cutting Operator</Label>
                  <Input
                    id="cutting-operator"
                    type="text"
                    value={cuttingOperator}
                    onChange={(e) => setCuttingOperator(e.target.value)}
                    placeholder="Enter operator name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="completion-date">Completion Date</Label>
                  <Input
                    id="completion-date"
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="completion-time">Completion Time</Label>
                  <Input
                    id="completion-time"
                    type="time"
                    value={completionTime}
                    onChange={(e) => setCompletionTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Save Details</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
