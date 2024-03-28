import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpwdComponent } from './confirmpwd.component';

describe('ConfirmpwdComponent', () => {
  let component: ConfirmpwdComponent;
  let fixture: ComponentFixture<ConfirmpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmpwdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
