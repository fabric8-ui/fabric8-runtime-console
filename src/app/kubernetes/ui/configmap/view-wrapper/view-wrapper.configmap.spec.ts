/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {ConfigMapViewWrapperComponent} from "./view-wrapper.configmap";
import {ConfigMapViewToolbarComponent} from "../view-toolbar/view-toolbar.configmap";
import {ConfigMapViewComponent} from "../view/view.configmap";
import {MomentModule} from "angular2-moment";
import {ConfigMapDeleteDialog} from "../delete-dialog/delete-dialog.configmap";
import {ConfigMapScaleDialog} from "../scale-dialog/scale-dialog.configmap";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('ConfigMapViewWrapperComponent', () => {
  let configmap: ConfigMapViewWrapperComponent;
  let fixture: ComponentFixture<ConfigMapViewWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          IPaaSCommonModule,
          FormsModule,
          MomentModule,
          ModalModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
          KubernetesStoreModule,
        ],
        declarations: [
          ConfigMapViewWrapperComponent,
          ConfigMapViewToolbarComponent,
          ConfigMapViewComponent,
          ConfigMapDeleteDialog,
        ],
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
    fixture = TestBed.createComponent(ConfigMapViewWrapperComponent);
    configmap = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(configmap).toBeTruthy(); });
});
