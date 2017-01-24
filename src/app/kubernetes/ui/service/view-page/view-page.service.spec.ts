/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {ServiceViewPage} from "./view-page.service";
import {ServiceViewWrapperComponent} from "../view-wrapper/view-wrapper.service";
import {ServiceViewToolbarComponent} from "../view-toolbar/view-toolbar.service";
import {ServiceViewComponent} from "../view/view.service";
import {MomentModule} from "angular2-moment";
import {ServiceScaleDialog} from "../scale-dialog/scale-dialog.service";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('ServiceViewPage', () => {
  let service: ServiceViewPage;
  let fixture: ComponentFixture<ServiceViewPage>;

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
          ServiceViewPage,
          ServiceViewWrapperComponent,
          ServiceViewToolbarComponent,
          ServiceViewComponent,
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
    fixture = TestBed.createComponent(ServiceViewPage);
    service = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(service).toBeTruthy(); });
});
