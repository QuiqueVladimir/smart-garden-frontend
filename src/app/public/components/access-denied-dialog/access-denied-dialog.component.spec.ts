import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedDialogComponent } from './access-denied-dialog.component';

describe('AccessDeniedDialogComponent', () => {
  let component: AccessDeniedDialogComponent;
  let fixture: ComponentFixture<AccessDeniedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessDeniedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessDeniedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
