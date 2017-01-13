/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { FunctionEditPage } from './edit-pagefunction';
import { FunctionEditWrapperComponent } from '../view-wrapper/view-wrapper.function';
import { FunctionEditToolbarComponent } from '../view-toolbar/view-toolbar.function';
import { FunctionEditComponent } from '../view/view.function';
import { StoreModule } from '../../store/store.module';

describe('FunctionEditPage', () => {
  let fn: FunctionEditPage;
  let fixture: ComponentFixture<FunctionEditPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          FunctionEditPage,
          FunctionEditWrapperComponent,
          FunctionEditToolbarComponent,
          FunctionEditComponent,
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
    fixture = TestBed.createComponent(FunctionEditPage);
    fn = fixture.functionInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
