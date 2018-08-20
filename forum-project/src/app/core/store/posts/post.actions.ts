import { Action } from '@ngrx/store';
import { PostModel } from '../../models/posts/post.model';

export const ADD_POST = '[POST] ADD_POST';
export const EDIT_POST = '[POST] EDIT_POST';
export const DELETE_POST = '[POST] DELETE_POST';
export const GET_ALL = '[POST] GET_ALL';

export class GetAllPosts implements Action {
  readonly type: string = GET_ALL;

  constructor(public payload: PostModel[]) { }
}

export class Add implements Action {
  readonly type: string = ADD_POST;

  constructor(public payload: PostModel) { }
}

export class Edit implements Action {
  readonly type: string = EDIT_POST;

  constructor(public payload: PostModel) { }
}

export class Delete implements Action {
  readonly type: string = DELETE_POST;

  constructor(public id: string) {
  }
}

export type Types = GetAllPosts | Add | Edit | Delete;
