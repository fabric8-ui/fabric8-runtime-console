/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {RequestOptions, BaseRequestOptions, Http} from "@angular/http";
import {RestangularModule} from "ng2-restangular";
import {PipelinesHistoryPage} from "./history-page.pipeline.component";
import {PipelinesHistoryComponent} from "../history/history.pipeline.component";
import {PipelinesHistoryToolbarComponent} from "../history-toolbar/history-toolbar.pipeline.component";
import {Fabric8CommonModule} from "../../../../common/common.module";
import {KubernetesStoreModule} from "../../../kubernetes.store.module";
import {ModalModule} from "ng2-modal";
import {MomentModule} from "angular2-moment";
import {FormsModule} from "@angular/forms";
import {BuildConfigDialogsModule} from "../../buildconfig/delete-dialog/buildconfig.dialogs.module";
import {KubernetesComponentsModule} from "../../../components/components.module";
import {BuildStageViewComponent} from "../build-stage-view/build-stage-view.component";

describe('PipelinesHistoryPage', () => {
  let component: PipelinesHistoryPage;
  let fixture: ComponentFixture<PipelinesHistoryPage>;

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
        KubernetesComponentsModule,
        BuildConfigDialogsModule,
      ],
      declarations: [
        BuildStageViewComponent,
        PipelinesHistoryPage,
        PipelinesHistoryComponent,
        PipelinesHistoryToolbarComponent,
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
    fixture = TestBed.createComponent(PipelinesHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});