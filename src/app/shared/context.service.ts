import {Injectable} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Context} from "./../models/context";
import {DummyService} from "./../dummy/dummy.service";
import {Broadcaster} from "../shared/broadcaster.service";


/*
 * A shared service that manages the users current context. The users context is defined as the
 * entity (user or org) and space that they are operating on.
 *
 */
@Injectable()
export class ContextService {

  private _current: Context;
  private _namespace: string;

  constructor(
    private dummy: DummyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private broadcaster: Broadcaster,
  ) {
    // Listen for any context refreshes requested by the app
    this.broadcaster.on<string>('refreshContext').subscribe(() => {
      this.computeContext();
    });
    // Compute the initial context
    this.computeContext();

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.params).map(params => params['namespace']).distinctUntilChanged()
      .subscribe(ns => this.namespace = ns);

    this.activatedRoute.params.subscribe(params => this.namespace = params['namespace']);
  }

  get current(): Context {
    return this._current;
  }

  set namespace(namespace: string) {
    this._namespace = namespace;
    this.computeContext();

  }
  private computeContext() {
    // lets use the namespace to find the context
    var ns = this._namespace;
    if (ns) {
      var contexts = this.dummy.contexts;
      if (contexts) {
        var selected: Context = null;
        contexts.forEach(context => {
          var name = context.name;
          if (!selected && name && name === ns) {
            selected = context;
          }
        });
        if (selected) {
          this._current = selected;
          return;
        }
      }
    }


    // Find the most specific context menu path and display it
    let c;
    for (let m of this.dummy.contexts) {
      if (this.router.url.startsWith(m.path)) {
        if (c == null || m.path.length > c.path.length) {
          c = m;
        }
      }
    }
    this._current = c || this.dummy.defaultContext;
    if (this.current.type.menus) {
      for (let n of this.current.type.menus) {
        // Build the fullPath if not already done
        n.fullPath = n.fullPath || this.buildPath(this.current.path, n.path);
        // Clear the menu's active state
        n.active = false;
        if (n.menus) {
          for (let o of n.menus) {
            // Build the fullPath if not already done
            o.fullPath = o.fullPath || this.buildPath(this.current.path, n.path, o.path);
            // Clear the menu's active state
            o.active = false;
            if (o.fullPath === this.router.url) {
              o.active = true;
              n.active = true;
            }
          }
        } else if (n.fullPath === this.router.url) {
          n.active = true;
        }
      }
    }
  }

  private buildPath(...args: string[]): string {
    let res = '';
    for (let p of args) {
      if (p.startsWith('/')) {
        res = p;
      } else {
        res = res + '/' + p;
      }
      res = res.replace(/\/*$/, '');
    }
    return res;
  }

}
