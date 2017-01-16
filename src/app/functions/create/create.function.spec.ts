/* tslint:disable:no-unused-variable */
import {async, FunctionFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FunctionCreateComponent} from './create.function';

describe('FunctionCreateComponent', () => {
  let fn: FunctionCreateComponent;
  let fixture: FunctionFixture<FunctionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FunctionCreateComponent]})
        .compileFunctions();
  }));

  beforeEach(() => {
    fixture = TestBed.createFunction(FunctionCreateComponent);
    fn = fixture.fnInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
