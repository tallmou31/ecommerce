import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from '../../entities/order/order.reducer';
import { ICartItem } from 'app/shared/reducers/cart';
import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';
import { getEntitiesByIds } from '../../entities/product/product.reducer';

export const CustomerOrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const products: IProduct[] = useAppSelector(state => state.product.entities);
  const orderEntity: IOrder = useAppSelector(state => state.order.entity);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  useEffect(() => {
    if (!orderEntity?.id) {
      return;
    }
    dispatch(getEntitiesByIds(orderEntity.orderItems.map(i => i.productId)));
  }, [orderEntity]);

  const totalPrice = useMemo(() => {
    if (!orderEntity?.id) {
      return 0;
    }
    let total = 0;
    orderEntity.orderItems.forEach(item => {
      const product: IProduct = products.find(p => p.id === item.productId);
      if (product) {
        total += item.quantity * product.price;
      }
    });
    return total;
  }, [orderEntity, products]);

  return (
    <div className="py-12 max-w-6xl mx-auto">
      <h1 className="text-white mb-4">Détails Commande</h1>
      <div>
        <p className="mt-2">
          <span className="font-bold">Date : </span>{' '}
          <span>{orderEntity.date ? <TextFormat value={orderEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</span>
        </p>
        <p>
          <span className="font-bold">Adresse livraison : </span> <span>{orderEntity.deliveryAddress}</span>
        </p>
        <p>
          <span className="font-bold">Status : </span> <span>{orderEntity.status}</span>
        </p>
        <p>
          <span className="font-bold">Date de livraison prévue : </span>{' '}
          <span>
            {orderEntity.expectedDeliveryDate ? (
              <TextFormat value={orderEntity.expectedDeliveryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </span>
        </p>
        <p>
          <span className="font-bold">Date de livraison : </span>{' '}
          <span>
            {orderEntity.deliveryDate ? <TextFormat value={orderEntity.deliveryDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </span>
        </p>
      </div>
      <div className="my-6">
        <h3>Produits</h3>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Nom Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
            </tr>
          </thead>
          <tbody>
            {orderEntity?.orderItems?.map((item: ICartItem) => {
              const product: IProduct = products.find(p => p.id === item.productId);
              return (
                <tr key={item.productId}>
                  <td>{product?.name}</td>
                  <td className="flex flex-col items-start">
                    <span className="rounded-full shadow-lg p-2 cursor-default text-c-dark-green bg-white">
                      <span className="mx-3" style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {item.quantity}
                      </span>
                    </span>
                  </td>
                  <td>{product?.price?.toLocaleString('fr-FR')} FCFA</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 flex text-xl">
          <span className="font-bold mr-3">Total: </span>
          <span>{totalPrice?.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>
      <Button tag={Link} to="/my-orders" replace color="info" data-cy="entityDetailsBackButton">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
      </Button>
    </div>
  );
};

export default CustomerOrderDetail;
