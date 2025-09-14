
export interface Usuario {
  id_usuario?: number;
  nombre: string;
  correo: string;
  rol: 'admin' | 'user';
}

export interface UsuarioCrear {
  nombre: string;
  correo: string;
  rol: 'admin' | 'user';
  contrasena: string;
}
