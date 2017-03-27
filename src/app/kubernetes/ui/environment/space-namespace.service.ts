import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SpaceNamespace } from './space-namespace';
import { SpaceStore } from './../../store/space.store';
import { ActivatedRoute, Params } from '@angular/router';
import { Space } from './../../model/space.model';
import { ConnectableObservable } from 'rxjs';
import { Injectable } from '@angular/core';
import { merge } from 'lodash';

@Injectable()
export class SpaceNamespaceService implements SpaceNamespace {

  namespaceSpace: ConnectableObservable<string>;
  labelSpace: ConnectableObservable<string>;

  constructor(
    private router: Router,
    private spaceStore: SpaceStore,
  ) {
    this.namespaceSpace = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.getRouteParams())
      .map(params => params.space)
      .publish();
    this.labelSpace = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.getRouteParams())
      .map(params => params.label)
      .do(val => console.log(val))
      .publish();
    this.namespaceSpace.connect();
    this.labelSpace.connect();
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
