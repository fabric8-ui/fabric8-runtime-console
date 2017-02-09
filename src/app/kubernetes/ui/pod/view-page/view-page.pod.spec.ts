/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {PodViewPage} from "./view-page.pod";
import {PodViewWrapperComponent} from "../view-wrapper/view-wrapper.pod";
import {PodViewToolbarComponent} from "../view-toolbar/view-toolbar.pod";
import {PodViewComponent} from "../view/view.pod";
import {MomentModule} from "angular2-moment";
import {PodScaleDialog} from "../scale-dialog/scale-dialog.pod";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {Fabric8CommonModule} from "../../../../common/common.module";
import {PodPhaseIconComponent} from "../../../components/pod-phase-icon/pod-phase-icon";

describe('PodViewPage', () => {
  let pod: PodViewPage;
  let fixture: ComponentFixture<PodViewPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          Fabric8CommonModule,
          FormsModule,
          MomentModule,
          ModalModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
          KubernetesStoreModule,
        ],
        declarations: [
          PodPhaseIconComponent,
          PodViewPage,
          PodViewWrapperComponent,
          PodViewToolbarComponent,
          PodViewComponent,
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
    fixture = TestBed.createComponent(PodViewPage);
    pod = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(pod).toBeTruthy(); });
});
