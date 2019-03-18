import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlmacenamientoServiceService } from './services/almacenamiento-service/almacenamiento-service.service';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { WelcomePageModule } from './welcome/welcome.module';
import { HomePageModule } from './home/home.module';
import { WelcomePage } from './welcome/welcome.page';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage: any;
  emailAccount:string = "";

  public appPages = [

    { title: 'Inicio' , icon: 'home', url: '/home' },
    {title: 'Favoritos', icon: 'star', url:'/favoritos'},
    {title: 'Populares', icon: 'globe', url:'/populares'},


  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public almacenamientoService: AlmacenamientoServiceService,
    public authService : AuthServiceService,
    private router : Router
  ) {

    this.almacenamientoService.IsLogIn().then((logueado) =>
    {
      if(logueado) 
      {
        this.almacenamientoService.getEmailAccount().then((email) =>
        {
          this.emailAccount = email
        })
        
        this.router.navigate(['/home'])
      }
      else
      {
        // this.rootPage = WelcomePageModule
        this.router.navigate(['welcome'])
      }

    })
    .catch((error) =>
    {
      console.log(error);
      this.rootPage = WelcomePageModule
    })




    this.initializeApp();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut()
  {
    this.authService.signOut();
    //this.almacenamientoService.LogOut();
    
    // this.nav.setRoot(WelcomePage)
    this.router.navigate(['welcome'])
    location.reload();
  }

  obtener_email()
  {
      return this.emailAccount
  }

}
