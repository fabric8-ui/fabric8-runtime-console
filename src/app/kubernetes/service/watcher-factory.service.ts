import { Injectable } from '@angular/core';

import { OnLogin } from './../../shared/onlogin.service';
import { Watcher } from './watcher';

@Injectable()
export class WatcherFactory {

  constructor(
    private onLogin: OnLogin,
  ) {}

  newInstance(pathFn: () => String, queryParams: any) {
    return new Watcher(pathFn, queryParams, this.onLogin);
  }

}
