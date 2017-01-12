/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsCreatePage } from './create-page.function';

describe('FunctionsCreateComponent', () => {
  let component: FunctionsCreatePage;
  let fixture: ComponentFixture<FunctionsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionsCreatePage],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
