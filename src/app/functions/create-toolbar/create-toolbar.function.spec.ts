/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FunctionCreateToolbarComponent} from "./create-toolbar.function";
import {StoreModule} from "../../store/store.module";
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";
import {RestangularModule} from "ng2-restangular";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";

describe('FunctionCreateToolbarComponent', () => {
  let fn: FunctionCreateToolbarComponent;
  let fixture: ComponentFixture<FunctionCreateToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [
            StoreModule,
            KuberentesStoreModule,
            RouterTestingModule.withRoutes([]),
            RestangularModule.forRoot(),
          ],
          declarations: [FunctionCreateToolbarComponent],
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
    fixture = TestBed.createComponent(FunctionCreateToolbarComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
