import { Component } from '@angular/core';
import { ContactoDetallesComponent } from '../../componentes/contacto-detalles/contacto-detalles.component';

@Component({
  selector: 'app-contacto',
  imports: [ContactoDetallesComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

}
