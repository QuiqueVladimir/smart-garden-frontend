import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationInputComponent } from './publication-input.component';

describe('PublicationInputComponent', () => {
  let component: PublicationInputComponent;
  let fixture: ComponentFixture<PublicationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
