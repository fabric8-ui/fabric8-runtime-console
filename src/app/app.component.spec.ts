import { TestAppModule } from './app.test.module';
/* tslint:disable:no-unused-variable */
import {TestBed, async} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {ConfigService, configServiceInitializer} from "./config.service";
import {APP_INITIALIZER} from "@angular/core";
import {ContextService} from "./shared/context.service";
import {DummyService} from "./dummy/dummy.service";
import {Logger} from "./shared/logger.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {KubernetesStoreModule} from "./kubernetes/kubernetes.store.module";
import {RestangularModule} from "ng2-restangular";
import {Broadcaster} from 'ngx-login-client';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserModule,
        HttpModule,
        RestangularModule.forRoot(),
        KubernetesStoreModule,
        TestAppModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      providers: [
        ConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: configServiceInitializer,
          deps: [ConfigService],
          multi: true,
        },
        Broadcaster,
        ContextService,
        DummyService,
        Logger,
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Fabric8 Console'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Fabric8 Console');
  }));

});
