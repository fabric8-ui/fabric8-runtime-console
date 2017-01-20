/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {FunctionViewToolbarComponent} from './view-toolbar.function';

describe('FunctionViewToolbarComponent', () => {
  let fn: FunctionViewToolbarComponent;
  let fixture: ComponentFixture<FunctionViewToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [FunctionViewToolbarComponent],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionViewToolbarComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
