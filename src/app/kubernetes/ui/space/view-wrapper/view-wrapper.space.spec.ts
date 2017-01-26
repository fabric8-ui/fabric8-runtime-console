/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {SpaceViewWrapperComponent} from "./view-wrapper.space";
import {SpaceViewToolbarComponent} from "../view-toolbar/view-toolbar.space";
import {SpaceViewComponent} from "../view/view.space";
import {MomentModule} from "angular2-moment";
import {SpaceDeleteDialog} from "../delete-dialog/delete-dialog.space";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('SpaceViewWrapperComponent', () => {
  let space: SpaceViewWrapperComponent;
  let fixture: ComponentFixture<SpaceViewWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          IPaaSCommonModule,
          FormsModule,
          MomentModule,
          ModalModule,
          RestangularModule.forRoot(),
          KubernetesStoreModule,
        ],
        declarations: [
          SpaceViewWrapperComponent,
          SpaceViewToolbarComponent,
          SpaceViewComponent,
          SpaceDeleteDialog,
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
    fixture = TestBed.createComponent(SpaceViewWrapperComponent);
    space = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(space).toBeTruthy(); });
});