/* tslint:disable:no-unused-variable */
import {async, IntegrationFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {IntegrationEditComponent} from './edit.integration';
import {FormsModule} from "@angular/forms";

describe('IntegrationEditComponent', () => {
  let fn: IntegrationEditComponent;
  let fixture: IntegrationFixture<IntegrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        IntegrationEditComponent,
      ]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationEditComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
