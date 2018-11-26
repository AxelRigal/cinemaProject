import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScenarioComponent } from './user-scenario.component';

describe('UserScenarioComponent', () => {
  let component: UserScenarioComponent;
  let fixture: ComponentFixture<UserScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
