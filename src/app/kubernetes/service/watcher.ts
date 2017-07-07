import { ReflectiveInjector } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import { currentOAuthConfig } from '../store/oauth-config-store';
import { OnLogin } from '../../shared/onlogin.service';
import {pathJoin} from "../model/utils";


export class Watcher {
  protected ws: $WebSocket;
  protected serviceUrl: String;
  protected _dataStream: BehaviorSubject<any> = new BehaviorSubject(null);
  protected subscription: Subscription;

  constructor(protected pathFn: () => String, protected queryParams: any = null, protected onLogin: OnLogin) {
    this.lazyCreateWebSocket();
    //console.log("create: watch " + this.info);
  }

  get dataStream(): Observable<any> {
    return this._dataStream.asObservable();
  }

  /**
   * Forces recreation of the web socket
   */
  recreateIfChanged() {
    let serviceUrl = this.pathFn();
    if (serviceUrl !== this.serviceUrl) {
      this.recreate();
    }
  }

  /**
   * Forces recreation of the web socket
   */
  recreate() {
    //console.log('recreating web socket for ' + this.pathFn());
    this.close();
    this.lazyCreateWebSocket();
  }

  get info(): string {
    return "watch for " + this.pathFn() + (this.queryParams ? " query:  " + this.queryParams : "");
  }

  close() {
    //console.log("close: watch " + this.info);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    let ws = this.ws;
    if (ws) {
      this.ws = null;
      ws.close();
    }
  }

  /**
   * Returns the query string appended to the websocket URL
   */
  protected get query(): String {
    let queryParams = this.queryParams;
    let params = {};
    if (queryParams) {
      for (let k in queryParams) {
        params[k] = queryParams[k];
      }
    }
    params['watch'] = true;
    params['access_token'] = this.onLogin.token;

    let query = '';
    for (let k in params) {
      let sep = query ? '&' : '';
      query += sep + k + '=' + encodeURIComponent(params[k]);
    }
    return query ? '?' + query : '';
  }

  protected lazyCreateWebSocket() {
    if (!this.ws) {
      let wsApiServer = currentOAuthConfig().wsApiServer;
      let baseUrl = '';
      if (wsApiServer) {
        baseUrl = 'wss://' + wsApiServer;
      } else {
        let location = window.location;
        if (location) {
          let hostname = location.hostname;
          let port = location.port;
          if (hostname) {
            baseUrl = 'wss://' + hostname;
            if (port) {
              baseUrl += ':' + port;
            }
          }
        }
      }
      let wsApiServerBasePath = currentOAuthConfig().wsApiServerBasePath;
      if (wsApiServerBasePath && baseUrl) {
        baseUrl = pathJoin(baseUrl, wsApiServerBasePath);
      }
      if (baseUrl) {
        let serviceUrl = this.pathFn();
        this.serviceUrl = serviceUrl;
        if (serviceUrl) {
          let url = baseUrl + serviceUrl + this.query;
          //console.log('Websocket using URL: ' + url);
          this.ws = new $WebSocket(url);

          // send a single initial event to make it easier to combine
          // with the list observable
          this._dataStream.next({});
          this.subscription = this.ws.getDataStream().subscribe(
            (msg) => {
              this._dataStream.next(msg);
            },
            (err) => {
              console.log('WebSocket error on ' + serviceUrl, err);
              this._dataStream.error(err);
            },
            () => {
              //console.log('WebSocket complete on ' + serviceUrl);
              this.recreate();
            }
          );
        }
      } else {
        console.log('Cannot figure out the base URL so we can\'t watch this resource!');
      }
    }
  }

  // TODO
  ngOnDestroy(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
