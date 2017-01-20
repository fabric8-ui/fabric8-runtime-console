/* tslint:disable:no-unused-variable */
import {async, FunctionFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FunctionEditComponent} from './edit.function';
import {FormsModule} from "@angular/forms";

describe('FunctionEditComponent', () => {
  let fn: FunctionEditComponent;
  let fixture: FunctionFixture<FunctionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
      FunctionEditComponent,
    ]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionEditComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
