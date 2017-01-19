/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IPaaSCommonModule } from '../../common/common.module';
import { DeploymentsListComponent } from './list.deployment';

describe('DeploymentsListComponent', () => {
  let component: DeploymentsListComponent;
  let fixture: ComponentFixture<DeploymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IPaaSCommonModule],
      declarations: [DeploymentsListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
