import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideRulesComponent } from './override-rules.component';

describe('OverrideRulesComponent', () => {
  let component: OverrideRulesComponent;
  let fixture: ComponentFixture<OverrideRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverrideRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverrideRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
