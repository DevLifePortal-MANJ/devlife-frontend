import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDating } from './dev-dating';

describe('DevDating', () => {
  let component: DevDating;
  let fixture: ComponentFixture<DevDating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevDating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevDating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
