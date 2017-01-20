/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { FunctionViewWrapperComponent } from './view-wrapper.function';
import { FunctionViewToolbarComponent } from '../view-toolbar/view-toolbar.function';
import { FunctionViewComponent } from '../view/view.function';
import { StoreModule } from '../../store/store.module';
import {KuberentesStoreModule} from "../../kubernetes/kubernetes.store.module";

describe('FunctionViewWrapperComponent', () => {
  let fn: FunctionViewWrapperComponent;
  let fixture: ComponentFixture<FunctionViewWrapperComponent>;

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
          FunctionViewWrapperComponent,
          FunctionViewToolbarComponent,
          FunctionViewComponent,
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
    fixture = TestBed.createComponent(FunctionViewWrapperComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
