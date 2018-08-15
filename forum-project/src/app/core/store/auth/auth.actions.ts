import { Action } from '@ngrx/store';
import { AuthModel } from '../models/auth.model';

export const AUTH = '[AUTH] Auth';

export class Auth implements Action {
  type: string = AUTH;

  constructor(public payload: AuthModel) { }
}

export type Types = Auth;
