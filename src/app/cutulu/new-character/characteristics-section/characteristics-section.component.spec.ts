import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsSectionComponent } from './characteristics-section.component';

describe('CharacteristicsSectionComponent', () => {
  let component: CharacteristicsSectionComponent;
  let fixture: ComponentFixture<CharacteristicsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
