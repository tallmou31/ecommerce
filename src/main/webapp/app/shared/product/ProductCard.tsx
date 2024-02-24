import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IProduct } from '../model/product.model';
import Price from './Price';
import { Card } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface IProductCardProps {
  product: IProduct;
  addItem: () => void;
  removeItem: () => void;
  quantity: number;
}

function ProductCard({ product, addItem, removeItem, quantity }: IProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      cover={
        <img
          style={{ height: 200 }}
          alt="example"
          src={product.imageSrc ? product.imageSrc : 'https://fomantic-ui.com/images/wireframe/image.png'}
          onClick={() => navigate(`/products/${product.id}`)}
          className="cursor-pointer"
        />
      }
      className="w-72 rounded shadow-lg mx-auto border border-palette-lighter product-card"
    >
      <div className="flex flex-col h-full justify-between">
        <Link to={`/products/${product.id}`} className="no-underline flex-1 product-card-header flex flex-col">
          <h1 className="text-xl text-c-dark-green font-bold">{product.name}</h1>
          {product.brand && <span className="text-gray-500 italic text-sm">{product.brand?.name}</span>}
          {product.category && <span className="text-c-green italic text-sm">{product.category?.name}</span>}
        </Link>
        <div className="flex justify-between gap-3 product-card-footer items-center">
          <div className="rounded-full shadow-lg p-2 cursor-default text-c-dark-green">
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
                  removeItem();
                }}
              />
            )}
            {quantity > 0 && (
              <span className="mx-3" style={{ fontSize: 16, fontWeight: 'bold' }}>
                {quantity}
              </span>
            )}
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
                  addItem();
                }}
              />
            )}
          </div>
          <span className=" text-gray-600 font-bold">{product.price.toLocaleString('fr-FR')} FCFA</span>
        </div>
        {product.quantity > 0 && product.quantity <= 5 && (
          <span className="italic font-light text-orange-500 text-xs ml-3">Plus que {product.quantity} restants</span>
        )}
        {product.quantity === 0 && <span className="italic font-light text-red-400 text-xs ml-3">Stock épuisé</span>}
      </div>
    </Card>
  );
}

export default ProductCard;
