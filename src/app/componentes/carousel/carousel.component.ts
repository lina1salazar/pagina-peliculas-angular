import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Pelicula } from '../../interfaces/pelicula';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  peliculasDestacadas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculasDestacadas().subscribe({
      next: (peliculas) => {
        this.peliculasDestacadas = peliculas;
      },
      error: (err) => {
        console.error('Error cargando destacadas:', err);
      }
    });
  }
}
