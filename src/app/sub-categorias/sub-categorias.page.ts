import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseServiceService } from '../services/firebase-service/firebase-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-categorias',
  templateUrl: './sub-categorias.page.html',
  styleUrls: ['./sub-categorias.page.scss'],
})
export class SubCategoriasPage implements OnInit {

  subRubroNombre:string;
  subRubros:any;
  negocios:any;
  selectedRubro:string;
  constructor(
    public loadingCtrl :LoadingController,
    private firebaseService : FirebaseServiceService,
    private router : Router,
    private route: ActivatedRoute
  
  ) { 

    this.subRubroNombre = this.route.snapshot.paramMap.get('Nombre');

  }

  ngOnInit() {


    this.MostrarSubRubros();
  }

  ver_negocio(subRubro)
  {
    // this.navCtrl.push(this.negociosPage, {subRubro:subRubro.Nombre});
    var NombreSubRubro = subRubro.Nombre
    this.router.navigate(['/negocios', NombreSubRubro])
  }

  getItems(ev: any) 
  {
    console.log("Hizo click")
  }

  getBussiness() 
  {
    if (this.selectedRubro == "") {
      this.selectedRubro = this.subRubros[0].Nombre;
      console.log("Rubro")
      console.log(this.subRubros[0].Nombre)
    }

    this.firebaseService.ObtenerNegocios(this.selectedRubro).on("value", negocios =>
      {    
        this.negocios = negocios
        console.log(this.negocios)
      })
    }


    async MostrarSubRubros()
     {
        let loading = await this.loadingCtrl.create({
          message: 'Por favor espere...'
        });
        loading.present();
      
        this.firebaseService.ObtenerSubRubros(this.subRubroNombre).valueChanges().subscribe(subRubros =>
          {
            this.subRubros = subRubros;
            loading.dismiss();
          });
      }


}
