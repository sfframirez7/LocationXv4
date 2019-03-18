import { Component, OnInit } from '@angular/core';
import { ISucursal } from '../models/ISucursal';
import { FirebaseServiceService } from '../services/firebase-service/firebase-service.service';
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {

  entidadId: string = "";
  sucursales: ISucursal[]= [];
  geolocation:Geolocation;

  sucursalesList:Array<any>;
  loadedSucursales :Array<any>;

  lat: number;
  longt: number;
  position:any;

  constructor(
    private firebaseServiceProvider : FirebaseServiceService,
    public actionSheetCtrl: ActionSheetController,
    private router :Router,
    private route : ActivatedRoute
  ) 
  {
    this.entidadId = this.route.snapshot.paramMap.get('Negocio')
   }

  ngOnInit() {
    this.cargar_sucursales();
      this.get_position();
  }

  
  get_position()

  {
    // this.geolocation.getCurrentPosition( ) .then((resp) => {
    //   console.log(resp.coords.latitude);
    //   console.log(resp.coords.longitude);
      
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
     
  }


  cargar_sucursales()
  {
    if (!this.entidadId)
        return;

    this.firebaseServiceProvider.obtener_sucursales(this.entidadId).once("value").then((sucursales)=>
    {
        sucursales.forEach(sucursal => {
          this.sucursales.push(sucursal.val())
        });
        this.sucursalesList = this.sucursales;
        this.loadedSucursales = this.sucursales;
    })
  }

   async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      // title: 'Opciones',
      buttons: [
        {
          text: 'Mas cercanas',
          handler: () => {
            console.log('Mas cercanas');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  buscar(ev: any) 
  {
    this.initializeItems();

    var terminoBusqueda = ev.srcElement.value ;

      if (!terminoBusqueda)
          return;
      
      this.sucursalesList = this.sucursalesList.filter((v) => {
        

        if(v.Nombre && terminoBusqueda) 
        {
          if ((v.Nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1
           || v.Direccion.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1)    ) 
          {
            return true;
          }
          else{
            return false;
          }
        }
        
      });

  }


  initializeItems(): void 
  {
    this.sucursalesList = this.loadedSucursales;
  }

  ver_mapa(sucursal)
  {
    console.log(sucursal);
    
    if(!sucursal.Cordenadas)
      return false

    if(!sucursal.Cordenadas.Latitud || !sucursal.Cordenadas.Longitud)
      return false
    var params =
    {
      Nombre   : sucursal.Nombre,
      Latitud  : sucursal.Cordenadas.Latitud,
      Longitud : sucursal.Cordenadas.Longitud
    }
    // this.navCtrl.push(this.googleMapsPage,{params})
  }

}

