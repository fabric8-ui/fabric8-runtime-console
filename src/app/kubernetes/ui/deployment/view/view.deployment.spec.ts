/* tslint:disable:no-unused-variable */
import {async, DeploymentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {DeploymentViewComponent} from './view.deployment';

describe('DeploymentViewComponent', () => {
  let deployment: DeploymentViewComponent;
  let fixture: DeploymentFixture<DeploymentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [DeploymentViewComponent]})
        .compileDeployments();
  }));

  beforeEach(() => {
    fixture = TestBed.createDeployment(DeploymentViewComponent);
    deployment = fixture.deploymentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(deployment).toBeTruthy(); });
});
