import { ICategory } from 'app/shared/model/category.model';
import { IBrand } from 'app/shared/model/brand.model';

export interface IProduct {
  id?: number;
  name?: string;
  reference?: string;
  description?: string | null;
  imageSrc?: string | null;
  quantity?: number;
  price?: number;
  active?: boolean | null;
  category?: ICategory | null;
  brand?: IBrand | null;
}

export const defaultValue: Readonly<IProduct> = {
  active: false,
};
