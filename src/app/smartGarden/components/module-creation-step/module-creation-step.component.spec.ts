import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCreationStepComponent } from './module-creation-step.component';

describe('ModuleCreationStepComponent', () => {
  let component: ModuleCreationStepComponent;
  let fixture: ComponentFixture<ModuleCreationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleCreationStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleCreationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
