/* tslint:disable:no-unused-variable */
import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {NamespaceViewComponent} from "./view.namespace";
import {MomentModule} from "angular2-moment";
import {EntriesPipe} from "../../../../common/entries.pipe";
import {NamespaceDeleteDialog} from "../delete-dialog/delete-dialog.namespace";
import {ModalModule} from "ng2-modal";
import {FormsModule} from "@angular/forms";
import {KuberentesStoreModule} from "../../../kubernetes.store.module";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {RestangularModule} from "ng2-restangular";

describe('NamespaceViewComponent', () => {
  let namespace: NamespaceViewComponent;
  let fixture: ComponentFixture<NamespaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          FormsModule,
          MomentModule,
          ModalModule,
          KuberentesStoreModule,
          RestangularModule.forRoot(),
        ],
        declarations: [
          NamespaceViewComponent,
          NamespaceDeleteDialog,
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
      }
    )
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceViewComponent);
    namespace = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(namespace).toBeTruthy();
  });
});
