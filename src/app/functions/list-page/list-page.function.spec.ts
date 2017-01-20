/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { IPaaSCommonModule } from '../../common/common.module';
import { FunctionsListPage } from './list-page.function';
import { FunctionsListComponent } from '../list/list.function';
import { FunctionsListToolbarComponent } from '../list-toolbar/list-toolbar.function';
import { StoreModule } from '../../store/store.module';
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";
import {FunctionDeleteDialog} from "../delete-dialog/delete-dialog.function";
import {ModalModule} from "ng2-modal";

describe('FunctionsListPage', () => {
  let component: FunctionsListPage;
  let fixture: ComponentFixture<FunctionsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IPaaSCommonModule,
        StoreModule,
        KuberentesStoreModule,
        ModalModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot()],
      declarations: [
        FunctionsListPage,
        FunctionsListComponent,
        FunctionsListToolbarComponent,
        FunctionDeleteDialog,
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
    fixture = TestBed.createComponent(FunctionsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
