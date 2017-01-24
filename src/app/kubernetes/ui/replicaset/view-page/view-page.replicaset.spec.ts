/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {ReplicaSetViewPage} from "./view-page.replicaset";
import {ReplicaSetViewWrapperComponent} from "../view-wrapper/view-wrapper.replicaset";
import {ReplicaSetViewToolbarComponent} from "../view-toolbar/view-toolbar.replicaset";
import {ReplicaSetViewComponent} from "../view/view.replicaset";
import {MomentModule} from "angular2-moment";
import {ReplicaSetScaleDialog} from "../scale-dialog/scale-dialog.replicaset";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('ReplicaSetViewPage', () => {
  let replicaset: ReplicaSetViewPage;
  let fixture: ComponentFixture<ReplicaSetViewPage>;

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
          ReplicaSetViewPage,
          ReplicaSetViewWrapperComponent,
          ReplicaSetViewToolbarComponent,
          ReplicaSetViewComponent,
          ReplicaSetScaleDialog,
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
    fixture = TestBed.createComponent(ReplicaSetViewPage);
    replicaset = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(replicaset).toBeTruthy(); });
});
