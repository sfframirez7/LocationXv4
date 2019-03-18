import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  rubros:any; 

  constructor(
    public loadingCtrl :LoadingController,
    private fireBaseService : FirebaseServiceService,
    private router : Router
  )
  {
    this.MostrarRubros()
  }

  ver_rubro(rubro)
  {
     var Nombre = rubro.Nombre
     this.router.navigate(['/sub-categorias', Nombre])
  }



  async MostrarRubros() {
    let loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    loading.present();
  
    this.fireBaseService.ObtenerRubros().valueChanges().subscribe(rubro =>
      {
        this.rubros = rubro;
        loading.dismiss();
      });
  }
  
  Ciudades()
  {
    this.fireBaseService.ObtenerCiudades().once("value").then((ciudades)=>
    {
      console.log("Ciudades")
      console.log(ciudades.val())
      ciudades.forEach(element => {
        console.log(element.val().Nombre, element.key )
      });
    })
  }


}
