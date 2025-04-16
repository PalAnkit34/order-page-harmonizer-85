import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      print_colors: '',
      material_type: '',
      print_location: '',
      special_instructions: '',
    },
  });

  // Fetch order details when orderId changes
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();
          
        if (error) throw error;
        
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch order details.',
          variant: 'destructive',
        });
      }
    };

    fetchOrderDetails();
  }, [orderId, toast]);

  // Check if printing requirements already exist for this order
  useEffect(() => {
    const fetchPrintingRequirements = async () => {
      if (!orderId) return;
      
      try {
        const { data, error } = await supabase
          .from('printing_requirements')
          .select('*')
          .eq('order_id', orderId)
          .single();
          
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned" error
        
        if (data) {
          // Pre-fill the form with existing data
          form.reset({
            print_colors: data.print_colors || '',
            material_type: data.material_type || '',
            print_location: data.print_location || '',
            special_instructions: data.special_instructions || '',
          });
        }
      } catch (error) {
        console.error('Error fetching printing requirements:', error);
      }
    };

    if (open) {
      fetchPrintingRequirements();
    }
  }, [orderId, open, form]);

  const onSubmit = async (values: any) => {
    if (!orderId) {
      toast({
        title: 'Error',
        description: 'No order ID provided. Please select an order first.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if printing requirements already exist for this order
      const { data: existingData, error: checkError } = await supabase
        .from('printing_requirements')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      let result;
      
      if (existingData) {
        // Update existing printing requirements
        result = await supabase
          .from('printing_requirements')
          .update({
            print_colors: values.print_colors,
            material_type: values.material_type,
            print_location: values.print_location,
            special_instructions: values.special_instructions,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingData.id);
      } else {
        // Insert new printing requirements
        result = await supabase
          .from('printing_requirements')
          .insert({
            order_id: orderId,
            print_colors: values.print_colors,
            material_type: values.material_type,
            print_location: values.print_location,
            special_instructions: values.special_instructions,
          });
      }
      
      if (result.error) throw result.error;
      
      // Update the order status to "processing"
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'processing', updated_at: new Date().toISOString() })
        .eq('id', orderId);
        
      if (updateError) throw updateError;
      
      toast({
        title: 'Success',
        description: 'Printing requirements have been saved.',
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving printing requirements:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save printing requirements.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {orderDetails 
              ? `Printing Details for Order #${orderDetails.id.substring(0, 8)} - ${orderDetails.customer_name}`
              : 'Printing Details'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="print_colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Print Colors</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select print colors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single_color">Single Color</SelectItem>
                        <SelectItem value="two_color">Two Colors</SelectItem>
                        <SelectItem value="full_color">Full Color CMYK</SelectItem>
                        <SelectItem value="pantone">Pantone Colors</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="material_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Type</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paper">Paper</SelectItem>
                        <SelectItem value="vinyl">Vinyl</SelectItem>
                        <SelectItem value="fabric">Fabric</SelectItem>
                        <SelectItem value="plastic">Plastic</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="print_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Print Location</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select print location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front_only">Front Only</SelectItem>
                        <SelectItem value="back_only">Back Only</SelectItem>
                        <SelectItem value="both_sides">Both Sides</SelectItem>
                        <SelectItem value="custom">Custom Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="special_instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any special instructions for the printing process..." 
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="gap-2" disabled={isSubmitting}>
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Printing Details'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
