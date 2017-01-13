/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { IntegrationViewWrapperComponent } from './view-wrapper.integration';
import { IntegrationViewToolbarComponent } from '../view-toolbar/view-toolbar.integration';
import { IntegrationViewComponent } from '../view/view.integration';
import { StoreModule } from '../../store/store.module';

describe('IntegrationViewWrapperComponent', () => {
  let fn: IntegrationViewWrapperComponent;
  let fixture: ComponentFixture<IntegrationViewWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
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
    fixture = TestBed.createComponent(IntegrationViewWrapperComponent);
    fn = fixture.integrationInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
