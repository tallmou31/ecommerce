import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IProduct, defaultValue } from 'app/shared/model/product.model';
import { IFilterBlocData } from 'app/modules/home/filter.block';
import { removeNull } from 'app/shared/util';

const initialState: EntityState<IProduct> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const buildParams = (data: IFilterBlocData) => {
  if (!data) {
    return {};
  }
  const all = {};
  Object.entries(removeNull(data)).forEach(([key, val]) => {
    if (['brand', 'category'].includes(key)) {
      all[key + 'Id.equals'] = val;
    } else if (key === 'priceMin') {
      all['price.greaterThanOrEqual'] = val;
    } else if (key === 'priceMax') {
      all['price.lessThanOrEqual'] = val;
    } else if (key === 'active') {
      all[key + '.equals'] = val;
    } else {
      all[key + '.contains'] = val;
    }
  });
  return all;
};

const apiUrl = 'services/productservice/api/products';

// Actions

export const getEntities = createAsyncThunk('product/fetch_entity_list', async (data: IFilterBlocData) => {
  const params = new URLSearchParams(buildParams(data));
  // eslint-disable-next-line no-console
  console.log(params);
  const requestUrl = `${apiUrl}?cacheBuster=${new Date().getTime()}&${params}`;
  return axios.get<IProduct[]>(requestUrl);
});

export const getEntitiesByIds = createAsyncThunk('product/fetch_entity_list_by_ids', async (data: number[]) => {
  // eslint-disable-next-line no-console
  const requestUrl = `${apiUrl}/get-all-ids?cacheBuster=${new Date().getTime()}`;
  return axios.post<IProduct[]>(requestUrl, { items: data });
});

export const getEntity = createAsyncThunk(
  'product/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IProduct>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'product/create_entity',
  async (entity: IProduct, thunkAPI) => {
    const result = await axios.post<IProduct>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'product/update_entity',
  async (entity: IProduct, thunkAPI) => {
    const result = await axios.put<IProduct>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'product/partial_update_entity',
  async (entity: IProduct, thunkAPI) => {
    const result = await axios.patch<IProduct>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'product/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IProduct>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const ProductSlice = createEntitySlice({
  name: 'product',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(getEntitiesByIds), (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity, getEntitiesByIds), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = ProductSlice.actions;

// Reducer
export default ProductSlice.reducer;
