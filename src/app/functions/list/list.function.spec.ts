/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {IPaaSCommonModule} from "../../common/common.module";
import {FunctionsListComponent} from "./list.function";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {FunctionDeleteDialog} from "../delete-dialog/delete-dialog.function";
import {ModalModule} from "ng2-modal";
import {StoreModule} from "../../store/store.module";
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {MockBackend} from "@angular/http/testing";

describe('FunctionsListComponent', () => {
  let component: FunctionsListComponent;
  let fixture: ComponentFixture<FunctionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IPaaSCommonModule,
        FormsModule,
        ModalModule,
        StoreModule,
        KuberentesStoreModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
      ],
      declarations: [
        FunctionsListComponent,
        FunctionDeleteDialog,
      ],
      providers: [
        MockBackend,
        { provide: RequestOptions, useClass: BaseRequestOptions },
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          }, deps: [MockBackend, RequestOptions],
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
