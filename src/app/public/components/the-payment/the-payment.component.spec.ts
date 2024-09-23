import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThePaymentComponent } from './the-payment.component';

describe('ThePaymentComponent', () => {
  let component: ThePaymentComponent;
  let fixture: ComponentFixture<ThePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
