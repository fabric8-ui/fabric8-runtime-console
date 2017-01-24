/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {BuildConfigViewPage} from "./view-page.buildconfig";
import {BuildConfigViewWrapperComponent} from "../view-wrapper/view-wrapper.buildconfig";
import {BuildConfigViewToolbarComponent} from "../view-toolbar/view-toolbar.buildconfig";
import {BuildConfigViewComponent} from "../view/view.buildconfig";
import {MomentModule} from "angular2-moment";
import {BuildConfigScaleDialog} from "../scale-dialog/scale-dialog.buildconfig";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('BuildConfigViewPage', () => {
  let buildconfig: BuildConfigViewPage;
  let fixture: ComponentFixture<BuildConfigViewPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          IPaaSCommonModule,
          FormsModule,
          MomentModule,
          ModalModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
          KuberentesStoreModule,
        ],
        declarations: [
          BuildConfigViewPage,
          BuildConfigViewWrapperComponent,
          BuildConfigViewToolbarComponent,
          BuildConfigViewComponent,
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
    fixture = TestBed.createComponent(BuildConfigViewPage);
    buildconfig = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(buildconfig).toBeTruthy(); });
});
