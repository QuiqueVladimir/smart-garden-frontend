import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityEditDialogComponent } from './community-edit-dialog.component';

describe('CommunityEditDialogComponent', () => {
  let component: CommunityEditDialogComponent;
  let fixture: ComponentFixture<CommunityEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
