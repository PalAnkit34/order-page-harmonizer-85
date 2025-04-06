
import React from 'react';
import { AccessorySelection } from './AccessorySelection';
import { BasicSpecifications } from './BasicSpecifications';
import { PipingSpecifications } from './PipingSpecifications';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OrderSpecifications } from './OrderSpecifications';
import { OrderManagement } from './OrderManagement';

export const OrderPageTabs = () => {
  return (
    <div className="space-y-8">
      <AccessorySelection />
      <BasicSpecifications />
      <PipingSpecifications />
      <AdditionalFeatures />
      <OrderSpecifications />
      <OrderManagement />
    </div>
  );
};
