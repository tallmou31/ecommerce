import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  date?: string;
  deliveryAddress?: string;
  userId?: number;
  status?: OrderStatus | null;
  expectedDeliveryDate?: string | null;
  deliveryDate?: string | null;
  orderItems?: IOrderItem[] | null;
}

export interface IOrderItem {
  id?: number;
  productId: number;
  actualPrice: number;
  quantity: number;
}

export const defaultValue: Readonly<IOrder> = {};
