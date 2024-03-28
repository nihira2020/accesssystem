import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpwdComponent } from './forgetpwd.component';

describe('ForgetpwdComponent', () => {
  let component: ForgetpwdComponent;
  let fixture: ComponentFixture<ForgetpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetpwdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
