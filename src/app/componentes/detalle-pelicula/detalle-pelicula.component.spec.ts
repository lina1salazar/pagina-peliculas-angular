import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePeliculaComponent } from './detalle-pelicula.component';

describe('DetallePeliculaComponent', () => {
  let component: DetallePeliculaComponent;
  let fixture: ComponentFixture<DetallePeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
