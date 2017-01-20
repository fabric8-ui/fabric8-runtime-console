/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {IntegrationEditComponent} from "../edit/edit.integration";
import {IntegrationEditPage} from "./edit-page.integration";
import {IntegrationEditWrapperComponent} from "../edit-wrapper/edit-wrapper.integration";
import {IntegrationEditToolbarComponent} from "../edit-toolbar/edit-toolbar.integration";
import {StoreModule} from "../../store/store.module";
import {FormsModule} from "@angular/forms";
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";

describe('IntegrationEditPage', () => {
  let component: IntegrationEditPage;
  let fixture: ComponentFixture<IntegrationEditPage>;

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
          IntegrationEditPage,
          IntegrationEditWrapperComponent,
          IntegrationEditToolbarComponent,
          IntegrationEditComponent,
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
    fixture = TestBed.createComponent(IntegrationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
