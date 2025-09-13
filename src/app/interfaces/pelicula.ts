export interface Pelicula {
    id_pelicula: number;
    slug: string;
    nombre: string;
    anio: number;
    puntuacion: number;
    duracion: number;
    actores: string[];
    sinopsis: string;
    generos: string[];
    poster_url : string
}
