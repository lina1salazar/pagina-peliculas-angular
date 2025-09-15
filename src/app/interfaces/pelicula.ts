import { Actor } from "./actor";
import { Genero } from "./generos";

export interface Pelicula {
    id_pelicula: number;
    slug: string;
    nombre: string;
    anio: number;
    puntuacion: number;
    duracion: number;
    actores: Actor[];
    sinopsis: string;
    generos: Genero[];
    poster_url : string;
    banner_url : string;
}
