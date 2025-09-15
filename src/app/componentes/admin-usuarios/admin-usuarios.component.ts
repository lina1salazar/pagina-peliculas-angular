import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario, UsuarioCrear } from '../../interfaces/usuarios';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  editUsuarioId: number | null = null;
  errorMessage = '';
  exitoMessage = '';

  constructor(private usuariosService: UsuariosService) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('usuario', [Validators.required]),
      contrasena: new FormControl('', [Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: data => this.usuarios = data,
      error: err => this.errorMessage = 'Error al cargar usuarios'
    });
  }

  guardarUsuario(): void {

    const contrasenaControl = this.usuarioForm.get('contrasena');
    if (!this.editUsuarioId) {
      contrasenaControl?.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      contrasenaControl?.setValidators([Validators.minLength(8)]);
    }

    contrasenaControl?.updateValueAndValidity();
    if (this.usuarioForm.invalid) {
      console.log('Formulario inválido:', this.usuarioForm);
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const datos: UsuarioCrear = this.usuarioForm.value;

    if (this.editUsuarioId) {
      this.usuariosService.actualizarUsuario(this.editUsuarioId, datos).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.exitoMessage = 'Usuario actualizado';
          this.usuarioForm.reset({ rol: 'user' });
          this.editUsuarioId = null;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Error al actualizar usuario'
      });
    } else {
      this.usuariosService.crearUsuario(datos).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.exitoMessage = 'Usuario creado';
          this.usuarioForm.reset({ rol: 'user' });
        },
        error: () => this.errorMessage = 'Error al crear usuario'
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.editUsuarioId = usuario.id_usuario ?? null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.usuariosService.getUsuario(usuario.id_usuario!).subscribe(res => {
      const usuario = res as Usuario
      console.log('Usuario para editar:', usuario);
      this.usuarioForm.setValue({
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        contrasena: ''
      });
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: () => this.errorMessage = 'Error al eliminar usuario'
      });
    }
  }
}
