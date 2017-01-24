/* tslint:disable:no-unused-variable */
import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {EventViewComponent} from "./view.event";
import {MomentModule} from "angular2-moment";
import {EventScaleDialog} from "../scale-dialog/scale-dialog.event";
import {EventDeleteDialog} from "../delete-dialog/delete-dialog.event";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {RestangularModule} from "ng2-restangular";
import {RouterTestingModule} from "@angular/router/testing";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('EventViewComponent', () => {
  let event: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          IPaaSCommonModule,
          FormsModule,
          MomentModule,
          ModalModule,
          RestangularModule.forRoot(),
          KuberentesStoreModule,
        ],
        declarations: [
          EventViewComponent,
          EventDeleteDialog,
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
      },
    )
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    event = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(event).toBeTruthy();
  });
});
