/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {NamespacesListComponent} from "./list.namespace";
import {IPaaSCommonModule} from "../../../../common/common.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MomentModule} from "angular2-moment";
import {EntriesPipe} from "../../../../common/entries.pipe";
import {NamespaceDeleteDialog} from "../delete-dialog/delete-dialog.namespace";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {NamespaceScaleDialog} from "../scale-dialog/scale-dialog.namespace";
import {FormsModule} from "@angular/forms";

import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {MockBackend} from "@angular/http/testing";

describe('NamespacesListComponent', () => {
  let component: NamespacesListComponent;
  let fixture: ComponentFixture<NamespacesListComponent>;

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
        NamespacesListComponent,
        NamespaceDeleteDialog,
        NamespaceScaleDialog,
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
    fixture = TestBed.createComponent(NamespacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
