import { AuthState } from './auth/auth.state';
import { CategoryState } from './categories/categories.state';

export interface AppState {
  auth: AuthState;
  categories: CategoryState;
}
