import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsSectionComponent } from './credits-section.component';

describe('CreditsSectionComponent', () => {
  let component: CreditsSectionComponent;
  let fixture: ComponentFixture<CreditsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
