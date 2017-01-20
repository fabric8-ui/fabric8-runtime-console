/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {StoreModule} from "../../store/store.module";
import {FunctionEditPage} from "./edit-page.function";
import {FunctionEditToolbarComponent} from "../edit-toolbar/edit-toolbar.function";
import {FunctionEditWrapperComponent} from "../edit-wrapper/edit-wrapper.function";
import {FunctionEditComponent} from "../edit/edit.function";
import {FormsModule} from "@angular/forms";
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";

describe('FunctionEditPage', () => {
  let fn: FunctionEditPage;
  let fixture: ComponentFixture<FunctionEditPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          FormsModule,
          StoreModule,
          KuberentesStoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          FunctionEditPage,
          FunctionEditWrapperComponent,
          FunctionEditToolbarComponent,
          FunctionEditComponent,
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
    fixture = TestBed.createComponent(FunctionEditPage);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
