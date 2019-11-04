import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  dataInfo: any;

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  pagina_login(registrarUsuario:boolean)
  {

    // this.navCtrl.push(this.iniciarSesionPage,{ dataInfo : dataInfo})
    this.router.navigate(['/iniciar-sesion'], 
    { queryParams : {
      registrarUsuario : registrarUsuario,
      descripcion :  (registrarUsuario) ? "Registrar Usuario" : "Iniciar Sesion"
      }
    }
    )
  }

  pagina_registro()
  {
    // this.navCtrl.push(this.registrarsePage);
    this.router.navigate(['/iniciar-sesion'])
  }

}
