import { Component } from '@angular/core';
import { ContactoDetallesComponent } from '../../componentes/contacto-detalles/contacto-detalles.component';
import { MapaGoogleComponent } from '../../componentes/mapa-google/mapa-google.component';

@Component({
  selector: 'app-contacto',
  imports: [ContactoDetallesComponent, MapaGoogleComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

}
