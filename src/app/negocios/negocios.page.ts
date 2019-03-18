import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase-service/firebase-service.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.page.html',
  styleUrls: ['./negocios.page.scss'],
})
export class NegociosPage implements OnInit {

  negocios:any;

  subRubroNombre:string;
  hayRegistrosParaMostrar:boolean = true;

  entidadesList:Array<any>;
  loadedEntidadesList:Array<any>;
  ciudades:any;
  ciudadSelected:any
  public entidadesRef:firebase.database.Reference;

  constructor(
    public firebaseService:FirebaseServiceService,
    public loadingCtr: LoadingController,
    private router : Router,
    private route : ActivatedRoute
  ) 
  { 
    // this.subRubroNombre = navParams.get('subRubro')
    this.subRubroNombre = this.route.snapshot.paramMap.get('NombreSubRubro');
    console.log(this.subRubroNombre);

  }
  
  ngOnInit() {
    this.MostrarNegocios();
    this.Ciudades()
  }

  ver_negocio(Negocio)
  {
    console.log(Negocio);
    // this.navCtrl.push(this.negocioDescripcionPage,{negocio:negocio.Entidad});
    this.router.navigate(['/negocio-descripcion', Negocio])

  }

  buscar(ev: any) 
  {
    this.initializeItems();

    var terminoBusqueda = "";
    try {
        terminoBusqueda =  ev.srcElement.value;
      
    } catch (error) {
      terminoBusqueda = ""
    }

    

      if (!terminoBusqueda && !this.ciudadSelected)
          return;
      
      this.entidadesList = this.entidadesList.filter((v) => {
        

        if(v.Nombre && terminoBusqueda) 
        {
          if ((v.Nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1
           || v.Descripcion.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1)
           && this.filtrarCiudad(v.Ciudades)     ) 
          {
            return true;
          }
          else{
            return false;
          }
        }
        if(this.ciudadSelected)
        {
          if (this.filtrarCiudad(v.Ciudades)   ) 
            return true;
          else
            return false;
        }
      });

  }

  add_Favorite(negocio)
  {
    console.log(negocio.Nombre);
  }

  async MostrarNegocios() {
    let loading = await this.loadingCtr.create({
      message: 'Por favor espere...'
    });
    loading.present();
  
    try {
      
      this.firebaseService.ObtenerNegocios(this.subRubroNombre).on('value', entidadesList => 
      {
        if (!entidadesList.val() )
        {
          this.hayRegistrosParaMostrar = false;
          loading.dismiss();
          return;
        }
        let Entidades = [];
        entidadesList.forEach( country => {
          Entidades.push(country.val());
          return false;
        });
        
        this.entidadesList = Entidades;
        this.loadedEntidadesList = Entidades;
        loading.dismiss();
      });
    } 
    catch (error) 
    {
      loading.dismiss();
    }
  }
  

  initializeItems(): void {
    this.entidadesList = this.loadedEntidadesList;
  }

  Ciudades()
  {
    this.firebaseService.ObtenerCiudades().once("value").then((ciudades)=>
    {

      var i = 0;
      var listaCiudades = [];
      ciudades.forEach(element => {
        if (!element.val().Activo)
          return
        var ciudad = { Nombre: "", Id : ""}
        ciudad.Nombre = element.val().Nombre;
        ciudad.Id = element.key;
        listaCiudades[i] = ciudad
        i++;
      });
      this.ciudades = listaCiudades
    })
  }


  private filtrarCiudad(ciudades)
  {
    
    var seEncontro = false;
    Object.keys(ciudades).forEach(ciudad =>{
       if(!this.ciudadSelected)
          {
            seEncontro = true
            return
          }

       if(seEncontro)
        return

        if(!ciudad)
          return;

      if(ciudad.toLowerCase().trim() == this.ciudadSelected.toLowerCase().trim())
        seEncontro = true;
      else
        seEncontro = false;
    })
    return seEncontro;
  }


}
