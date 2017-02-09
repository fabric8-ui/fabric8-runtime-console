import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

var _token: string = "";
var _loggedInSubject: BehaviorSubject<String> = new BehaviorSubject("");

export function whenUserLoggedIn(callback: () => void) {
  if (callback) {
    if (_token) {
      callback();
    } else {
      _loggedInSubject.filter(token => token ? true : false).take(1).subscribe(token => {
        var hasToken = token ? true : false;
        console.log("Logged in with token " + hasToken);
        callback();
        return null;
      });
    }
  }
}

@Injectable()
export class OnLogin {

  get token(): string {
    return _token
  }

  public onLogin(token: string) {
    _token = token;
    _loggedInSubject.next(token);
  }

  public whenLoggedIn(callback: () => void) {
    whenUserLoggedIn(callback);
  }
}