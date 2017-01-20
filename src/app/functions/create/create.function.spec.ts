/* tslint:disable:no-unused-variable */
import {async, FunctionFixture, TestBed} from "@angular/core/testing";
import {FunctionCreateComponent} from "./create.function";
import {FormsModule} from "@angular/forms";

describe('FunctionCreateComponent', () => {
  let fn: FunctionCreateComponent;
  let fixture: FunctionFixture<FunctionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        FunctionCreateComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionCreateComponent);
    fn = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fn).toBeTruthy();
  });
});
