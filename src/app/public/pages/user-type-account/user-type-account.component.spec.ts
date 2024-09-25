import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeAccountComponent } from './user-type-account.component';

describe('UserTypeAccountComponent', () => {
  let component: UserTypeAccountComponent;
  let fixture: ComponentFixture<UserTypeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
