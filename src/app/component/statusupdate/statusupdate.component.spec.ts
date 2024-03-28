import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusupdateComponent } from './statusupdate.component';

describe('StatusupdateComponent', () => {
  let component: StatusupdateComponent;
  let fixture: ComponentFixture<StatusupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
