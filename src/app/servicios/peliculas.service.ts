import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Pelicula {
  slug: string;
  nombre: string;
  anio: number;
  generos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private peliculas: Pelicula[] = [
  {
    slug: 'memorias-de-un-caracol',
    nombre: 'Memorias de un Caracol',
    anio: 2025,
    generos: ['Animación', 'Drama', 'Comedia', 'Melodrama', 'Stop Motion']
  },
  {
    slug: 'the-monkey',
    nombre: 'The Monkey',
    anio: 2025,
    generos: ['Comedia', 'Terror']
  },
  {
    slug: 'la-lista-de-schindler',
    nombre: 'La Lista de Schindler',
    anio: 1993,
    generos: ['Drama', 'Historia']
  },
  {
    slug: 'el-padrino',
    nombre: 'El Padrino',
    anio: 1972,
    generos: ['Drama', 'Crimen']
  },
  {
    slug: 'un-dolor-real',
    nombre: 'Un Dolor Real',
    anio: 2024,
    generos: ['Drama', 'Comedia']
  },
  {
    slug: 'la-sustancia',
    nombre: 'La sustancia',
    anio: 2024,
    generos: ['Thriller', 'Ciencia Ficción']
  },
  {
    slug: 'mad-max-furia-en-la-carretera',
    nombre: 'Mad Max: Furia en la carretera',
    anio: 2015,
    generos: ['Ciencia Ficción', 'Acción']
  },
  {
    slug: 'tiempos-violentos',
    nombre: 'Tiempos Violentos',
    anio: 1994,
    generos: ['Drama', 'Crimen']
  },
  {
    slug: 'la-naranja-mecanica',
    nombre: 'La Naranja Mecánica',
    anio: 1971,
    generos: ['Drama', 'Ciencia Ficción']
  },
  {
    slug: 'psicosis',
    nombre: 'Psicosis',
    anio: 1960,
    generos: ['Terror', 'Suspenso', 'Misterio']
  },
  {
    slug: 'el-rey-leon',
    nombre: 'El Rey León',
    anio: 1994,
    generos: ['Animación', 'Drama', 'Aventura']
  },
  {
    slug: 'aladdin',
    nombre: 'Aladdín',
    anio: 1992,
    generos: ['Animación', 'Aventura', 'Fantasía']
  },
  {
    slug: 'toy-story',
    nombre: 'Toy Story',
    anio: 1995,
    generos: ['Animación', 'Comedia', 'Aventura']
  },
  {
    slug: 'los-increibles-2',
    nombre: 'Los Increíbles 2',
    anio: 2018,
    generos: ['Animación', 'Acción', 'Aventura']
  },
  {
    slug: 'la-sirenita',
    nombre: 'La Sirenita',
    anio: 1989,
    generos: ['Animación', 'Aventura', 'Fantasía']
  },
  {
    slug: 'shrek',
    nombre: 'Shrek',
    anio: 2001,
    generos: ['Animación', 'Comedia', 'Aventura']
  },
  {
    slug: 'madagascar',
    nombre: 'Madagascar',
    anio: 2005,
    generos: ['Animación', 'Comedia', 'Aventura']
  },
  {
    slug: 'el-principe-de-egipto',
    nombre: 'El Príncipe de Egipto',
    anio: 1998,
    generos: ['Animación', 'Drama', 'Aventura']
  },
  {
    slug: 'el-senor-de-los-anillos-el-retorno-del-rey',
    nombre: 'El Señor de los Anillos: El Retorno del Rey',
    anio: 2003,
    generos: ['Drama', 'Ciencia Ficción', 'Acción', 'Aventura', 'Fantasía']
  },
  {
    slug: 'una-pelicula-de-minecraft',
    nombre: 'Una Película de Minecraft',
    anio: 2025,
    generos: ['Comedia', 'Aventura']
  },
  {
    slug: 'the-amateur',
    nombre: 'The Amateur',
    anio: 2025,
    generos: ['Drama', 'Thriller', 'Acción', 'Suspenso']
  },
  {
    slug: 'los-pecadores',
    nombre: 'Los Pecadores',
    anio: 2025,
    generos: ['Aventura', 'Horror']
  },
  {
    slug: 'origen',
    nombre: 'Origen',
    anio: 2010,
    generos: ['Thriller', 'Ciencia Ficción', 'Acción', 'Aventura', 'Thriller Psicologico']
  },
  {
    slug: 'dune-parte-2',
    nombre: 'Dune Parte 2',
    anio: 2024,
    generos: ['Drama', 'Ciencia Ficción', 'Acción', 'Aventura']
  },
  {
    slug: 'intensa-mente-2',
    nombre: 'Intensa Mente 2',
    anio: 2024,
    generos: ['Animación', 'Drama', 'Comedia', 'Aventura']
  },
  {
    slug: 'conclave',
    nombre: 'Cónclave',
    anio: 2024,
    generos: ['Drama', 'Suspenso', 'Misterio']
  },
  {
    slug: 'furiosa-de-la-saga-mad-max',
    nombre: 'Furiosa De la saga Mad Max',
    anio: 2024,
    generos: ['Thriller', 'Ciencia Ficción', 'Acción', 'Aventura']
  }
];

  constructor() { }

  getPeliculas(): Observable<Pelicula[]> {
    return of(this.peliculas);
  }
}
