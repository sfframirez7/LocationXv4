import { Injectable } from '@angular/core';
import { AngularFireAuth  } from "angularfire2/auth";
import { AlmacenamientoServiceService } from "../almacenamiento-service/almacenamiento-service.service";
import { HomePageModule  } from "../../home/home.module";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authState: any = null;
  homePage = HomePageModule;

  constructor(
    private afAuth : AngularFireAuth  
    ,public almacenamientoService: AlmacenamientoServiceService    
  ) { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  
  public signUpWithEmail(email: string, password: string, loggin: boolean = false)
   {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        if(loggin)
        this.loginWithEmail(email, password)        
      })
      .catch(error => {
        console.log(error)
         throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.authState = response
        this.almacenamientoService.Login(response.user);
        //this.almacenamientoService.saveEmailAccount(this.currentUserName())
      })
      .catch(error => {
        throw error
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.almacenamientoService.LogOut();
  }


  isUserEmailLoggedIn(): boolean 
  {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  isUserAnonymousLoggedIn(): boolean 
  {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  currentUserName(): string
  {
    return (this.authState !== null) ? this.authState['email']   : ""
  }
 

}
