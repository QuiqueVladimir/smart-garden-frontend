import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLearnersComponent } from './navbar-learners.component';

describe('NavbarLearnersComponent', () => {
  let component: NavbarLearnersComponent;
  let fixture: ComponentFixture<NavbarLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLearnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
