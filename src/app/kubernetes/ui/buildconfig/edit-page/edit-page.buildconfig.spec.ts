/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {BuildConfigEditPage} from "./edit-page.buildconfig";
import {BuildConfigEditWrapperComponent} from "../edit-wrapper/edit-wrapper.buildconfig";
import {BuildConfigEditToolbarComponent} from "../edit-toolbar/edit-toolbar.buildconfig";
import {BuildConfigEditComponent} from "../edit/edit.buildconfig";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {FormsModule} from "@angular/forms";


describe('BuildConfigEditPage', () => {
  let buildconfig: BuildConfigEditPage;
  let fixture: ComponentFixture<BuildConfigEditPage>;

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
          BuildConfigEditPage,
          BuildConfigEditWrapperComponent,
          BuildConfigEditToolbarComponent,
          BuildConfigEditComponent,
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
    fixture = TestBed.createComponent(BuildConfigEditPage);
    buildconfig = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(buildconfig).toBeTruthy(); });
});
