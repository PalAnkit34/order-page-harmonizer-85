
import React from 'react';
import { Link } from 'react-router-dom';
import { OrderManagement } from './OrderManagement';
import { BasicSpecifications } from './BasicSpecifications';
import { PipingSpecifications } from './PipingSpecifications';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OrderSpecifications } from './OrderSpecifications';
import { AccessorySelection } from './AccessorySelection';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

export const OrderPageTabs = () => {
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
      <OrderManagement />
      <PipingSpecifications />
      <AdditionalFeatures />
      <AccessorySelection />
      <OrderSpecifications />
      <BasicSpecifications />
    </div>
  );
};
