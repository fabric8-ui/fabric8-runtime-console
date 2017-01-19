/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {DeploymentEditToolbarComponent} from './edit-toolbar.deployment';

describe('DeploymentEditToolbarComponent', () => {
  let deployment: DeploymentEditToolbarComponent;
  let fixture: ComponentFixture<DeploymentEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [DeploymentEditToolbarComponent],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentEditToolbarComponent);
    deployment = fixture.deploymentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
