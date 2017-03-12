/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {NamespaceEditPage} from "./edit-page.namespace.component";
import {NamespaceEditWrapperComponent} from "../edit-wrapper/edit-wrapper.namespace";
import {NamespaceEditToolbarComponent} from "../edit-toolbar/edit-toolbar.namespace";
import {NamespaceEditComponent} from "../edit/edit.namespace";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {FormsModule} from "@angular/forms";


describe('NamespaceEditPage', () => {
  let namespace: NamespaceEditPage;
  let fixture: ComponentFixture<NamespaceEditPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
          FormsModule,
          KubernetesStoreModule,
        ],
        declarations: [
          NamespaceEditPage,
          NamespaceEditWrapperComponent,
          NamespaceEditToolbarComponent,
          NamespaceEditComponent,
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
    fixture = TestBed.createComponent(NamespaceEditPage);
    namespace = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(namespace).toBeTruthy(); });
});
