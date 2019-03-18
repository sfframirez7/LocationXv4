import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  txtEmail:string = "";
  txtPassword:string = "";
  dataInfo = {registrarUsuario: "" , descripcion: ""};

  constructor(
    private authService : AuthServiceService,
    private toastCtrl : ToastController,
    private router : Router,
    private route: ActivatedRoute

  ) 
  { }

  ngOnInit() 
  {  
    this.dataInfo.registrarUsuario =  this.route.snapshot.queryParamMap.get('registrarUsuario')
    this.dataInfo.descripcion =  this.route.snapshot.queryParamMap.get('descripcion') 
  }

  
  hacer_login()
  {
    if(!this.txtEmail )
    {
      this.showMessage("Es necesario una dirección de correo");
      return;
    }

    if(!this.txtPassword )
    {
      this.showMessage("Es necesaria la contraseña")
      return;
    }

    if (this.dataInfo.registrarUsuario == "true")
       {
         this.authService.signUpWithEmail(this.txtEmail, this.txtPassword , true).then((user) =>
         {
            this.router.navigate(['/home'])
          }).catch((error) =>
          {
            this.showMessage("Algo ha salido mal: " +error.message)
          })
        }
    else
      {
        this.authService.loginWithEmail(this.txtEmail, this.txtPassword).then((user)=>{          
          this.router.navigate(['/home'])

        }).catch((error) =>
      {
        this.showMessage("Algo ha salido mal: " +error.message)
      })
      }

  }


 
  async showMessage(mensaje)
  {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration:1500
    });
    toast.present();
  }

}
