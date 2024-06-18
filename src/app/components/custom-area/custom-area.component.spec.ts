import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAreaComponent } from './custom-area.component';

describe('CustomAreaComponent', () => {
  let component: CustomAreaComponent;
  let fixture: ComponentFixture<CustomAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
