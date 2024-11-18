import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleContentViewPageComponent } from './module-content-view-page.component';

describe('ModuleContentViewPageComponent', () => {
  let component: ModuleContentViewPageComponent;
  let fixture: ComponentFixture<ModuleContentViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleContentViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleContentViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
