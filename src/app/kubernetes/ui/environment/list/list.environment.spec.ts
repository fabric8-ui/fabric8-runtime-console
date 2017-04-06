import { EnvironmentListToolbarComponent } from './../list-toolbar/list-toolbar.environment.component';
import { EnvironmentDetailComponent } from './../detail/detail.environment.component';
import { EnvironmentListPageComponent } from './../list-page/list-page.environment.component';
import { ServiceModule } from './../../service/service.module';
import { ReplicaSetModule } from './../../replicaset/replicaset.module';
import { PodModule } from './../../pod/pod.module';
import { EventModule } from './../../event/event.module';
import { ConfigMapModule } from './../../configmap/configmap.module';
import { DeploymentModule } from './../../deployment/deployment.module';
import { EnvironmentRoutingModule } from './../environment-routing.module';
import { TreeModule } from 'angular-tree-component';
import { TreeListModule, SlideOutPanelModule } from 'ngx-widgets';
import { TestAppModule } from './../../../../app.test.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { EnvironmentListComponent } from "./list.environment.component";
import { Fabric8CommonModule } from "../../../../common/common.module";
import { RouterTestingModule } from "@angular/router/testing";
import { MomentModule } from "angular2-moment";
import { KubernetesStoreModule } from "../../../kubernetes.store.module";
import { ModalModule } from "ng2-modal";
import { FormsModule } from "@angular/forms";
import { RequestOptions, BaseRequestOptions, Http } from "@angular/http";
import { RestangularModule } from "ng2-restangular";
import { MockBackend } from "@angular/http/testing";
import { KubernetesComponentsModule } from "../../../components/components.module";

describe('EnvironmentListComponent', () => {
  let component: EnvironmentListComponent;
  let fixture: ComponentFixture<EnvironmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Fabric8CommonModule,
        FormsModule,
        MomentModule,
        ModalModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
        KubernetesStoreModule,
        KubernetesComponentsModule,
        TestAppModule,
        TreeListModule,
        TreeModule,
        EnvironmentRoutingModule,
        DeploymentModule,
        ConfigMapModule,
        EventModule,
        PodModule,
        ReplicaSetModule,
        ServiceModule,
        SlideOutPanelModule,
      ],
      declarations: [
        EnvironmentListComponent,
        EnvironmentListPageComponent,
        EnvironmentDetailComponent,
        EnvironmentListToolbarComponent,
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
    fixture = TestBed.createComponent(EnvironmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
