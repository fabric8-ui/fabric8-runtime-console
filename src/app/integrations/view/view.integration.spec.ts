/* tslint:disable:no-unused-variable */
import {async, IntegrationFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {IntegrationViewComponent} from './view.integration';

describe('IntegrationViewComponent', () => {
  let fn: IntegrationViewComponent;
  let fixture: IntegrationFixture<IntegrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [IntegrationViewComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationViewComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
