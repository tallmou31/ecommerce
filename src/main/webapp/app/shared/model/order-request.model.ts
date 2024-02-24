import { ICartItem } from '../reducers/cart';

export interface IOrderRequest {
  items: ICartItem[];
  deliveryAddress: string;
}

export const defaultValue: Readonly<IOrderRequest> = { items: [], deliveryAddress: null };
