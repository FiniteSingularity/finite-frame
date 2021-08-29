import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { Actions } from 'vuex-smart-module';
import AuthGetters from './getters';
import AuthMutations from './mutations';
import AuthState from './state';

export default class AuthActions extends Actions<
  AuthState,
  AuthGetters,
  AuthMutations,
  AuthActions
> {
  login(payload: { username: string; password: string }): Promise<boolean> {
    this.commit('authRequest');
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:8000`
        : '';
    const url = `${baseUrl}/api-token-auth/`;

    return ajax({
      url,
      method: 'POST',
      body: payload,
    })
      .pipe(map((resp) => {return resp.response as {token: string}; }))
      .toPromise()
      .then(
        (resp) => {
          if(resp) {
            localStorage.setItem('username', payload.username);
            localStorage.setItem('token', resp.token);
            this.commit('authSuccess', {
              username: payload.username,
              token: resp.token,
            });
            return true;
          }
          return false;
        },
        (err) => {
          const error =
            err.status === 400
              ? 'Incorrect username or password.'
              : 'An error occurred.  Please try again.';
          this.commit('authError', {
            error,
          });
          return false;
        },
      );
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.commit('authLogout');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      resolve();
    });
  }
}
