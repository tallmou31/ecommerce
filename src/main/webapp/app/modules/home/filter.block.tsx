import { Button, Form, Input, Select } from 'antd';
import { useAppSelector } from 'app/config/store';
import { ICategory } from 'app/shared/model/category.model';
import React, { useEffect } from 'react';
import { filterOption, filterSort } from 'app/shared/util';
import { IBrand } from 'app/shared/model/brand.model';

export interface IFilterBlocData {
  name?: string | null;
  priceMin?: number | null;
  priceMax?: number | null;
  category?: number | null;
  brand?: number | null;
  page?: number | null;
  size?: number | null;
  sort?: string | null;
  active?: boolean;
}
export interface IFilterBlocProps {
  data: IFilterBlocData | null;
  open: boolean;
  loading: boolean;
  setOpen: (val: boolean) => void;
  setData: (data: IFilterBlocData) => void;
}

const defaultOption = { label: 'Aucun', value: '' };

function FilterBlock({ data, open, setOpen, loading, setData }: IFilterBlocProps) {
  const categories = useAppSelector(state => state.category.entities);
  const categoriesLoading = useAppSelector(state => state.category.loading);
  const brands = useAppSelector(state => state.brand.entities);
  const brandsLoading = useAppSelector(state => state.brand.loading);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...data,
    });
  }, [form, data]);

  const handleOk = values => {
    // eslint-disable-next-line no-console
    console.log(values);
    setData({ ...values, page: data.page, size: data.size });
  };

  return (
    <div>
      <Form
        name="basic2"
        className="w-full flex flex-col justify-center items-center"
        onFinish={handleOk}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item className="w-full" label="Nom" name="name">
          <Input />
        </Form.Item>
        <Form.Item className="w-full" label="Prix minimal" name="priceMin">
          <Input type="number" />
        </Form.Item>
        <Form.Item className="w-full" label="Prix maximal" name="priceMax">
          <Input type="number" />
        </Form.Item>
        <Form.Item className="w-full" label="Catégorie" name={'category'}>
          <Select
            placeholder={'Selectionnez une catégorie'}
            loading={categoriesLoading}
            showSearch
            filterOption={filterOption}
            filterSort={filterSort}
            options={[
              defaultOption,
              ...categories.map((r: ICategory) => ({
                label: r.name,
                value: r.id,
              })),
            ]}
          />
        </Form.Item>
        <Form.Item className="flex-1" label="Marque" name={'brand'}>
          <Select
            placeholder={'Selectionnez une marque'}
            loading={brandsLoading}
            showSearch
            filterOption={filterOption}
            filterSort={filterSort}
            options={[
              defaultOption,
              ...brands.map((r: IBrand) => ({
                label: r.name,
                value: r.id,
              })),
            ]}
          />
        </Form.Item>

        <div>
          <Button
            className="bg-white !text-c-dark-green"
            key="back"
            onClick={() => {
              form.resetFields();
              setData({ size: data.size, page: data.page });
            }}
          >
            Réinitialiser
          </Button>
          <Button htmlType="submit" key="submit" type="primary" disabled={loading} loading={loading}>
            Rechercher
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FilterBlock;
