/* tslint:disable:no-unused-variable */
import {async, FunctionFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FunctionViewComponent} from './view.function';

describe('FunctionViewComponent', () => {
  let fn: FunctionViewComponent;
  let fixture: FunctionFixture<FunctionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FunctionViewComponent]})
        .compileFunctions();
  }));

  beforeEach(() => {
    fixture = TestBed.createFunction(FunctionViewComponent);
    fn = fixture.fnInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
