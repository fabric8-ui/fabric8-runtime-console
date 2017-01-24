/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {PodEditPage} from "./edit-page.pod";
import {PodEditWrapperComponent} from "../edit-wrapper/edit-wrapper.pod";
import {PodEditToolbarComponent} from "../edit-toolbar/edit-toolbar.pod";
import {PodEditComponent} from "../edit/edit.pod";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {FormsModule} from "@angular/forms";


describe('PodEditPage', () => {
  let pod: PodEditPage;
  let fixture: ComponentFixture<PodEditPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
          FormsModule,
          KuberentesStoreModule,
        ],
        declarations: [
          PodEditPage,
          PodEditWrapperComponent,
          PodEditToolbarComponent,
          PodEditComponent,
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
    fixture = TestBed.createComponent(PodEditPage);
    pod = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(pod).toBeTruthy(); });
});
