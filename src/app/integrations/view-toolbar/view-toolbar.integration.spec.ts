/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {IntegrationViewToolbarComponent} from './view-toolbar.integration';

describe('IntegrationViewToolbarComponent', () => {
  let fn: IntegrationViewToolbarComponent;
  let fixture: ComponentFixture<IntegrationViewToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [IntegrationViewToolbarComponent],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationViewToolbarComponent);
    fn = fixture.integrationInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
