export interface Comentario {
    id_comentario?: number;
    id_usuario?: number;
    id_pelicula?: number;
    contenido: string;
    calificacion: number;
    fecha_comentario?: string;
    usuario?: string;
}