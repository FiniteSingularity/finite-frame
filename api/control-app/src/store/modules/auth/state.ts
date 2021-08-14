// State
export default class AuthState {
  username = localStorage.getItem('username') || '';
  token = localStorage.getItem('token') || '';
  loggingIn = false;
  error = '';
}
