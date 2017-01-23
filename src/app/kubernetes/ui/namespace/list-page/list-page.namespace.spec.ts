/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {NamespacesListPage} from "./list-page.namespace";
import {NamespacesListComponent} from "../list/list.namespace";
import {NamespacesListToolbarComponent} from "../list-toolbar/list-toolbar.namespace";
import {IPaaSCommonModule} from "../../../../common/common.module";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {MomentModule} from "angular2-moment";
import {NamespaceDeleteDialog} from "../delete-dialog/delete-dialog.namespace";
import {FormsModule} from "@angular/forms";

describe('NamespacesListPage', () => {
  let component: NamespacesListPage;
  let fixture: ComponentFixture<NamespacesListPage>;

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
        NamespacesListPage,
        NamespacesListComponent,
        NamespacesListToolbarComponent,
        NamespaceDeleteDialog,
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
    fixture = TestBed.createComponent(NamespacesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
