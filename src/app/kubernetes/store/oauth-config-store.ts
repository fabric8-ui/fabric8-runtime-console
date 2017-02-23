import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Http} from "@angular/http";


export class OAuthConfig {
  public authorizeUri: string;
  public clientId: string;
  public logoutUri: string;
  public issuer: string;
  public apiServer: string;
  public loaded: boolean;

  constructor(data: any) {
    var config = data || {};
    var oauth = config.oauth || {};

    this.loaded = data ? true : false;
    this.apiServer = config.api_server || "";
    this.authorizeUri = oauth.oauth_authorize_uri || "";
    this.clientId = oauth.oauth_client_id || "fabric8";
    this.issuer = oauth.oauth_issuer || "";
    this.logoutUri = oauth.logout_uri || "";

    if (!this.issuer && this.authorizeUri) {
      // lets default the issuer from the authorize Uri
      var url = this.authorizeUri;
      var idx = url.indexOf('/', 9);
      if (idx > 0) {
        url = url.substring(0, idx);
      }
      this.issuer = url;
      console.log("Defaulted the issuer URL to: " + this.issuer);
    }
  }
}

/**
 * Lets keep around the singleton results to avoid doing too many requests for this static data
 */
var _latestOAuthConfig: OAuthConfig = new OAuthConfig(null);

var _startedLoadingOAuthConfig = false;

let _currentOAuthConfig: BehaviorSubject<OAuthConfig> = new BehaviorSubject(_latestOAuthConfig);
let _loadingOAuthConfig: BehaviorSubject<boolean> = new BehaviorSubject(true);


export function currentOAuthConfig() {
  return _latestOAuthConfig;
}

@Injectable()
export class OAuthConfigStore {

  constructor(private http: Http) {
    this.load();
  }

  get resource(): Observable<OAuthConfig> {
    return _currentOAuthConfig.asObservable();
  }

  get loading(): Observable<boolean> {
    return _loadingOAuthConfig.asObservable();
  }

  /**
   * Returns whether we are running against openshift.
   *
   * NOTE this is intended to be invoked after the OAuthConfigStore has finished loading via the .loading() Observable<boolean>!
   *
   * @return {boolean} true if this cluster is using openshift
   */
  get config(): OAuthConfig {
    let answer = _latestOAuthConfig;
    if (!answer) {
      console.log("WARNING: invoked the isOpenShift() method before the OAuthConfigStore has loaded!");
    }
    return answer;
  }

  load() {
    // we only need to load once really on startup
    if (_startedLoadingOAuthConfig) {
      return;
    }
    _startedLoadingOAuthConfig = true;
    let configUri = "/config/oauth.json";
    this.http.get(configUri)
      .subscribe(
        (res) => {
          let data = res.json();
          _latestOAuthConfig = new OAuthConfig(data);
          _currentOAuthConfig.next(_latestOAuthConfig);
          _loadingOAuthConfig.next(false);
        },
        (error) => {
          console.log('Could not find OAuth configuration at " + configUri + ": ' + error);
          _currentOAuthConfig.next(_latestOAuthConfig);
          _loadingOAuthConfig.next(false);
        });
  }
}