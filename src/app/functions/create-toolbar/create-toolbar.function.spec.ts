/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {FunctionCreateToolbarComponent} from './create-toolbar.function';

describe('FunctionCreateToolbarComponent', () => {
  let fn: FunctionCreateToolbarComponent;
  let fixture: ComponentFixture<FunctionCreateToolbarComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule.withRoutes([])],
          declarations: [FunctionCreateToolbarComponent],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionCreateToolbarComponent);
    fn = fixture.functionInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(fn).toBeTruthy(); });
});
