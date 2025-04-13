
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, PackageCheck } from 'lucide-react';

// Mock data for demonstration purposes
const MOCK_ASSEMBLY_TASKS = [
  {
    id: 'ASM-2023-0458',
    companyName: 'EcoFabrics Ltd.',
    status: 'completed',
    technician: 'Maya Rodriguez',
    quantity: '500 bags',
    completionDate: '2023-10-15',
    notes: 'All specifications met, client very satisfied'
  },
  {
    id: 'ASM-2023-0459',
    companyName: 'Global Textiles Inc.',
    status: 'in-progress',
    technician: 'Raj Patel',
    quantity: '350 bags',
    completionDate: 'In progress',
    notes: 'Handle attachment in process'
  },
  {
    id: 'ASM-2023-0460',
    companyName: 'Organic Fabrics Co.',
    status: 'pending',
    technician: 'Not assigned',
    quantity: '250 bags',
    completionDate: 'Not started',
    notes: 'Awaiting materials from cutting department'
  },
  {
    id: 'ASM-2023-0461',
    companyName: 'Eco Bags Co.',
    status: 'completed',
    technician: 'Emma Thompson',
    quantity: '400 bags',
    completionDate: '2023-10-12',
    notes: 'Premium quality finish, ahead of schedule'
  }
];

interface AssemblyTasksProps {
  filter: string;
}

export const AssemblyTasks: React.FC<AssemblyTasksProps> = ({ filter }) => {
  const filteredTasks = filter === 'all' 
    ? MOCK_ASSEMBLY_TASKS 
    : MOCK_ASSEMBLY_TASKS.filter(task => task.status === filter);

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <Card key={task.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Order #{task.id}</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${
                task.status === 'completed' 
                  ? 'bg-emerald-100 text-emerald-800'
                  : task.status === 'in-progress'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {task.status === 'completed' 
                  ? 'Completed' 
                  : task.status === 'in-progress'
                  ? 'In Progress'
                  : 'Pending'}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{task.companyName}</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div>
                <p className="text-xs text-gray-500">Technician</p>
                <p className="text-sm font-medium">{task.technician}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-medium">{task.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Completion</p>
                <p className="text-sm font-medium">{task.completionDate}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
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
