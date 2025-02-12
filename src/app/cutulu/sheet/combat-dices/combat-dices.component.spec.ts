import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatDicesComponent } from './combat-dices.component';

describe('CombatDicesComponent', () => {
  let component: CombatDicesComponent;
  let fixture: ComponentFixture<CombatDicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatDicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombatDicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
