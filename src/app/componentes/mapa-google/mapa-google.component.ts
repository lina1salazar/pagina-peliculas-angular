import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa-google',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './mapa-google.component.html',
  styleUrls: ['./mapa-google.component.scss']
})
export class MapaGoogleComponent {
  zoom = 16;
  center: google.maps.LatLngLiteral = {
    lat: 4.620940247065228,
    lng: -74.07301817680067
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition = this.center;
}
