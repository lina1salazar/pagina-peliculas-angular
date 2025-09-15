import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActoresService } from '../../servicios/actores.service';
import { Actor, ActorCrear } from '../../interfaces/actor';

@Component({
  selector: 'app-admin-actores',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './admin-actores.component.html',
  styleUrls: ['./admin-actores.component.scss']
})
export class AdminActoresComponent implements OnInit {
  actores: Actor[] = [];
  actorForm: FormGroup;
  editActorId: number | null = null;
  errorMessage = '';
  exitoMessage = '';

  constructor(private actoresService: ActoresService) {
    this.actorForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
    this.cargarActores();
  }

  cargarActores(): void {
    this.actoresService.getActores().subscribe({
      next: data => this.actores = data,
      error: () => this.errorMessage = 'Error al cargar actores'
    });
  }

  guardarActor(): void {
    if (this.actorForm.invalid) {
      this.actorForm.markAllAsTouched();
      return;
    }

    const datos: ActorCrear = this.actorForm.value;

    if (this.editActorId) {
      this.actoresService.actualizarActor(this.editActorId, datos).subscribe({
        next: () => {
          this.cargarActores();
          this.exitoMessage = 'Actor actualizado';
          this.actorForm.reset();
          this.editActorId = null;
        },
        error: () => this.errorMessage = 'Error al actualizar actor'
      });
    } else {
      this.actoresService.crearActor(datos).subscribe({
        next: () => {
          this.cargarActores();
          this.exitoMessage = 'Actor creado';
          this.actorForm.reset();
        },
        error: () => this.errorMessage = 'Error al crear actor'
      });
    }
  }

  editarActor(actor: Actor): void {
    this.editActorId = actor.id_actor ?? null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.actorForm.setValue({
      nombre: actor.nombre
    });
  }

  eliminarActor(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este actor?')) {
      this.actoresService.eliminarActor(id).subscribe({
        next: () => this.cargarActores(),
        error: () => this.errorMessage = 'Error al eliminar actor'
      });
    }
  }

  cancelar(): void {
    this.editActorId = null;
    this.actorForm.reset();
  }
}
