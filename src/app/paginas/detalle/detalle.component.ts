import { Component } from '@angular/core';
import { ComentariosComponent } from '../../componentes/comentarios/comentarios.component';
import { ReseniasComponent } from '../../componentes/resenias/resenias.component';


@Component({
  selector: 'app-detalle',
  imports: [ ComentariosComponent, ReseniasComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent {

}
