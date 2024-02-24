import { IOrder } from 'app/shared/model/order.model';

export interface IOrderItem {
  id?: number;
  productId?: number;
  actualPrice?: number;
  quantity?: number;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
