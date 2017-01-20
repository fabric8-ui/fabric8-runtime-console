/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { IntegrationViewPage } from './view-page.integration';
import { IntegrationViewWrapperComponent } from '../view-wrapper/view-wrapper.integration';
import { IntegrationViewToolbarComponent } from '../view-toolbar/view-toolbar.integration';
import { IntegrationViewComponent } from '../view/view.integration';
import { StoreModule } from '../../store/store.module';
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";

describe('IntegrationViewPage', () => {
  let fn: IntegrationViewPage;
  let fixture: ComponentFixture<IntegrationViewPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          KuberentesStoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          IntegrationViewPage,
          IntegrationViewWrapperComponent,
          IntegrationViewToolbarComponent,
          IntegrationViewComponent,
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
    fixture = TestBed.createComponent(IntegrationViewPage);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
