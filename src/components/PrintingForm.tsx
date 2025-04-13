
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ArrowLeft, Pencil } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState(false);
  
  // Material information
  const [materialUsed, setMaterialUsed] = useState('450');
  const [gsm, setGsm] = useState('90');
  const [size, setSize] = useState('35cm x 45cm');
  const [bagColor, setBagColor] = useState('blue');
  
  // Wastage details
  const [wastage, setWastage] = useState('15');
  const [wastageReason, setWastageReason] = useState('Color misalignment during initial setup');
  const [notes, setNotes] = useState('Adjusted printing pressure to compensate for material thickness variation. Second run produced acceptable results.');
  
  // Status information
  const [location, setLocation] = useState('external');
  const [companyName, setCompanyName] = useState('PrintTech Solutions');
  const [printingStatus, setPrintingStatus] = useState('completed');
  const [completionDate, setCompletionDate] = useState('2023-05-22');

  // Mock order data for display
  const mockOrderData = {
    companyName: 'EcoBags Ltd.',
    orderId: orderId || '12345',
    orderDate: '2023-05-15',
    quantity: '5,000',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!materialUsed || !location) {
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
      materialUsed,
      gsm,
      size,
      bagColor,
      wastage,
      wastageReason,
      notes,
      location,
      companyName,
      printingStatus,
      completionDate
    });

    // Show success message
    toast({
      title: "Printing details saved",
      description: `Successfully added printing details for order #${orderId || 'new'}`,
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
      description: `Printing details for order #${orderId} have been deleted`,
      variant: "destructive"
    });
    onOpenChange(false);
  };

  // View mode - showing printing details
  if (viewMode) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="flex flex-row items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => onOpenChange(false)} />
              <SheetTitle>Printing Details - Order #{orderId}</SheetTitle>
            </div>
            <Button size="icon" variant="ghost" onClick={handleEdit}>
              <Pencil className="h-5 w-5 text-indigo-600" />
            </Button>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            {/* Order Information */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M9 14H19M9 10H19M17 20H7C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
                <div className="text-right font-medium">{mockOrderData.quantity} pcs</div>
              </div>
            </div>

            {/* Bag Design */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M2 7L12 2L22 7M2 7L12 12M2 7V17L12 22M22 7L12 12M22 7V17L12 22M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Bag Design
              </h3>
              <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
                <span className="text-gray-400">Design preview not available</span>
              </div>
            </div>

            {/* Printing Location */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Printing Location
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Location Type:</div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                    {location === 'internal' ? 'Internal' : 'External'}
                  </Badge>
                </div>
                
                <div className="text-gray-500">Company Name:</div>
                <div className="text-right font-medium">{companyName}</div>
              </div>
            </div>

            {/* Material Information */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M9 3H15M3 6L21 6M19 6L18.2 19.2C18.1166 20.2356 17.2708 21 16.2324 21H7.76756C6.7292 21 5.88343 20.2356 5.8 19.2L5 6M10 10V17M14 10V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Material Information
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Material Used:</div>
                <div className="text-right font-medium">{materialUsed} meters</div>
                
                <div className="text-gray-500">GSM:</div>
                <div className="text-right font-medium">{gsm} GSM</div>
                
                <div className="text-gray-500">Size:</div>
                <div className="text-right font-medium">{size}</div>
                
                <div className="text-gray-500">Bag Color:</div>
                <div className="text-right font-medium flex justify-end items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  {bagColor.charAt(0).toUpperCase() + bagColor.slice(1)}
                </div>
              </div>
            </div>

            {/* Wastage Details */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M3 21H21M10 10H14M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Wastage Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Wastage Amount:</div>
                <div className="text-right font-medium">{wastage} meters</div>
                
                <div className="text-gray-500">Wastage Reason:</div>
                <div className="text-right font-medium">{wastageReason}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">Notes/Remarks:</div>
                <div className="p-3 bg-gray-100 rounded-md text-sm">
                  {notes}
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Status Information
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Printing Status:</div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                    {printingStatus.charAt(0).toUpperCase() + printingStatus.slice(1)}
                  </Badge>
                </div>
                
                <div className="text-gray-500">Completion Date:</div>
                <div className="text-right font-medium">
                  {new Date(completionDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
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

  // Edit mode - form for adding or editing printing details
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {orderId ? `Add Printing Details for Order #${orderId}` : 'Add New Printing Task'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Material Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-indigo-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-700">
                <path d="M9 3H15M3 6L21 6M19 6L18.2 19.2C18.1166 20.2356 17.2708 21 16.2324 21H7.76756C6.7292 21 5.88343 20.2356 5.8 19.2L5 6M10 10V17M14 10V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Material Information
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material-used">Material Used (meters)</Label>
                  <Input
                    id="material-used"
                    type="number"
                    value={materialUsed}
                    onChange={(e) => setMaterialUsed(e.target.value)}
                    placeholder="Enter material quantity"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gsm">GSM</Label>
                  <Input
                    id="gsm"
                    type="number"
                    value={gsm}
                    onChange={(e) => setGsm(e.target.value)}
                    placeholder="Enter GSM"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 35cm x 45cm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bag-color">Bag Color</Label>
                  <Select value={bagColor} onValueChange={setBagColor}>
                    <SelectTrigger id="bag-color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wastage Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-indigo-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-700">
                <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M3 21H21M10 10H14M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Wastage Details
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wastage">Wastage Amount (meters)</Label>
                  <Input
                    id="wastage"
                    type="number"
                    value={wastage}
                    onChange={(e) => setWastage(e.target.value)}
                    placeholder="Enter wastage amount"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wastage-reason">Wastage Reason</Label>
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
            <h3 className="text-sm font-medium flex items-center gap-2 text-indigo-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-700">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Status Information
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="printing-status">Printing Status</Label>
                  <Select value={printingStatus} onValueChange={setPrintingStatus}>
                    <SelectTrigger id="printing-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-name">Printing Company (if external)</Label>
                <Input
                  id="company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  disabled={location === 'internal'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="completion-date">Completion Date</Label>
                <Input
                  id="completion-date"
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                />
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
