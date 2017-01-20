/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {DeploymentsListComponent} from "./list.deployment";
import {IPaaSCommonModule} from "../../../../common/common.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MomentModule} from "angular2-moment";
import {EntriesPipe} from "../../../../common/entries.pipe";
import {DeploymentDeleteDialog} from "../delete-dialog/delete-dialog.deployment";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {DeploymentScaleDialog} from "../scale-dialog/scale-dialog.deployment";
import {FormsModule} from "@angular/forms";

import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {MockBackend} from "@angular/http/testing";

describe('DeploymentsListComponent', () => {
  let component: DeploymentsListComponent;
  let fixture: ComponentFixture<DeploymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IPaaSCommonModule,
        FormsModule,
        MomentModule,
        ModalModule,

        KuberentesStoreModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
      ],
      declarations: [
        DeploymentsListComponent,
        DeploymentDeleteDialog,
        DeploymentScaleDialog,
        EntriesPipe,
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
    fixture = TestBed.createComponent(DeploymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
