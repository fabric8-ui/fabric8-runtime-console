/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FunctionEditToolbarComponent} from "./edit-toolbar.function";
import {StoreModule} from "../../store/store.module";
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {MockBackend} from "@angular/http/testing";

describe('FunctionEditToolbarComponent', () => {
  let fn: FunctionEditToolbarComponent;
  let fixture: ComponentFixture<FunctionEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [
            StoreModule,
            KuberentesStoreModule,
            RouterTestingModule.withRoutes([]),
            RestangularModule.forRoot(),
          ],
          declarations: [FunctionEditToolbarComponent],
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
    fixture = TestBed.createComponent(FunctionEditToolbarComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
