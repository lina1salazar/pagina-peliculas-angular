import { Component } from '@angular/core';
import { ComentarioComponent } from '../comentario/comentario.component';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  imports: [ComentarioComponent, NgFor, ReactiveFormsModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.scss'
})
export class ComentariosComponent {
   comentarios = [
    {
      nombre: 'John Doe',
      calificacion: 6.3,
      fecha: '2025-04-22',
      texto: 'Muy bueno, me encantó!'
    },
    {
      nombre: 'Jane Smith',
      calificacion: 8.5,
      fecha: '2025-04-21',
      texto: 'Una experiencia increíble.'
    }
  ];


  comentarioForm = new FormGroup({
    nombre: new FormControl(''),
    calificacion: new FormControl(0),
    texto: new FormControl('')
  });

  agregarComentario() {
    const fechaHoy = new Date().toISOString().split('T')[0];
    this.comentarios.push({
      nombre: this.comentarioForm.value.nombre ?? '',
      calificacion: this.comentarioForm.value.calificacion ?? 0,
      fecha: fechaHoy,
      texto: this.comentarioForm.value.texto ?? ''
    });

    this.comentarioForm.reset({
      nombre: '',
      calificacion: 0,
      texto: ''
    })

  }
}
