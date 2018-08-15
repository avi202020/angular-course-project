import { AuthState } from './auth.state';
import { AuthModel } from '../models/auth.model';
import * as AuthActions from './auth.actions';

const initialState: AuthState = {
  auth: new AuthModel('', '', '', false)
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.Types
) {
  switch (action.type) {
    case AuthActions.AUTH:
      return action.payload;
    default:
      return state;
  }
}
