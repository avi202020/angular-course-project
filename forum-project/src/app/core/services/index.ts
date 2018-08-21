import { AuthService } from './auth/auth.service';
import { PostsService } from './posts/posts.service';
import { CategoriesService } from './categories/categories.service';
import { CommentsService } from './comments/comments.service';

export const services = [
  AuthService,
  PostsService,
  CategoriesService,
  CommentsService
];
