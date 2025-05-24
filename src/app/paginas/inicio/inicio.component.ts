import { Component } from '@angular/core';
import { CarouselComponent } from '../../componentes/carousel/carousel.component';
import { PeliculasComponent } from '../../componentes/peliculas/peliculas.component';

@Component({
  selector: 'app-inicio',
  imports: [CarouselComponent, PeliculasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
