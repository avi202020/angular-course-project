import { authReducer } from './auth/auth.reducers';
import { categoryReducer } from './categories/categories.reducers';

export const appReducers = {
  auth: authReducer,
  categories: categoryReducer
};
