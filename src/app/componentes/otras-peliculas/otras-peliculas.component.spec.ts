import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasPeliculasComponent } from './otras-peliculas.component';

describe('OtrasPeliculasComponent', () => {
  let component: OtrasPeliculasComponent;
  let fixture: ComponentFixture<OtrasPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrasPeliculasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrasPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
