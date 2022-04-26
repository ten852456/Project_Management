import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentTimeComponent } from './spent-time.component';

describe('SpentTimeComponent', () => {
  let component: SpentTimeComponent;
  let fixture: ComponentFixture<SpentTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpentTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpentTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
