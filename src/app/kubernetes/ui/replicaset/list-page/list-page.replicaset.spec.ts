/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {ReplicaSetsListPage} from "./list-page.replicaset";
import {ReplicaSetsListComponent} from "../list/list.replicaset";
import {ReplicaSetsListToolbarComponent} from "../list-toolbar/list-toolbar.replicaset";
import {IPaaSCommonModule} from "../../../../common/common.module";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {MomentModule} from "angular2-moment";
import {ReplicaSetDeleteDialog} from "../delete-dialog/delete-dialog.replicaset";
import {ReplicaSetScaleDialog} from "../scale-dialog/scale-dialog.replicaset";
import {FormsModule} from "@angular/forms";

describe('ReplicaSetsListPage', () => {
  let component: ReplicaSetsListPage;
  let fixture: ComponentFixture<ReplicaSetsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IPaaSCommonModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
        FormsModule,
        MomentModule,
        ModalModule,
        KubernetesStoreModule,
      ],
      declarations: [
        ReplicaSetsListPage,
        ReplicaSetsListComponent,
        ReplicaSetsListToolbarComponent,
        ReplicaSetDeleteDialog,
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
    fixture = TestBed.createComponent(ReplicaSetsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
