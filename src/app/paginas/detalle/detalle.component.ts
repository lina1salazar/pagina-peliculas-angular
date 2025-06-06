import { Component, OnInit } from '@angular/core';
import { ComentariosComponent } from '../../componentes/comentarios/comentarios.component';
import { ReseniasComponent } from '../../componentes/resenias/resenias.component';
import { DetallePeliculaComponent } from '../../componentes/detalle-pelicula/detalle-pelicula.component';
import { OtrasPeliculasComponent  } from '../../componentes/otras-peliculas/otras-peliculas.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [DetallePeliculaComponent, ComentariosComponent, ReseniasComponent, OtrasPeliculasComponent ],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

}

