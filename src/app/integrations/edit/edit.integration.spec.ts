/* tslint:disable:no-unused-variable */
import {async, IntegrationFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {IntegrationEditComponent} from './edit.integration';

describe('IntegrationEditComponent', () => {
  let fn: IntegrationEditComponent;
  let fixture: IntegrationFixture<IntegrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [IntegrationEditComponent]})
        .compileIntegrations();
  }));

  beforeEach(() => {
    fixture = TestBed.createIntegration(IntegrationEditComponent);
    fn = fixture.fnInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
