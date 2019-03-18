import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var google : any

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {

  @ViewChild('map') mapRef: ElementRef

  map:any;
  params:any
  Nombre:string
  Latitud :number = 0;
  Longitud:number = 0;

  constructor(
    private route : ActivatedRoute
  ) { 
    this.Nombre = this.route.snapshot.queryParamMap.get('Nombre');
    this.Latitud = Number( this.route.snapshot.queryParamMap.get('Latitud'));
    this.Longitud = Number( this.route.snapshot.queryParamMap.get('Longitud'));
    
  }

  ngOnInit() {
    this.show_map();
  }


  show_map()
  {
    const location = new google.maps.LatLng(this.Latitud, this.Longitud)
   
    //Maps option
    const options = {
      center : location,
      zoom : 14
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement,
    options)
    this.addMarket(location, this.map)
  }

  addMarket(position, map)
  {
    return new google.maps.Marker(
      {
        position, map
      }
    )
  }

  obtener_parametros()
  {
    this.Nombre = this.params.Nombre;
    this.Latitud = this.params.Latitud;
    this.Longitud = this.params.Longitud
  }

}


