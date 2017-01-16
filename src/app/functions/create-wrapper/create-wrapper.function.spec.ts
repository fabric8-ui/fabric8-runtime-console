/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { FunctionCreateWrapperComponent } from './create-wrapper.function';
import { FunctionCreateToolbarComponent } from '../create-toolbar/create-toolbar.function';
import { FunctionCreateComponent } from '../create/create.function';
import { StoreModule } from '../../store/store.module';

describe('FunctionCreateWrapperComponent', () => {
  let fn: FunctionCreateWrapperComponent;
  let fixture: ComponentFixture<FunctionCreateWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          FunctionCreateWrapperComponent,
          FunctionCreateToolbarComponent,
          FunctionCreateComponent,
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
    fixture = TestBed.createComponent(FunctionCreateWrapperComponent);
    fn = fixture.functionInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
