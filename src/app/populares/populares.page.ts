import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseServiceService } from '../services/firebase-service/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-populares',
  templateUrl: './populares.page.html',
  styleUrls: ['./populares.page.scss'],
})
export class PopularesPage implements OnInit {

  negocios:any;

  constructor(
    public loadingCtrl :LoadingController,
    public fireBaseService: FirebaseServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.MostrarPopulares();
  }

  async MostrarPopulares()
  {
    let loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    loading.present();

    var listaEntidades = [];

    this.fireBaseService.EntidadesMasVisitadas().then((entidades)=>
    {

      var i = 0;
      entidades.forEach(element => {
        var entidad = {
          nombre : "",
          valor : 0
        }
        
        entidad.nombre = element.key
        entidad.valor = element.val();
        listaEntidades[i] = entidad
        i++;

      });
      loading.dismiss();
      this.negocios = listaEntidades
      this.negocios = this.negocios.reverse();
    } )
    

  }


  public ver_negocio(Negocio)
  {
    // this.navCtrl.push(this.negocioDescripcionPage,{negocio:negocio});
    this.router.navigate(['/negocio-descripcion', Negocio])
  }




}
