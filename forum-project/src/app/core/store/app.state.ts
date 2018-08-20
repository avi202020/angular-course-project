import { AuthState } from './auth/auth.state';
import { CategoryState } from './categories/category.state';
import { PostState } from './posts/post.state';

export interface AppState {
  auth: AuthState;
  categories: CategoryState;
  posts: PostState;
}
