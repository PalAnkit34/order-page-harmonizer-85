
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Calendar, Filter } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { PrintingTasks } from '@/components/PrintingTasks';
import { useIsMobile } from '@/hooks/use-mobile';

const PrintingDashboard = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        {!isMobile && (
          <div className="mb-6 flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6">Printing Dashboard</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <span className="text-4xl font-bold text-blue-600">24</span>
              <p className="text-gray-600 mt-2">Total Orders</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <span className="text-4xl font-bold text-amber-500">8</span>
              <p className="text-gray-600 mt-2">Ongoing Orders</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <span className="text-4xl font-bold text-emerald-500">16</span>
              <p className="text-gray-600 mt-2">Completed Orders</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('all')}
            className="rounded-full"
          >
            All
          </Button>
          <Button 
            variant={activeFilter === 'ongoing' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('ongoing')}
            className="rounded-full"
          >
            Ongoing
          </Button>
          <Button 
            variant={activeFilter === 'completed' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('completed')}
            className="rounded-full"
          >
            Completed
          </Button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Printing Tasks</h2>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter size={16} />
                  Location
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-2">
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="sm" className="justify-start">All Locations</Button>
                    <Button variant="ghost" size="sm" className="justify-start">Internal</Button>
                    <Button variant="ghost" size="sm" className="justify-start">External</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <PrintingTasks filter={activeFilter} />

        <Button 
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
};

export default PrintingDashboard;
