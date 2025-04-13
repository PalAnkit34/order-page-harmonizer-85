
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderManagement } from './OrderManagement';
import { BasicSpecifications } from './BasicSpecifications';
import { PipingSpecifications } from './PipingSpecifications';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OrderSpecifications } from './OrderSpecifications';
import { AccessorySelection } from './AccessorySelection';
import { ArrowLeft, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export const OrderPageTabs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndNext = () => {
    setIsSaving(true);
    
    // Simulate saving the order data
    setTimeout(() => {
      setIsSaving(false);
      
      // Show success toast
      toast({
        title: "Order saved successfully",
        description: "Your order has been saved. Redirecting to printing details.",
      });
      
      // Create a new order ID (in a real app, this would come from the backend)
      const newOrderId = Math.floor(100 + Math.random() * 900).toString();
      
      // Redirect to printing form
      navigate('/printing');
      
      // Setup to open the printing form with the new order
      setTimeout(() => {
        // This would trigger the PrintingForm to open in the PrintingDashboard
        window.dispatchEvent(new CustomEvent('openPrintingForm', { detail: { orderId: newOrderId } }));
      }, 100);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Button variant="outline" asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </Button>
      </div>
      <OrderManagement />
      <PipingSpecifications />
      <AdditionalFeatures />
      <AccessorySelection />
      <OrderSpecifications />
      <BasicSpecifications />
      
      <div className="flex justify-end pt-4 border-t">
        <Button 
          onClick={handleSaveAndNext} 
          className="bg-purple hover:bg-purple-dark text-white px-6"
          disabled={isSaving}
        >
          {isSaving ? (
            <>Processing...</>
          ) : (
            <>
              Save and Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
