import { TestAppModule } from './../../../../app.test.module';
/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConfigMapEditToolbarComponent} from "./edit-toolbar.configmap.component";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {RestangularModule} from "ng2-restangular";

describe('ConfigMapEditToolbarComponent', () => {
  let configmap: ConfigMapEditToolbarComponent;
  let fixture: ComponentFixture<ConfigMapEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [
            RouterTestingModule.withRoutes([]),
            RestangularModule.forRoot(),
            KubernetesStoreModule,
            TestAppModule
          ],
          declarations: [ConfigMapEditToolbarComponent],
          providers: [
            MockBackend,
            { provide: RequestOptions, useClass: BaseRequestOptions },
            {
              provide: Http, useFactory: (backend, options) => {
                return new Http(backend, options);
              }, deps: [MockBackend, RequestOptions],
            },
          ],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMapEditToolbarComponent);
    configmap = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(configmap).toBeTruthy(); });
});
