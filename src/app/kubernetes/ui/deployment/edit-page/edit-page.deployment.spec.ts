/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {DeploymentEditPage} from "./edit-page.deployment";
import {DeploymentEditWrapperComponent} from "../edit-wrapper/edit-wrapper.deployment";
import {DeploymentEditToolbarComponent} from "../edit-toolbar/edit-toolbar.deployment";
import {DeploymentEditComponent} from "../edit/edit.deployment";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {FormsModule} from "@angular/forms";


describe('DeploymentEditPage', () => {
  let deployment: DeploymentEditPage;
  let fixture: ComponentFixture<DeploymentEditPage>;

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
          DeploymentEditPage,
          DeploymentEditWrapperComponent,
          DeploymentEditToolbarComponent,
          DeploymentEditComponent,
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
    fixture = TestBed.createComponent(DeploymentEditPage);
    deployment = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
