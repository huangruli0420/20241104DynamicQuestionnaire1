import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondComponent } from './respond.component';

describe('RespondComponent', () => {
  let component: RespondComponent;
  let fixture: ComponentFixture<RespondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
