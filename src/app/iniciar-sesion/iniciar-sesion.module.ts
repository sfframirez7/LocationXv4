import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IniciarSesionPage } from './iniciar-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarSesionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IniciarSesionPage]
})
export class IniciarSesionPageModule {}
