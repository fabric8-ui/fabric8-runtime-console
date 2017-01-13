/* tslint:disable:no-unused-variable */
import {async, FunctionFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FunctionEditComponent} from './edit.function';

describe('FunctionEditComponent', () => {
  let fn: FunctionEditComponent;
  let fixture: FunctionFixture<FunctionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FunctionEditComponent]})
        .compileFunctions();
  }));

  beforeEach(() => {
    fixture = TestBed.createFunction(FunctionEditComponent);
    fn = fixture.fnInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
