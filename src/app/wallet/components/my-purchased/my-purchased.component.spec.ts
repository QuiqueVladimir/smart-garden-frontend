import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPurchasedComponent } from './my-purchased.component';

describe('MyPurchasedComponent', () => {
  let component: MyPurchasedComponent;
  let fixture: ComponentFixture<MyPurchasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPurchasedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
