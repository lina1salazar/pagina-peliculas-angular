import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pelicula } from '../../interfaces/pelicula';


@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {
  @Input() idPelicula!: number;
  pelicula?: Pelicula;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    if (this.idPelicula) {
      this.peliculasService.getPelicula(this.idPelicula).subscribe(res => {
        const pelicula = res as Pelicula;
        this.pelicula = {
          ...pelicula,
          actores: pelicula.actores ?? [],
          generos: pelicula.generos ?? [],
          sinopsis: pelicula.sinopsis ?? ''
        };
    } ); 
    }
  }
}
