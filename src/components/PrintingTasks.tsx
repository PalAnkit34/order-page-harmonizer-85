
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PrintingTasksProps {
  filter: string;
}

export const PrintingTasks: React.FC<PrintingTasksProps> = ({ filter }) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrintingTasks = async () => {
      setLoading(true);
      try {
        // Join orders and printing_requirements tables
        let query = supabase
          .from('orders')
          .select(`
            id,
            customer_name,
            quantity,
            order_date,
            status,
            printing_requirements (
              id,
              print_colors,
              material_type,
              print_location,
              special_instructions,
              status
            )
          `)
          .order('created_at', { ascending: false });
          
        // Apply filter if needed
        if (filter !== 'all') {
          query = query.eq('status', filter === 'ongoing' ? 'processing' : filter);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Format the data for display
        const formattedTasks = data.map(order => {
          // Use an empty object as fallback if printing_requirements is empty array
          const printingReq = order.printing_requirements && order.printing_requirements.length > 0 
            ? order.printing_requirements[0] 
            : {
                print_location: 'Not specified',
                material_type: 'Not specified',
                print_colors: 'Not specified',
                special_instructions: 'None'
              };
          
          return {
            id: order.id,
            companyName: order.customer_name,
            status: order.status === 'completed' ? 'completed' : 'ongoing',
            location: printingReq.print_location || 'Not specified',
            materialType: printingReq.material_type || 'Not specified',
            printColors: printingReq.print_colors || 'Not specified',
            quantity: order.quantity || 0,
            specialInstructions: printingReq.special_instructions || 'None'
          };
        });
        
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching printing tasks:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch printing tasks. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrintingTasks();
  }, [filter, toast]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Loading printing tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No printing tasks found. Create an order to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <Card key={task.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Order #{task.id.substring(0, 8)}</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${
                task.status === 'completed' 
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {task.status === 'completed' ? 'Completed' : 'Ongoing'}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{task.companyName}</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="text-xs text-gray-500">Print Colors</p>
                <p className="text-sm font-medium">{task.printColors}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Material Type</p>
                <p className="text-sm font-medium">{task.materialType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Print Location</p>
                <p className="text-sm font-medium">{task.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-medium">{task.quantity}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openPrintingForm', { 
                  detail: { orderId: task.id } 
                }));
              }}
            >
              <Eye size={16} className="mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
