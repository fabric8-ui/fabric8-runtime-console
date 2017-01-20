/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { StoreModule } from '../../store/store.module';
import {FunctionCreatePage} from "./create-page.function";
import {FunctionCreateWrapperComponent} from "../create-wrapper/create-wrapper.function";
import {FunctionCreateToolbarComponent} from "../create-toolbar/create-toolbar.function";
import {FunctionCreateComponent} from "../create/create.function";
import {KubernetesRestangularModule} from "../../kubernetes/service/kubernetes.restangular";
import {FormsModule} from "@angular/forms";

describe('FunctionCreatePage', () => {
  let fn: FunctionCreatePage;
  let fixture: ComponentFixture<FunctionCreatePage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          FormsModule,
          StoreModule,
          KubernetesRestangularModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          FunctionCreatePage,
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
    fixture = TestBed.createComponent(FunctionCreatePage);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
