
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccessorySelection } from './AccessorySelection';
import { BasicSpecifications } from './BasicSpecifications';
import { PipingSpecifications } from './PipingSpecifications';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OrderSpecifications } from './OrderSpecifications';
import { OrderManagement } from './OrderManagement';

export const OrderPageTabs = () => {
  return (
    <Tabs defaultValue="customize" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="customize">Customize Order</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="management">Management</TabsTrigger>
      </TabsList>
      
      <TabsContent value="customize" className="space-y-6">
        <AccessorySelection />
        <BasicSpecifications />
      </TabsContent>
      
      <TabsContent value="specifications" className="space-y-6">
        <PipingSpecifications />
        <AdditionalFeatures />
        <OrderSpecifications />
      </TabsContent>
      
      <TabsContent value="management">
        <OrderManagement />
      </TabsContent>
    </Tabs>
  );
};
