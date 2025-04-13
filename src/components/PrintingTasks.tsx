
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock data for demonstration purposes
const MOCK_PRINTING_TASKS = [
  {
    id: '12345',
    companyName: 'ABC Non-Woven Ltd.',
    status: 'ongoing',
    location: 'Internal',
    materialUsed: '450 meters',
    wastage: '12 meters'
  },
  {
    id: '12346',
    companyName: 'XYZ Packaging Solutions',
    status: 'completed',
    location: 'External',
    materialUsed: '780 meters',
    wastage: '25 meters'
  },
  {
    id: '12347',
    companyName: 'Global Enterprises',
    status: 'ongoing',
    location: 'Internal',
    materialUsed: '320 meters',
    wastage: '8 meters'
  },
  {
    id: '12348',
    companyName: 'Eco Bags Co.',
    status: 'completed',
    location: 'External',
    materialUsed: '550 meters',
    wastage: '15 meters'
  }
];

interface PrintingTasksProps {
  filter: string;
}

export const PrintingTasks: React.FC<PrintingTasksProps> = ({ filter }) => {
  const filteredTasks = filter === 'all' 
    ? MOCK_PRINTING_TASKS 
    : MOCK_PRINTING_TASKS.filter(task => task.status === filter);

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
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {task.status === 'completed' ? 'Completed' : 'Ongoing'}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{task.companyName}</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{task.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Material Used</p>
                <p className="text-sm font-medium">{task.materialUsed}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Wastage</p>
                <p className="text-sm font-medium">{task.wastage}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300"
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
