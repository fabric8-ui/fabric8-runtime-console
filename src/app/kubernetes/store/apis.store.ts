import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {APIs} from "../model/apis.model";
import {Http} from "@angular/http";

/**
 * Lets keep around the singleton results to avoid doing too many requests for this static data
 */
var _latestAPIs: APIs = null;

var _startedLoadingAPIs = false;

let _currentAPIs: BehaviorSubject<APIs> = new BehaviorSubject(_latestAPIs);
let _loadingAPIs: BehaviorSubject<boolean> = new BehaviorSubject(true);


@Injectable()
export class APIsStore {

  constructor(private http: Http) {
    this.load();
  }

  get resource(): Observable<APIs> {
    return _currentAPIs.asObservable();
  }

  get loading(): Observable<boolean> {
    return _loadingAPIs.asObservable();
  }

  /**
   * Returns whether we are running against openshift.
   *
   * NOTE this is intended to be invoked after the APIsStore has finished loading via the .loading() Observable<boolean>!
   *
   * @return {boolean} true if this cluster is using openshift
   */
  isOpenShift(): boolean {
    let apis = _latestAPIs;
    if (!apis) {
      console.log("WARNING: invoked the isOpenShift() method before the APIsStore has loaded!");
      return true;
    }
    return apis.isOpenShift();
  }

  load() {
    // we only need to load once really on startup
    if (_startedLoadingAPIs) {
      return;
    }
    _startedLoadingAPIs = true;
    if (!_latestAPIs) {
      console.log("Loading Swagger as latest is: " + _latestAPIs);
      this.http.get("/swaggerapi")
        .map(res => {
          var body = res.json() || {};
          var apiObjects = body.apis || [];
          var apiPaths = apiObjects.map(o => o.path);
          return new APIs(apiPaths);
        })
        .subscribe(
          (apis) => {
            _latestAPIs = apis;
            _currentAPIs.next(apis);
            _loadingAPIs.next(false);
          },
          (error) => {
            console.log('Error retrieving APIs: ' + error);
            _currentAPIs.error(error);
            _loadingAPIs.error(error);
          });
    }
  }
}