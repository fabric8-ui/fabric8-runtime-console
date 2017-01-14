/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { IntegrationEditWrapperComponent } from './edit-wrapper.integration';
import { IntegrationEditToolbarComponent } from '../edit-toolbar/edit-toolbar.integration';
import { IntegrationEditComponent } from '../view/view.integration';
import { StoreModule } from '../../store/store.module';

describe('IntegrationEditWrapperComponent', () => {
  let fn: IntegrationEditWrapperComponent;
  let fixture: ComponentFixture<IntegrationEditWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          IntegrationEditWrapperComponent,
          IntegrationEditToolbarComponent,
          IntegrationEditComponent,
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
    fixture = TestBed.createComponent(IntegrationEditWrapperComponent);
    fn = fixture.integrationInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
