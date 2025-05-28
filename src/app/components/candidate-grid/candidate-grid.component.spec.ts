import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateGridComponent } from './candidate-grid.component';

describe('CandidateGridComponent', () => {
  let component: CandidateGridComponent;
  let fixture: ComponentFixture<CandidateGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
