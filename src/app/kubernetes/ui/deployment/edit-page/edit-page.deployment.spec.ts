/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';

import { DeploymentEditPage } from './edit-pagedeployment';
import { DeploymentEditWrapperComponent } from '../view-wrapper/view-wrapper.deployment';
import { DeploymentEditToolbarComponent } from '../view-toolbar/view-toolbar.deployment';
import { DeploymentEditComponent } from '../view/view.deployment';
import { StoreModule } from '../../store/store.module';

describe('DeploymentEditPage', () => {
  let deployment: DeploymentEditPage;
  let fixture: ComponentFixture<DeploymentEditPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          StoreModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
        ],
        declarations: [
          DeploymentEditPage,
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
    fixture = TestBed.createComponent(DeploymentEditPage);
    deployment = fixture.deploymentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
