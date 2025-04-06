
import React from 'react';
import { OrderHeader } from '@/components/OrderHeader';
import { OrderPageTabs } from '@/components/OrderPageTabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <OrderHeader />
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <OrderPageTabs />
        </div>
      </div>
    </div>
  );
};

export default Index;
