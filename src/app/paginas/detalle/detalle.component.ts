import { Component, OnInit } from '@angular/core';
import { ComentariosComponent } from '../../componentes/comentarios/comentarios.component';
import { DetallePeliculaComponent } from '../../componentes/detalle-pelicula/detalle-pelicula.component';
import { ActivatedRoute } from '@angular/router';
//import { OtrasPeliculasComponent  } from '../../componentes/otras-peliculas/otras-peliculas.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [DetallePeliculaComponent, ComentariosComponent],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  idPelicula!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idPelicula = id ? Number(id) : 0;
  }

}

