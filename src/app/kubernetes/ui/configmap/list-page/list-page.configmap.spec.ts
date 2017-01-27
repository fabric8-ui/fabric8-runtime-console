/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {ConfigMapsListPage} from "./list-page.configmap";
import {ConfigMapsListComponent} from "../list/list.configmap";
import {ConfigMapsListToolbarComponent} from "../list-toolbar/list-toolbar.configmap";
import {Fabric8CommonModule} from "../../../../common/common.module";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {MomentModule} from "angular2-moment";
import {ConfigMapDeleteDialog} from "../delete-dialog/delete-dialog.configmap";
import {ConfigMapScaleDialog} from "../scale-dialog/scale-dialog.configmap";
import {FormsModule} from "@angular/forms";

describe('ConfigMapsListPage', () => {
  let component: ConfigMapsListPage;
  let fixture: ComponentFixture<ConfigMapsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Fabric8CommonModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
        FormsModule,
        MomentModule,
        ModalModule,
        KubernetesStoreModule,
      ],
      declarations: [
        ConfigMapsListPage,
        ConfigMapsListComponent,
        ConfigMapsListToolbarComponent,
        ConfigMapDeleteDialog,
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
    fixture = TestBed.createComponent(ConfigMapsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
