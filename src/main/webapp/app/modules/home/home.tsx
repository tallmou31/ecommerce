/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import './home.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Badge, Button, Pagination, Popover } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import FilterBlock, { IFilterBlocData } from './filter.block';
import { COLORS } from 'app/config/constants';
import { getEntities } from 'app/entities/product/product.reducer';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntities as getBrands } from 'app/entities/brand/brand.reducer';

const initialFilter: IFilterBlocData = {};

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const { entities, loading, totalItems } = useAppSelector(state => state.product);
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState(initialFilter);

  useEffect(() => {
    dispatch(getEntities(filterData));
  }, [filterData]);

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getBrands({}));
  }, []);

  const nbFilter = useMemo(() => {
    if (filterData == null) {
      return 0;
    }
    return Object.values(filterData).filter(v => v !== undefined && v != null && (typeof v !== 'string' || v.trim().length > 0)).length;
  }, [filterData]);
  return (
    <div>
      <div className="home-banniere ">
        <h1 className="text-center text-c-green text-2xl">Bienvenue dans SenCommerce</h1>
        <p className="text-gray-600 text-center text-md">
          Nous mettons à votre disposition des produits de qualité et catégorie divers. Faites vos achats en ligne et vous serez livré dans
          les plus brefs délais. <br />
          Satisfait ou remboursé
        </p>
      </div>

      <div className="home-header p-3 flex items-center justify-between">
        <h1 className="font-bold text-white text-3xl">Mes Tâches</h1>

        <Popover
          placement="bottomRight"
          content={
            <FilterBlock
              loading={loading}
              open={openFilter}
              setOpen={v => setOpenFilter(v)}
              data={filterData}
              setData={(d: IFilterBlocData) => setFilterData(d)}
            />
          }
          title="Filtre"
          trigger="click"
          open={openFilter}
        >
          {nbFilter > 0 ? (
            <Badge count={nbFilter} color={COLORS.secondary}>
              <Button
                type="text"
                className={'filter-button'}
                icon={<FilterOutlined rev={undefined} />}
                onClick={() => {
                  setOpenFilter(prev => !prev);
                }}
              >
                Filtrer
              </Button>
            </Badge>
          ) : (
            <Button
              type="text"
              className={'filter-button'}
              icon={<FilterOutlined rev={undefined} />}
              onClick={() => {
                setOpenFilter(prev => !prev);
              }}
            >
              Filtrer
            </Button>
          )}
        </Popover>
      </div>

      <Pagination
        total={500}
        onChange={(page, size) => {
          console.log(page, size);
        }}
      />
    </div>
  );
};

export default Home;
