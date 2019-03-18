import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseServiceService } from '../services/firebase-service/firebase-service.service';
import { AlmacenamientoServiceService } from '../services/almacenamiento-service/almacenamiento-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  negocios:any;

  constructor(
    public loadingCtrl :LoadingController,
    public fireBaseService: FirebaseServiceService,
    private almacenamientoService : AlmacenamientoServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.MostrarFavoritos();
  }

 async MostrarFavoritos()
  {
    let loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    loading.present();

    this.almacenamientoService.getUserId().then((userId)=>
  {
      this.fireBaseService.ObtenerFavoritos(userId).valueChanges().subscribe(favoritos =>
      {
        this.negocios = favoritos;
        loading.dismiss();
      });
  })

  }


  public ver_negocio(Negocio)
  {
    this.router.navigate(['/negocio-descripcion', Negocio])
  }



}
