/* tslint:disable:no-unused-variable */
import {async, DeploymentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {DeploymentEditComponent} from './edit.deployment';

describe('DeploymentEditComponent', () => {
  let deployment: DeploymentEditComponent;
  let fixture: DeploymentFixture<DeploymentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [DeploymentEditComponent]})
        .compileDeployments();
  }));

  beforeEach(() => {
    fixture = TestBed.createDeployment(DeploymentEditComponent);
    deployment = fixture.deploymentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
