import React from 'react';
import { IProduct } from 'app/shared/model/product.model';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICartItem, addItem, removeItem } from '../reducers/cart';
import './product.scss';
interface IProductListingProps {
  products: IProduct[];
}
function ProductListings({ products }: IProductListingProps) {
  const cartItems: ICartItem[] = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const addCartItem = (product: IProduct) => {
    dispatch(addItem(product));
  };

  const removeCartItem = (product: IProduct) => {
    dispatch(removeItem(product));
  };

  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {products.map(product => (
        <ProductCard
          quantity={cartItems?.find(c => c.productId === product.id)?.quantity || 0}
          addItem={() => addCartItem(product)}
          removeItem={() => removeCartItem(product)}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductListings;
