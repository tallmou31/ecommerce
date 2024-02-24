import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Order from './order';
import OrderDetail from './order-detail';
import OrderUpdate from './order-update';
import OrderCancelDialog from './order-cancel-dialog';
import OrderDeliveryDialog from './order-delivery-dialog';

const OrderRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Order />} />
    <Route path="new" element={<OrderUpdate />} />
    <Route path=":id">
      <Route index element={<OrderDetail />} />
      <Route path="edit" element={<OrderUpdate />} />
      <Route path="cancel" element={<OrderCancelDialog />} />
      <Route path="delivery" element={<OrderDeliveryDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrderRoutes;
