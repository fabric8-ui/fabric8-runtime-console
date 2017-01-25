/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BuildsListToolbarComponent} from "./list-toolbar.build";
import {IPaaSCommonModule} from "../../../../common/common.module";

describe('BuildsListToolbarComponent', () => {
  let component: BuildsListToolbarComponent;
  let fixture: ComponentFixture<BuildsListToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        IPaaSCommonModule,
      ],
      declarations: [BuildsListToolbarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildsListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
