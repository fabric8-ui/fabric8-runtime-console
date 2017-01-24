/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {DeploymentViewWrapperComponent} from "./view-wrapper.deployment";
import {DeploymentViewToolbarComponent} from "../view-toolbar/view-toolbar.deployment";
import {DeploymentViewComponent} from "../view/view.deployment";
import {MomentModule} from "angular2-moment";
import {DeploymentDeleteDialog} from "../delete-dialog/delete-dialog.deployment";
import {DeploymentScaleDialog} from "../scale-dialog/scale-dialog.deployment";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('DeploymentViewWrapperComponent', () => {
  let deployment: DeploymentViewWrapperComponent;
  let fixture: ComponentFixture<DeploymentViewWrapperComponent>;

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
          DeploymentViewWrapperComponent,
          DeploymentViewToolbarComponent,
          DeploymentViewComponent,
          DeploymentDeleteDialog,
          DeploymentScaleDialog,
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
    fixture = TestBed.createComponent(DeploymentViewWrapperComponent);
    deployment = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
