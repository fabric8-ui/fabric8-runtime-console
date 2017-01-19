/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { DeploymentEditWrapperComponent } from './edit-wrapper.deployment';
import { DeploymentEditToolbarComponent } from '../edit-toolbar/edit-toolbar.deployment';
import { DeploymentEditComponent } from '../edit/edit.deployment';
import { StoreModule } from '../../store/store.module';

describe('DeploymentEditWrapperComponent', () => {
  let deployment: DeploymentEditWrapperComponent;
  let fixture: ComponentFixture<DeploymentEditWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          DeploymentEditWrapperComponent,
          DeploymentEditToolbarComponent,
          DeploymentEditComponent,
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
    fixture = TestBed.createComponent(DeploymentEditWrapperComponent);
    deployment = fixture.deploymentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
