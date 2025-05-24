import { Component, OnInit } from '@angular/core';
import { PeliculasService, Pelicula } from '../../servicios/peliculas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otras-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otras-peliculas.component.html',
  styleUrls: ['./otras-peliculas.component.scss']
})
export class OtrasPeliculasComponent implements OnInit {
  peliculasOtras: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe(peliculas => {
      this.peliculasOtras = this.obtenerSeisAleatorias(peliculas);
    });
  }

  private obtenerSeisAleatorias(peliculas: Pelicula[]): Pelicula[] {
    const copia = [...peliculas];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, 4);
  }
}
