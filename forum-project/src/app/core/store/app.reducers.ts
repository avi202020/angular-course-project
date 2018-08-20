import { authReducer } from './auth/auth.reducers';
import { categoryReducer } from './categories/category.reducers';
import { postReducer } from './posts/post.reducers';

export const appReducers = {
  auth: authReducer,
  categories: categoryReducer,
  posts: postReducer
};
