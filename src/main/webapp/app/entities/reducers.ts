import product from 'app/entities/product/product.reducer';
import category from 'app/entities/category/category.reducer';
import brand from 'app/entities/brand/brand.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  product,
  category,
  brand,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
