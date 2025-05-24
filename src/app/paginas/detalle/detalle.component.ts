import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService, Pelicula } from '../../servicios/peliculas.service';
import { ComentariosComponent } from '../../componentes/comentarios/comentarios.component';
import { ReseniasComponent } from '../../componentes/resenias/resenias.component';
import { DetallePeliculaComponent } from '../../componentes/detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [DetallePeliculaComponent, ComentariosComponent, ReseniasComponent],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

}

