import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Observable } from 'rxjs';
import { merge } from 'lodash';

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
      .mergeMap(route => route.params).map(params => this.getNamespace(params)).distinctUntilChanged();
  }

  protected getNamespace(params) {
    return this.getRouteParams()['namespace'] || this.defaultNamespace();
  }

  defaultNamespace(): string {
    // TODO use some other mechanism to return the default?
    return 'default';
  }

  private getRouteParams(): any {
    if (
      this.router &&
      this.router.routerState &&
      this.router.routerState.snapshot &&
      this.router.routerState.snapshot.root
    ) {
      let firstChild = this.router.routerState.snapshot.root.firstChild;
      let res = {};
      while (firstChild) {
        res = merge(res, firstChild.params);
        firstChild = firstChild.firstChild;
      }
      return res;
    }
    return null;
  }

}
