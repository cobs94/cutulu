import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticsCalculatorComponent } from './stadistics-calculator.component';

describe('StadisticsCalculatorComponent', () => {
  let component: StadisticsCalculatorComponent;
  let fixture: ComponentFixture<StadisticsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadisticsCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StadisticsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
