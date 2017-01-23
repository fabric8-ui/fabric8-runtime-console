import {Injectable} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {Observable} from 'rxjs';

@Injectable()
export class NamespaceScope {
  public namespace: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.namespace = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.params).map(params => params['namespace'] || this.defaultNamespace()).distinctUntilChanged();
  }

  defaultNamespace(): string {
    // TODO use some other mechanism to return the default?
    return 'default';
  }
}
