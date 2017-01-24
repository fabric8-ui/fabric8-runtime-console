import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {APIs} from "../model/apis.model";
import {Http} from "@angular/http";

@Injectable()
export class APIsStore {
  private _current: BehaviorSubject<APIs> = new BehaviorSubject(new APIs());
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _latest: APIs = null;

  constructor(private http: Http) {
    this.load();
  }

  get resource(): Observable<APIs> {
    return this._current.asObservable();
  }

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  get latest(): APIs {
    return this._latest;
  }

  /**
   * Returns whether we are running against openshift.
   *
   * NOTE this is intended to be invoked after the APIsStore has finished loading via the .loading() Observable<boolean>!
   *
   * @return {boolean} true if this cluster is using openshift
   */
  isOpenShift(): boolean {
    let apis = this.latest;
    if (!apis) {
      console.log("WARNING: invoked the isOpenShift() method before the APIsStore has loaded!");
      return true;
    }
    return apis.isOpenShift();
  }

  load() {
    this._loading.next(true);
    this.http.get("/swaggerapi")
      .map(res => {
        var body = res.json() || {};
        return new APIs(body.apis || []);
      })
      .subscribe(
        (apis) => {
          this._latest = apis;
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