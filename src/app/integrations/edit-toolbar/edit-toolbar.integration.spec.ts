/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {IntegrationEditToolbarComponent} from "./edit-toolbar.integration";
import {StoreModule} from "../../store/store.module";
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";
import {RestangularModule} from "ng2-restangular";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, RequestOptions, Http} from "@angular/http";

describe('IntegrationEditToolbarComponent', () => {
  let fn: IntegrationEditToolbarComponent;
  let fixture: ComponentFixture<IntegrationEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [
            StoreModule,
            KuberentesStoreModule,
            RouterTestingModule.withRoutes([]),
            RestangularModule.forRoot(),
          ],
          declarations: [IntegrationEditToolbarComponent],
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
    fixture = TestBed.createComponent(IntegrationEditToolbarComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
