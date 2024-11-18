import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCreateDialogComponent } from './community-create-dialog.component';

describe('CommunityCreateDialogComponent', () => {
  let component: CommunityCreateDialogComponent;
  let fixture: ComponentFixture<CommunityCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
