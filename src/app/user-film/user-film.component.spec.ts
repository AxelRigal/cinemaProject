import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFilmComponent } from './user-film.component';

describe('UserFilmComponent', () => {
  let component: UserFilmComponent;
  let fixture: ComponentFixture<UserFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
