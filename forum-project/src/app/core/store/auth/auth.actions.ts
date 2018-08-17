import { Action } from '@ngrx/store';
import { AuthModel } from '../models/auth.model';

export const AUTH = '[AUTH] Auth';
export const LOGOUT = '[AUTH] Logout';
export class Auth implements Action {
  type: string = AUTH;

  constructor(public payload: AuthModel) { }
}

export class Logout implements Action {
  type: string = LOGOUT;

  constructor() { }
}

export type Types = Auth | Logout;
