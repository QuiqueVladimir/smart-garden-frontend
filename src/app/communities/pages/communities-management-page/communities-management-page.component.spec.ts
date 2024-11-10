import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesManagementPageComponent } from './communities-management-page.component';

describe('CommunitiesManagementPageComponent', () => {
  let component: CommunitiesManagementPageComponent;
  let fixture: ComponentFixture<CommunitiesManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunitiesManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitiesManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
