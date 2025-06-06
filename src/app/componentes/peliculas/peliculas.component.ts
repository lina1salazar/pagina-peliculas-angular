import { Component, OnInit } from '@angular/core';
import { PeliculasService, Pelicula } from '../../servicios/peliculas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './peliculas.component.html'
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  filtroGenero: string = '';
  filtroAnio: string = '';
  generos: string[] = [];
  anios: number[] = [];
  filtroBusqueda: string = '';

  constructor(private peliculasService: PeliculasService,private router: Router) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
      this.generos = this.obtenerGenerosUnicos(peliculas);
      this.anios = this.obtenerAniosUnicos(peliculas);
    });
   this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

get peliculasFiltradas(): Pelicula[] {
  return this.peliculas.filter(pelicula => {
    const coincideGenero = this.filtroGenero === '' || pelicula.generos.includes(this.filtroGenero);
    const coincideAnio = this.filtroAnio === '' || pelicula.anio.toString() === this.filtroAnio;
    const coincideBusqueda = this.filtroBusqueda === '' ||
      pelicula.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase());
    return coincideGenero && coincideAnio && coincideBusqueda;
  });
}

  private obtenerGenerosUnicos(peliculas: Pelicula[]): string[] {
    const generosSet = new Set<string>();
    peliculas.forEach(p => p.generos.forEach(g => generosSet.add(g)));
    return Array.from(generosSet).sort();
  }

  private obtenerAniosUnicos(peliculas: Pelicula[]): number[] {
    const aniosSet = new Set<number>();
    peliculas.forEach(p => aniosSet.add(p.anio));
    return Array.from(aniosSet).sort((a, b) => b - a);
  }
}
