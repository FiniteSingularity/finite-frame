import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KenBurnsComponent } from './ken-burns.component';

describe('KenBurnsComponent', () => {
  let component: KenBurnsComponent;
  let fixture: ComponentFixture<KenBurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KenBurnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KenBurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
