
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Scissors } from 'lucide-react';

// Mock data for demonstration purposes
const MOCK_CUTTING_TASKS = [
  {
    id: 'CUT-2023-0458',
    companyName: 'EcoFabrics Ltd.',
    status: 'completed',
    operator: 'John Smith',
    fabricUsed: '850 meters',
    wastage: '42 meters',
    efficiency: '95.1%'
  },
  {
    id: 'CUT-2023-0459',
    companyName: 'Global Textiles Inc.',
    status: 'in-progress',
    operator: 'Sarah Johnson',
    fabricUsed: '620 meters',
    wastage: '30 meters',
    efficiency: '93.5%'
  },
  {
    id: 'CUT-2023-0460',
    companyName: 'Organic Fabrics Co.',
    status: 'pending',
    operator: 'Not assigned',
    fabricUsed: '0 meters',
    wastage: '0 meters',
    efficiency: '0%'
  },
  {
    id: 'CUT-2023-0461',
    companyName: 'Eco Bags Co.',
    status: 'completed',
    operator: 'David Miller',
    fabricUsed: '750 meters',
    wastage: '35 meters',
    efficiency: '94.7%'
  }
];

interface CuttingTasksProps {
  filter: string;
}

export const CuttingTasks: React.FC<CuttingTasksProps> = ({ filter }) => {
  const filteredTasks = filter === 'all' 
    ? MOCK_CUTTING_TASKS 
    : MOCK_CUTTING_TASKS.filter(task => task.status === filter);

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
                <p className="text-xs text-gray-500">Operator</p>
                <p className="text-sm font-medium">{task.operator}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fabric Used</p>
                <p className="text-sm font-medium">{task.fabricUsed}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Efficiency</p>
                <p className="text-sm font-medium">{task.efficiency}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
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
