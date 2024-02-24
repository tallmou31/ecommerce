import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from 'app/entities/product/product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { ICartItem, addItem, removeItem } from 'app/shared/reducers/cart';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

function CustomerProductDetails() {
  const dispatch = useAppDispatch();
  const cartItems: ICartItem[] = useAppSelector(state => state.cart.items);

  const { id } = useParams<'id'>();
  const product: IProduct = useAppSelector(state => state.product.entity);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const quantity: number = useMemo(() => cartItems.find(v => v.productId === Number(id)), [cartItems])?.quantity || 0;

  const addCartItem = () => {
    dispatch(addItem(product));
  };

  const removeCartItem = () => {
    dispatch(removeItem(product));
  };

  return (
    <div className="py-12 max-w-6xl mx-auto">
      <h1 className="text-white mb-4">Détails produit</h1>
      <div className="flex gap-3">
        <div>
          <img
            className="lg:max-w-2xl"
            alt="example"
            src={product.imageSrc ? product.imageSrc : 'https://fomantic-ui.com/images/wireframe/image.png'}
          />
        </div>
        <div>
          <h1 className=" text-c-dark-green font-bold">{product.name}</h1>
          <p className="mt-2">
            <span className="font-bold">Catégorie : </span> <span>{product.category?.name}</span>
          </p>
          <p>
            <span className="font-bold">Marque : </span> <span>{product.brand?.name}</span>
          </p>
          <span className="font-bold mt-3">Description: </span>
          <p className="text-gray-700 text-md mt-1">{product.description}</p>

          <p className="mt-2">
            <span className="font-bold">Prix : </span>{' '}
            <span className="text-c-dark-green ml-3">{product.price?.toLocaleString('fr-FR')} FCFA</span>
          </p>

          <p className="mt-2">
            <span className="font-bold">Quantité : </span>

            <span className="ml-5 rounded-full shadow-lg p-2 cursor-default text-c-dark-green bg-white">
              {quantity > 0 && (
                <MinusOutlined
                  className="cursor-pointer"
                  title="Enlever"
                  rev={'minus'}
                  style={{ fontSize: 16, fontWeight: 'bold' }}
                  onClick={e => {
                    e.preventDefault();
                    // eslint-disable-next-line no-console
                    console.log('removeCardItem');
                    removeCartItem();
                  }}
                />
              )}

              <span className="mx-3" style={{ fontSize: 16, fontWeight: 'bold' }}>
                {quantity}
              </span>

              {quantity < product.quantity && (
                <PlusOutlined
                  className="cursor-pointer"
                  title="Ajouter"
                  rev={'plus'}
                  style={{ fontSize: 16, fontWeight: 'bold' }}
                  onClick={e => {
                    e.preventDefault();
                    // eslint-disable-next-line no-console
                    console.log('addCardItem');
                    addCartItem();
                  }}
                />
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerProductDetails;
