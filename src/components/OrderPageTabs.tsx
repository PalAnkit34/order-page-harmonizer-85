
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderManagement } from './OrderManagement';
import { BasicSpecifications } from './BasicSpecifications';
import { PipingSpecifications } from './PipingSpecifications';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OrderSpecifications } from './OrderSpecifications';
import { AccessorySelection } from './AccessorySelection';
import { ArrowLeft, LayoutDashboard, ArrowRight, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { OrderSearch } from './OrderSearch';
import { supabase } from '@/integrations/supabase/client';

export const OrderPageTabs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState({
    customer_name: '',
    quantity: 0,
    order_date: null,
    status: 'pending'
  });

  const handleOrderDataChange = (data) => {
    setOrderData(data);
  };

  const handleSaveAndNext = async () => {
    // Validate form
    if (!orderData.customer_name || !orderData.quantity) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      let orderId;
      
      // If we're editing an existing order
      if (selectedOrder && selectedOrder.id) {
        const { data, error } = await supabase
          .from('orders')
          .update({
            customer_name: orderData.customer_name,
            quantity: orderData.quantity,
            order_date: orderData.order_date ? orderData.order_date.toISOString() : null,
            status: orderData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedOrder.id)
          .select();
          
        if (error) throw error;
        
        orderId = selectedOrder.id;
        toast({
          title: "Order updated successfully",
          description: "Your order has been updated. Redirecting to printing details.",
        });
      } 
      // If it's a new order
      else {
        const { data, error } = await supabase
          .from('orders')
          .insert({
            customer_name: orderData.customer_name,
            quantity: orderData.quantity,
            order_date: orderData.order_date ? orderData.order_date.toISOString() : null,
            status: orderData.status
          })
          .select();
          
        if (error) throw error;
        
        orderId = data[0].id;
        toast({
          title: "Order saved successfully",
          description: "Your order has been saved. Redirecting to printing details.",
        });
      }
      
      // Store the order ID in localStorage for the next steps
      localStorage.setItem('currentOrderId', orderId);
      
      // Redirect to printing form
      navigate('/printing');
      
      // Setup to open the printing form with the new order
      setTimeout(() => {
        // This would trigger the PrintingForm to open in the PrintingDashboard
        window.dispatchEvent(new CustomEvent('openPrintingForm', { detail: { orderId } }));
      }, 100);
    } catch (error) {
      console.error("Error saving order:", error);
      toast({
        title: "Error saving order",
        description: error.message || "There was an error saving your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    toast({
      title: "Order loaded",
      description: `Order #${order.id} has been loaded into the form.`,
    });
  };

  // Only admins can create new orders
  if (user?.role !== 'admin') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Permission Denied</h2>
        <p className="mb-6">You don't have permission to create or edit orders.</p>
        <Button variant="outline" asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

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
      
      <OrderSearch onOrderSelect={handleOrderSelect} />
      
      <OrderManagement 
        selectedOrder={selectedOrder} 
        onOrderDataChange={handleOrderDataChange}
      />
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
