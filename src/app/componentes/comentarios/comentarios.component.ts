import { Component } from '@angular/core';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-comentarios',
  imports: [ComentarioComponent],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.scss'
})
export class ComentariosComponent {

}
