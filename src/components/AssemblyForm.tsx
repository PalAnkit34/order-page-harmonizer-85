
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface AssemblyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId?: string;
}

export const AssemblyForm: React.FC<AssemblyFormProps> = ({ open, onOpenChange, orderId }) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      technician: '',
      startDate: '',
      estimatedCompletion: '',
      quantity: '',
      notes: '',
      qualityChecklist: '',
    }
  });

  const onSubmit = (data: any) => {
    console.log('Assembly form data:', data);
    
    // Show success message
    toast({
      title: 'Assembly details saved',
      description: 'The order has been successfully sent to final assembly.',
    });
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assembly Details</DialogTitle>
          <DialogDescription>
            {orderId 
              ? `Add assembly details for order #${orderId}`
              : 'Add new assembly details'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="technician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assembly Technician</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a technician" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="maya">Maya Rodriguez</SelectItem>
                      <SelectItem value="raj">Raj Patel</SelectItem>
                      <SelectItem value="emma">Emma Thompson</SelectItem>
                      <SelectItem value="james">James Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="estimatedCompletion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Completion</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity to Assemble</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter quantity" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="qualityChecklist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality Checklist</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select checklist" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="standard">Standard Quality Check</SelectItem>
                      <SelectItem value="premium">Premium Quality Check</SelectItem>
                      <SelectItem value="export">Export Quality Standards</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assembly Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any specific assembly instructions or notes"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Save Assembly Details
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
