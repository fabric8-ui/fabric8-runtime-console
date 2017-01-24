/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {PodsListPage} from "./list-page.pod";
import {PodsListComponent} from "../list/list.pod";
import {PodsListToolbarComponent} from "../list-toolbar/list-toolbar.pod";
import {IPaaSCommonModule} from "../../../../common/common.module";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {MomentModule} from "angular2-moment";
import {PodDeleteDialog} from "../delete-dialog/delete-dialog.pod";
import {PodScaleDialog} from "../scale-dialog/scale-dialog.pod";
import {FormsModule} from "@angular/forms";

describe('PodsListPage', () => {
  let component: PodsListPage;
  let fixture: ComponentFixture<PodsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IPaaSCommonModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
        FormsModule,
        MomentModule,
        ModalModule,
        KuberentesStoreModule,
      ],
      declarations: [
        PodsListPage,
        PodsListComponent,
        PodsListToolbarComponent,
        PodDeleteDialog,
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
    fixture = TestBed.createComponent(PodsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
