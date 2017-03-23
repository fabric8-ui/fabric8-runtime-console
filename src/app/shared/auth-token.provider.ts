import { AUTH_TOKEN } from './auth-token';
import { OnLogin } from './onlogin.service';
import { OpaqueToken } from '@angular/core';
import { AUTH_API_URL } from 'ngx-login-client';

let authTokenFactory = (onLogin: OnLogin) => {
  return onLogin.token;
};

export let authTokenProvider = {
  provide: AUTH_TOKEN,
  useFactory: authTokenFactory,
  deps: [ OnLogin ]
};
