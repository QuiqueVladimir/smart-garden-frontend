import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSubscriptionPageComponent } from './management-subscription-page.component';

describe('ManagementSubscriptionPageComponent', () => {
  let component: ManagementSubscriptionPageComponent;
  let fixture: ComponentFixture<ManagementSubscriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementSubscriptionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementSubscriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
