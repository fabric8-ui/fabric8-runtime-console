/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {PodViewWrapperComponent} from "./view-wrapper.pod";
import {PodViewToolbarComponent} from "../view-toolbar/view-toolbar.pod";
import {PodViewComponent} from "../view/view.pod";
import {MomentModule} from "angular2-moment";
import {PodDeleteDialog} from "../delete-dialog/delete-dialog.pod";
import {PodScaleDialog} from "../scale-dialog/scale-dialog.pod";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('PodViewWrapperComponent', () => {
  let pod: PodViewWrapperComponent;
  let fixture: ComponentFixture<PodViewWrapperComponent>;

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
          KuberentesStoreModule,
        ],
        declarations: [
          PodViewWrapperComponent,
          PodViewToolbarComponent,
          PodViewComponent,
          PodDeleteDialog,
          PodScaleDialog,
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
    fixture = TestBed.createComponent(PodViewWrapperComponent);
    pod = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(pod).toBeTruthy(); });
});
