import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {currentOAuthConfig} from "../store/oauth-config-store";
import {currentUserToken} from "../../shared/onlogin.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

export class Watcher {
  protected ws: $WebSocket;
  protected serviceUrl: String;
  protected _dataStream: BehaviorSubject<any> = new BehaviorSubject(null);
  protected subscription: Subscription;

  constructor(protected pathFn: () => String, protected queryParams: any = null) {
    this.lazyCreateWebSocket();
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
    //console.log("recreating web socket for " + this.pathFn());
    this.close();
    this.lazyCreateWebSocket();
  }

  close() {
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
    params["watch"] = true;
    params["access_token"] = currentUserToken();

    let query = "";
    for (let k in params) {
      let sep = query ? "&" : "";
      query += sep + k + "=" + encodeURIComponent(params[k]);
    }
    return query ? "?" + query : "";
  }

  protected lazyCreateWebSocket() {
    if (!this.ws) {
      let wsApiServer = currentOAuthConfig().wsApiServer;
      let baseUrl = "";
      if (wsApiServer) {
        baseUrl = "wss://" + wsApiServer;
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
      if (baseUrl) {
        let serviceUrl = this.pathFn();
        this.serviceUrl = serviceUrl;
        let url = baseUrl + serviceUrl + this.query;
        //console.log("Websocket using URL: " + url);
        this.ws = new $WebSocket(url);

        // send a single initial event to make it easier to combine
        // with the list observable
        this._dataStream.next({});
        this.subscription = this.ws.getDataStream().subscribe(
          (msg) => {
            this._dataStream.next(msg);
          },
          (err) => {
            console.log("WebSocket error on " + serviceUrl, err);
            this._dataStream.error(err);
          },
          () => {
            //console.log("WebSocket complete on " + serviceUrl);
            this.recreate();
          }
        );
      } else {
        console.log("Cannot figure out the base URL so we can't watch this resource!");
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
