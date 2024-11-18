import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEarningsComponent } from './my-earnings.component';

describe('MyEarningsComponent', () => {
  let component: MyEarningsComponent;
  let fixture: ComponentFixture<MyEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEarningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
