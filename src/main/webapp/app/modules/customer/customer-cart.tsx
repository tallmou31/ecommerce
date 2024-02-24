import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntitiesByIds } from 'app/entities/product/product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { ICartItem, addItem, clearCart, deleteItem, removeItem } from 'app/shared/reducers/cart';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './customer.scss';
import { IOrderRequest } from 'app/shared/model/order-request.model';
import { validateOrder } from 'app/entities/order/order.reducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CustomerCart() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const navigate = useNavigate();

  const [orderLoading, setOrderLoading] = useState(false);

  const cartItems: ICartItem[] = useAppSelector(state => state.cart.items);
  const products: IProduct[] = useAppSelector(state => state.product.entities);

  const [form] = Form.useForm();

  const loadProducts = useCallback(() => {
    dispatch(getEntitiesByIds(cartItems.map(i => i.productId)));
  }, [cartItems]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const deleteCartItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    cartItems.forEach(item => {
      const product: IProduct = products.find(p => p.id === item.productId);
      if (product) {
        total += item.quantity * product.price;
      }
    });
    return total;
  }, [cartItems, products]);

  const addCartItem = (product: IProduct) => {
    dispatch(addItem(product));
  };

  const removeCartItem = (product: IProduct) => {
    dispatch(removeItem(product));
  };

  const validate = values => {
    if (cartItems.length > 0 && values.deliveryAddress?.trim()?.length > 0) {
      setOrderLoading(true);
      const order: IOrderRequest = { items: cartItems, deliveryAddress: values.deliveryAddress };
      validateOrder(order)
        .then(resp => {
          const { data } = resp;
          // eslint-disable-next-line no-console
          console.log(resp);
          if (data.status === 'OK') {
            toast.success('Commande passée avec succès');
            dispatch(clearCart());
            navigate('/my-orders');
          } else if (data.status === 'PARTIAL_OK') {
            toast.warning('Stock insuffisant. Veuillez réajuster les quantités suivant la disponibilité');
            loadProducts();
          } else {
            toast.error('Commande échouée');
          }
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setOrderLoading(false);
        });
    }
  };

  return (
    <div className="py-12 max-w-6xl mx-auto">
      <h1 className="text-white mb-4">Mon panier</h1>
      <div>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Nom Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item: ICartItem) => {
              const product: IProduct = products.find(p => p.id === item.productId);
              return (
                <tr key={item.productId}>
                  <td>{product?.name}</td>
                  <td className="flex flex-col items-start">
                    <span className="rounded-full shadow-lg p-2 cursor-default text-c-dark-green bg-white">
                      <MinusOutlined
                        className="cursor-pointer"
                        title="Enlever"
                        rev={'minus'}
                        style={{ fontSize: 16, fontWeight: 'bold' }}
                        onClick={e => {
                          e.preventDefault();
                          // eslint-disable-next-line no-console
                          console.log('removeCardItem');
                          removeCartItem(product);
                        }}
                      />

                      <span className="mx-3" style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {item.quantity}
                      </span>

                      {item.quantity < product?.quantity && (
                        <PlusOutlined
                          className="cursor-pointer"
                          title="Ajouter"
                          rev={'plus'}
                          style={{ fontSize: 16, fontWeight: 'bold' }}
                          onClick={e => {
                            e.preventDefault();
                            // eslint-disable-next-line no-console
                            console.log('addCardItem');
                            addCartItem(product);
                          }}
                        />
                      )}
                    </span>
                    {product?.quantity < item.quantity && (
                      <span className="mt-2 italic font-light text-red-400 text-xs">
                        Stock insuffisant. Quantité disponible : {product?.quantity}
                      </span>
                    )}
                  </td>
                  <td>{product?.price?.toLocaleString('fr-FR')} FCFA</td>
                  <td>
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => deleteCartItem(item.productId)}
                      icon={<DeleteOutlined rev={'del'} style={{ fontSize: '16px', color: '#eb2f96' }} />}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 flex text-xl">
          <span className="font-bold mr-3">Total: </span>
          <span>{totalPrice?.toLocaleString('fr-FR')} FCFA</span>
        </div>

        <div className="mt-6"></div>

        <div className="mt-6">
          {!isAuthenticated && (
            <div className="italic font-light text-red-400 text-xs mb-3">
              * Veuillez vous connecter afin de pouvoir valider votre panier
            </div>
          )}
          {cartItems.length === 0 && (
            <div className="italic font-light text-red-400 text-xs mb-3">
              * Veuillez remplir votre panier afin de pouvoir valider votre panier
            </div>
          )}

          {isAuthenticated && (
            <div className="italic font-light text-gray-600 text-xs mb-3">
              * Validez votre panier et vous recevrez un email contenant les détails de la livraison
            </div>
          )}
          <Form name="control-ref" onFinish={validate} layout={'vertical'} form={form} className="">
            {isAuthenticated && cartItems.length > 0 && (
              <Form.Item name={'deliveryAddress'} required label="Adresse de livraison">
                <Input maxLength={255} />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                htmlType="submit"
                disabled={!isAuthenticated || cartItems.length === 0}
                loading={orderLoading}
                className="rounded-lg validate-button"
              >
                Valider mon panier
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CustomerCart;
