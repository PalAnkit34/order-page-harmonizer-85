
import React from 'react';
import { OrderManagement } from './OrderManagement';
import { BasicSpecifications } from './BasicSpecifications';
import { PipingSpecifications } from './PipingSpecifications';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OrderSpecifications } from './OrderSpecifications';
import { AccessorySelection } from './AccessorySelection';

export const OrderPageTabs = () => {
  return (
    <div className="space-y-8">
      <OrderManagement />
      <BasicSpecifications />
      <PipingSpecifications />
      <AdditionalFeatures />
      <OrderSpecifications />
      <AccessorySelection />
    </div>
  );
};
