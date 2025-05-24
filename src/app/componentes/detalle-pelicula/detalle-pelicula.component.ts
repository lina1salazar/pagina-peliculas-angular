import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pelicula, PeliculasService } from '../../servicios/peliculas.service';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {
  pelicula?: Pelicula;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.pelicula = this.peliculasService.obtenerPeliculaPorSlug(slug);
    }
  }
}
