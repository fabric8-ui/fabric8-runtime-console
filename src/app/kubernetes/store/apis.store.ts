import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {APIs} from "../model/apis.model";
import {Http} from "@angular/http";

/**
 * Lets keep around the singleton results to avoid doing too many requests for this static data
 */
var latestAPIs: APIs = null;

@Injectable()
export class APIsStore {
  private _current: BehaviorSubject<APIs> = new BehaviorSubject(new APIs());
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: Http) {
    this.load();
  }

  get resource(): Observable<APIs> {
    return this._current.asObservable();
  }

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  /**
   * Returns whether we are running against openshift.
   *
   * NOTE this is intended to be invoked after the APIsStore has finished loading via the .loading() Observable<boolean>!
   *
   * @return {boolean} true if this cluster is using openshift
   */
  isOpenShift(): boolean {
    let apis = latestAPIs;
    if (!apis) {
      console.log("WARNING: invoked the isOpenShift() method before the APIsStore has loaded!");
      return true;
    }
    return apis.isOpenShift();
  }

  load() {
    // we only need to load once really on startup
    if (!latestAPIs) {
      this._loading.next(true);
      this.http.get("/swaggerapi")
        .map(res => {
          var body = res.json() || {};
          return new APIs(body.apis || []);
        })
        .subscribe(
          (apis) => {
            latestAPIs = apis;
            this._current.next(apis);
            this._loading.next(false);
          },
          (error) => {
            console.log('Error retrieving APIs: ' + error);
            this._current.error(error);
            this._loading.error(error);

          });
    }
  }
}