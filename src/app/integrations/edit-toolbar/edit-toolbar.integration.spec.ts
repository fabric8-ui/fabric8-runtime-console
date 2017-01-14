/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {IntegrationEditToolbarComponent} from './edit-toolbar.integration';

describe('IntegrationEditToolbarComponent', () => {
  let fn: IntegrationEditToolbarComponent;
  let fixture: ComponentFixture<IntegrationEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [IntegrationEditToolbarComponent],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationEditToolbarComponent);
    fn = fixture.integrationInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
