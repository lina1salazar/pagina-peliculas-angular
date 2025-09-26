import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonFavoritasComponent } from './boton-favoritas.component';

describe('BotonFavoritasComponent', () => {
  let component: BotonFavoritasComponent;
  let fixture: ComponentFixture<BotonFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonFavoritasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
