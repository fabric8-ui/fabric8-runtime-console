import {Context} from "./../models/context";
import {ContextType} from "./../models/context-type";
import {DevSpace} from "./../models/space";
import {Resources} from "./../models/resources";
import {ProcessTemplate} from "./../models/process-template";
import {User} from "./../models/user";
import {Team} from "./../models/team";
import {Entity} from "./../models/entity";
import {Injectable, OnInit} from "@angular/core";
//import {LocalStorageService} from "angular-2-local-storage";
import {Broadcaster} from "../shared/broadcaster.service";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import {Spaces, Space} from "../kubernetes/model/space.model";
import {SpaceStore} from "../kubernetes/store/space.store";
import {Router, NavigationEnd, ActivatedRoute, Params} from "@angular/router";
import {BuildConfigStore} from "../kubernetes/store/buildconfig.store";
import {BuildConfigs, BuildConfig} from "../kubernetes/model/buildconfig.model";
import {MenuItem} from "../models/menu-item";

// A service responsible for providing dummy data for the UI prototypes.

export class AppContext {
  constructor(public params: Params, public spaces: Spaces, public buildConfigs: BuildConfigs) {}
}

@Injectable()
export class DummyService implements OnInit {

  readonly RESOURCES: Resources = {
    startDate: new Date(2016, 8, 1, 0, 0, 0, 0),
    endDate: new Date(2016, 8, 30, 23, 59, 59, 0),
    list: [
      {
        type: {
          name: 'Pipeline',
          unit: 'minutes',
        },
        value: 124,
        max: 200,
      }, {
        type: {
          name: 'Environments',
          unit: 'RAM-minutes',
        },
        value: 7185,
        max: 18000,
      },
    ],
  };

  readonly USERS: Map<string, User> = new Map<string, User>(
    [
      [
        'pmuir',
        {
          attributes: {
            fullName: 'Pete Muir',
            imageURL: 'https://avatars2.githubusercontent.com/u/157761?v=3&s=460',
            email: 'pmuir@fabric8.io',
            username: 'pmuir',
            bio: 'I like writing clever one-line bios about myself. See? I just did.',
          },
          id: '111',
          type: '',
        } as User,
      ], [
        'qodfathr',
        {
          attributes: {
            fullName: 'Todd Manicini',
            imageURL: 'https://avatars1.githubusercontent.com/u/16322190?v=3&s=460',
            email: 'tmancini@fabric8.io',
            bio: 'I like writing clever one-line bios about myself. But, I can\'t!',
            username: 'qodfathr',
          },
          id: '222',
          type: '',
        } as User,
      ],
    ],
  );

  readonly ORGANIZATIONS: Map<string, Entity> = new Map<string, Entity>([
    [
      'redhat',
      {
        id: 'redhat',
      } as Entity,
    ],
  ]);

  readonly CONTEXT_TYPES: Map<string, ContextType> = new Map<string, ContextType>([
    [
      'user',
      {
        name: 'User',
        icon: 'pficon-user',
        menus: [
          {
            name: 'Spaces',
            path: '/run/spaces',
          },
/*
          {
            name: 'Profile',
            path: '',
            menus: [
              {
                name: 'Profile',
                path: ''
              }, {
                name: 'Collaboration Spaces',
                path: 'spaces'
              }, {
                name: 'Resources',
                path: 'resources'
              }
            ]
          },
          {
            path: 'settings',
            icon: 'pficon pficon-settings',
            menus: [
              {
                name: 'Profile',
                path: ''
              }/!*, {
                // Account is disabled as we don't yet support users creating accounts
                name: 'Account',
                path: 'account'
              }*!/, {
                name: 'Emails',
                path: 'emails'
              }, {
                name: 'Notifications',
                path: 'notifications'
              }
            ]
          },
*/
        ],
      } as ContextType,
    ],
    [
      'space',
      {
        name: 'DevSpace',
        icon: 'pficon-project',
        menus: [
/*
          {
            name: 'Analyze',
            path: '',
            menus: [
              {
                name: 'Overview',
                path: ''
              }, {
                name: 'README',
                path: 'readme'
              }
            ]
          }, {
            name: 'Plan',
            path: 'plan',
            menus: [
              {
                name: 'Backlog',
                path: ''
              }, {
                name: 'Board',
                path: 'board'
              }
            ]
          }, {
            name: 'Create',
            path: 'create',
            menus: [
              {
                name: 'Codebases',
                path: ''
              }, {
                name: 'Workspaces',
                path: 'workspaces'
              }
            ]
          },
*/
          {
            name: 'Run',
            path: 'run',
/*
            menus: [
              {
                name: 'Dev',
                path: '',
              },
              {
                name: 'Test',
                path: '',
              },
              {
                name: 'Staging',
                path: '',
              },
              {
                name: 'Production',
                path: '',
              },
            ],
*/
          },
          {
            name: 'Build',
            path: 'build',
/*            menus: [
              {
                name: 'Pipelines',
                path: '',
              },
            ],
            */
          },
          {
            name: '',
            path: 'settings',
            icon: 'pficon pficon-settings',
            menus: [
              {
                name: 'Overview',
                path: '',
                icon: '',
                menus: [],
              }, {
                name: 'Work',
                path: 'work',
              }, {
                name: 'Security',
                path: 'security',
              }, {
                name: 'Alerts',
                path: 'alerts',
              },
            ],
          },
        ],
      } as ContextType,
    ],
    [
      'team',
      {
        name: 'Team',
        icon: 'fa fa-users',
      } as ContextType,
    ],
    [
      'organization',
      {
        name: 'Organization',
        icon: 'fa fa-cubes',
      } as ContextType,
    ],
  ]);

  readonly TEAMS: Map<string, Team> = new Map<string, Team>([
    [
      'balloonpopgame_ux',
      {
        name: '',
        members: [
          this.USERS.get('qodfathr'),
        ],
      } as Team,
    ], [
      'balloonpopgame',
      {
        name: '',
        members: [
          this.USERS.get('pmuir'),
          this.USERS.get('qodfathr'),
        ],
      } as Team,
    ],
  ]);

  readonly SPACES: Map<string, DevSpace> = new Map<string, DevSpace>([
    [
      'bobo',
      {
        name: 'Bobo',
        path: '/pmuir/BalloonPopGame',
        description: 'Microservices architected search engine',
        teams: [],
        defaultTeam: null,
        id: '0',
        attributes: {
          name: 'Bobo',
          'created-at': '2017-01-01',
          'updated-at': '2017-01-02',
          version: 1,
        },
        type: 'spaces',
      } as DevSpace,
    ], [
      'hysterix',
      {
        name: 'Hysterix',
        path: '/pmuir/BalloonPopGame',
        description: 'Hystrix is a latency and fault tolerance library designed to isolate points of access to remote systems, services and 3rd party libraries, stop cascading failure and enable resilience in complex distributed systems where failure is inevitable.',
        teams: [],
        defaultTeam: null,
        id: '1',
        attributes: {
          name: 'Hysterix',
          'created-at': '2017-01-01',
          'updated-at': '2017-01-02',
          version: 1,
        },
        type: 'spaces',
      } as DevSpace,
    ], [
      'fabric8',
      {
        name: 'fabric8io',
        path: '/pmuir/BalloonPopGame',
        description: 'Fabric8 is an open source integrated development platform for Kubernetes',
        teams: [],
        defaultTeam: null,
        id: '2',
        attributes: {
          name: 'fabric8io',
          'created-at': '2017-01-01',
          'updated-at': '2017-01-02',
          version: 1,
        },
        type: 'spaces',
      } as DevSpace,
    ], [
      'balloonpopgame',
      {
        name: 'BalloonPopGame',
        path: '/pmuir/BalloonPopGame',
        description: 'Balloon popping fun for everyone!',
        teams: [
          this.TEAMS.get('balloonpopgame'),
          this.TEAMS.get('balloonpopgame_ux'),
        ],
        defaultTeam: this.TEAMS.get('balloonpopgame'),
        id: '3',
        attributes: {
          name: 'BalloonPopGame',
          'created-at': '2017-01-01',
          'updated-at': '2017-01-02',
          version: 1,
        },
        type: 'spaces',
      } as DevSpace,
    ],
  ]);

  readonly CONTEXTS: Map<string, Context> = new Map<string, Context>([
    [
      'pmuir',
      {
        entity: this.USERS.get('pmuir'),
        type: this.CONTEXT_TYPES.get('user'),
        path: '/pmuir',
        name: 'pmuir',
      } as Context,
    ], [
      'balloonpopgame',
      {
        entity: this.USERS.get('pmuir'),
        space: this.SPACES.get('balloonpopgame'),
        type: this.CONTEXT_TYPES.get('space'),
        path: '/pmuir/BalloonPopGame',
        name: 'BalloonPopGame',
      } as Context,
    ], [
      'ux',
      {
        entity: this.USERS.get('pmuir'),
        space: this.SPACES.get('balloonpopgame'),
        team: this.TEAMS.get('balloonpopgame_ux'),
        type: this.CONTEXT_TYPES.get('team'),
        path: null,
        name: 'BalloonPopGame / UX Team',
      } as Context,
    ], [
      'redhat',
      {
        entity: this.ORGANIZATIONS.get('redhat'),
        type: this.CONTEXT_TYPES.get('organization'),
        path: null,
        name: 'Red Hat Organization',
      } as Context,
    ],
  ]);

  readonly PROCESS_TEMPLATES: ProcessTemplate[] = [
    { name: 'Agile' },
    { name: 'Scrum' },
    { name: 'Issue Tracking' },
    { name: 'Scenario Driven Planning' },
  ];
  private _devSpaces: DevSpace[];
  private _currentContext: Context;
  private _contexts: Context[];
  private _defaultContexts: Context[];
  private _users: User[];
  private _defaultContext: Context;
  private _currentUser: User;
  private _parentContexts: Context[];
  private _urlPrefix: string;
  private _appContext: AppContext;

  private readonly buildConfigs: Observable<BuildConfigs>;
  private readonly spaces: Observable<Spaces>;
  private readonly params: Observable<Params>;

  constructor(
    //private http: Http,
    //private localStorageService: LocalStorageService,
    private broadcaster: Broadcaster,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spaceStore: SpaceStore,
    private buildConfigStore: BuildConfigStore,
  ) {
    this._defaultContexts = this.initDummy('contexts', this.CONTEXTS);
    this._devSpaces = this.initDummy('spaces', this.SPACES);
    this._contexts = this._defaultContexts;
    this._users = this.initDummy('users', this.USERS);
    this._defaultContext = this._contexts[0];
    this.spaces = this.spaceStore.list;
    this.buildConfigs = this.buildConfigStore.list;
    this.params = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.params);

    this.broadcaster.on<string>('save')
      .subscribe(() => {
        this.save();
      });
    this.broadcaster.on<User>('currentUserInit').subscribe(
      message => {
        this.addUser(message);
      },
    );
    this.broadcaster.on<string>('logout').subscribe(
      () => {
        this._currentUser = null;
      },
    );
    this.save();

    Observable.combineLatest(this.params, this.spaces, this.buildConfigs,
      (params, spaces, buildConfigs) => new AppContext(params, spaces, buildConfigs))
      .subscribe(ac => this.updateContext(ac));
  }

   ngOnInit() {
     this.spaceStore.loadAll();
   }

  private updateContext(appContext: AppContext) {
    let params = appContext.params;
    let spaces = appContext.spaces;
    let buildConfigs = appContext.buildConfigs;

    this._appContext = appContext;
    var ns = params["namespace"];
    var spaceName = params["space"];
    var app = params["app"];
    console.log("route params space: " + spaceName + " app: " + app + " namespace: " + ns);
    this._currentContext = null;
    this._parentContexts = [];
    this._urlPrefix = "/run/space";
    if (ns) {
      this._urlPrefix = "/run/space/" + ns;
      if (spaceName) {
        this._urlPrefix = "/run/space/" + spaceName + "/namespaces/" + ns;
      }

      var buildConfig: BuildConfig = null;
      var space = spaces.find(o => o.name === ns);

      if (app) {
        this._urlPrefix = "/run/app/" + app + "/space/" + spaceName + "/namespaces/" + ns;
        buildConfig = buildConfigs.find(o => o.name === app);
        if (space) {
          let spaceContext = this.createSpaceContext(space);
          this._parentContexts.push(spaceContext);
        }
      }
      if (buildConfig) {
        this._currentContext = this.createBuildConfigContext(buildConfig);
      } else {
        if (space) {
          this._currentContext = this.createSpaceContext(space);
        }
      }
      this._contexts = this.createContextsFromBuildConfigs(buildConfigs);
    } else {
      this._contexts = this.createContextsFromSpaces(spaces);
      this._currentContext = this._defaultContext;
      //this._contexts = this._defaultContexts;
    }
    if (!this._currentContext && this._contexts.length) {
      this._currentContext = this._contexts[0];
    }
    this.updateActive();
    this.broadcaster.broadcast('refreshContext');
  }

  private updateActive() {
    let current = this.currentContext;
    if (current) {
      var found = false;
      for (let n of current.type.menus) {
        // Build the fullPath if not already done
        if (!n.fullPath) {
          var path = n.path;
          if (path && path.startsWith("/")) {
            n.fullPath = path;
          } else {
            n.fullPath = this.buildPath(current.path, path);
          }
        }
        // Clear the menu's active state
        n.active = false;
        if (n.menus) {
          for (let o of n.menus) {
            // Build the fullPath if not already done
            o.fullPath = o.fullPath || this.buildPath(current.path, n.path, o.path);
            // Clear the menu's active state
            o.active = false;
            if (!found && o.fullPath === this.router.url) {
              o.active = true;
              n.active = true;
              found = true;
            }
          }
        }
        if (!found && n.fullPath === this.router.url) {
          n.active = true;
          found = true;
        }
      }
      if (!found) {
        for (let n of current.type.menus) {
          if (n.menus) {
            for (let o of n.menus) {
              if (!found && o.defaultActive) {
                o.active = true;
                n.active = true;
                found = true;
                break;
              }
            }
          }
          if (!found && n.defaultActive) {
            n.active = true;
            found = true;
            break;
          }
        }
      }
    }
  }

  private buildPath(...args: string[]): string {
    let res = '';
    for (let p of args) {
      if (p) {
        if (p.startsWith('/')) {
          res = p;
        } else {
          res = res + '/' + p;
        }
        res = res.replace(/\/*$/, '');
      }
    }
    return res;
  }


  private createContextsFromSpaces(ns: Spaces): Context[] {
    let answer = new Array<Context>();
    ns.forEach(space => {
      answer.push(this.createSpaceContext(space));
    });
    return answer;
  }

  private createSpaceContext(space: Space) {
    var ns = space.name;
    //var urlPrefix = this._urlPrefix + "/" + ns + "/namespaces/" + ns;
    var urlPrefix = this._urlPrefix;
    let runPath = urlPrefix + '/deployments';
    let buildPath = urlPrefix + '/builds';
    let buildConfigPath = urlPrefix + '/buildconfigs';
    let context = {
      entity: space,
      type: this.createSpaceContextType(space, buildConfigPath, buildPath, runPath),
      path: buildConfigPath,
      name: ns,
    };
    return context;
  }


  private createSpaceContextType(ns: Space, buildConfigPath: string, buildPath: string, runPath: string) {
    var environments = ns.environments;
    var runMenus = [];
    if (environments) {
      environments.forEach(env => {
        var envName = env.name
        // TODO
        var path = "/run/spaces/" + envName + "/";
        runMenus.push({
          name: envName,
          path: path,
        })
      });
    }
    // the UI looks a bit wacky for now - lets disable ;)
    environments = [];

    return {
      name: 'DevSpace',
      icon: 'pficon-project',
      menus: [
/*
        {
          name: 'Analyze',
          path: '',
          menus: [
            {
              name: 'Overview',
              path: ''
            }, {
              name: 'README',
              path: 'readme'
            }
          ]
        }, {
          name: 'Plan',
          path: 'plan',
          menus: [
            {
              name: 'Backlog',
              path: ''
            }, {
              name: 'Board',
              path: 'board'
            }
          ]
        }, {
          name: 'Create',
          path: 'create',
          menus: [
            {
              name: 'Codebases',
              path: ''
            }, {
              name: 'Workspaces',
              path: 'workspaces'
            }
          ]
        },
*/
        {
          name: 'App',
          path: buildConfigPath,
/*            menus: [
            {
              name: 'Pipelines',
              path: '',
            },
          ],
          */
          menus: [],
        },
        {
          name: 'Build',
          path: buildPath,
/*            menus: [
            {
              name: 'Pipelines',
              path: '',
            },
          ],
          */
          menus: [],
        },
        {
          name: 'Run',
          path: runPath,
          menus: environments,
          defaultActive: true,
        },
        {
          name: '',
          path: 'settings',
          icon: 'pficon pficon-settings',
/*          menus: [
            {
              name: 'Overview',
              path: '',
              icon: '',
              menus: [],
            }, {
              name: 'Work',
              path: 'work',
            }, {
              name: 'Security',
              path: 'security',
            }, {
              name: 'Alerts',
              path: 'alerts',
            },
          ],*/
        },
      ],
    } as ContextType;
  }

  private createContextsFromBuildConfigs(bcs: BuildConfigs): Context[] {
    let answer = new Array<Context>();
    bcs.forEach(bc => {
      answer.push(this.createBuildConfigContext(bc));
    });
    return answer;
  }

  private createBuildConfigContext(bc: BuildConfig) {
    var appContext = this._appContext;
    let params = appContext.params;
    var ns = params["namespace"];
    var spaceName = params["space"];
    var app = bc.name;

    var prefix = "/run/app/" + app + "/space/" + spaceName + "/namespaces/" + ns;
    let runPath = prefix + '/deployments';
    let buildPath = prefix + '/builds';
    let context = {
      entity: bc,
      type: this.createBuildConfigContextType(bc, buildPath, runPath),
      path: buildPath,
      name: bc.name,
    };
    return context;
  }


  private createBuildConfigContextType(bc: BuildConfig, buildPath: string, runPath: string) {
    var environments = bc['environments'];
    var runMenus = [];
    if (environments) {
      environments.forEach(env => {
        runMenus.push({
          name: env.name,
          path: env.path,
        })
      });
    }

    return {
      name: 'App',
      icon: 'pficon-build',
      menus: [
/*
        {
          name: 'Analyze',
          path: '',
          menus: [
            {
              name: 'Overview',
              path: ''
            }, {
              name: 'README',
              path: 'readme'
            }
          ]
        }, {
          name: 'Plan',
          path: 'plan',
          menus: [
            {
              name: 'Backlog',
              path: ''
            }, {
              name: 'Board',
              path: 'board'
            }
          ]
        }, {
          name: 'Create',
          path: 'create',
          menus: [
            {
              name: 'Codebases',
              path: ''
            }, {
              name: 'Workspaces',
              path: 'workspaces'
            }
          ]
        },
*/
        {
          name: 'Build',
          path: buildPath,
/*            menus: [
            {
              name: 'Pipelines',
              path: '',
            },
          ],
          */
          menus: [],
        },
        {
          name: 'Run',
          path: runPath,
          menus: environments,
          defaultActive: true,
        },
        {
          name: '',
          path: 'settings',
          icon: 'pficon pficon-settings',
/*          menus: [
            {
              name: 'Overview',
              path: '',
              icon: '',
              menus: [],
            }, {
              name: 'Work',
              path: 'work',
            }, {
              name: 'Security',
              path: 'security',
            }, {
              name: 'Alerts',
              path: 'alerts',
            },
          ],*/
        },
      ],
    } as ContextType;
  }


  get devSpaces(): DevSpace[] {
    return this._devSpaces;
  }

  get resources(): Resources {
    return this.RESOURCES;
  }

  get contexts(): Context[] {
    return this._contexts;
  }

  get currentContext(): Context {
    return this._currentContext || this._defaultContext;
  }

  get parentContexts(): MenuItem[] {
    return this._parentContexts || [];
  }

  get currentContextMenus(): MenuItem[] {
    var current = this.currentContext;
    if (current) {
      var type = current.type;
      if (type) {
        return type.menus || [];
      }
    }
    return [];
  }

  get processTemplates(): ProcessTemplate[] {
    return this.PROCESS_TEMPLATES;
  }

  get defaultContext(): Context {
    return this._defaultContext;
  }

  get users(): User[] {
    return this._users;
  }


  get currentUser(): User {
    return this._currentUser;
  }

  set currentUser(user: User) {
    this._currentUser = user;
  }

  save(): void {
/*
    this.localStorageService.set('spaces', this._spaces);
    this.localStorageService.set('contexts', this._contexts);
    this.localStorageService.set('users', this._users);
*/
  }

  lookupUser(username: string, fullName: string): User {
    for (let u of this.users) {
      // TODO Fullname is a hack until we get a bit more info back from github
      if (u.attributes.username === username || u.attributes.fullName === fullName) {
        return u;
      }
    }
    return null;
  }

  private addUser(add: User) {
    let existing: User = this.lookupUser(add.attributes.username, add.attributes.fullName);
    if (existing) {
      this.currentUser = existing;
    } else {
      this.currentUser = add;
      this.users.push(add);
      this.save();
    }
  }

/*
  private makePseudoRandmonString(len: number): string {
    let text: string = '';
    let possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i: number = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
*/

  private valuesAsArray<T>(m: Map<any, T>): T[] {
    let res: T[] = new Array<T>();
    m.forEach(function (value) {
      res.push(value);
    });
    return res;
  }

  private copyValuesToArray<T>(m: Map<any, T>): T[] {
    return JSON.parse(JSON.stringify(this.valuesAsArray(m)));
  }

  private initDummy<T>(key: string, def: Map<any, T>): T[] {
    if (!key) {
      console.log('no key for initDummy()!');
    }
    let res = this.copyValuesToArray(def);
    return res;
  }

  /*
  private initDummy<T>(key: string, def: Map<any, T>): T[] {
    let res: T[];
    if (this.localStorageService.get(key)) {
      res = this.localStorageService.get<T[]>(key);
    } else {
      res = this.copyValuesToArray(def);
    }
    return res;
  }
*/

}
