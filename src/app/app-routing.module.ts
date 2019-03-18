import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'registrarse', loadChildren: './registrarse/registrarse.module#RegistrarsePageModule' },
  { path: 'iniciar-sesion', loadChildren: './iniciar-sesion/iniciar-sesion.module#IniciarSesionPageModule' },
  { path: 'sub-categorias/:Nombre', loadChildren: './sub-categorias/sub-categorias.module#SubCategoriasPageModule' },
  { path: 'negocios/:NombreSubRubro', loadChildren: './negocios/negocios.module#NegociosPageModule' },
  { path: 'negocio-descripcion/:Negocio', loadChildren: './negocio-descripcion/negocio-descripcion.module#NegocioDescripcionPageModule' },
  { path: 'sucursales/:Negocio', loadChildren: './sucursales/sucursales.module#SucursalesPageModule' },
  { path: 'google-maps', loadChildren: './google-maps/google-maps.module#GoogleMapsPageModule' },
  { path: 'favoritos', loadChildren: './favoritos/favoritos.module#FavoritosPageModule' },
  { path: 'populares', loadChildren: './populares/populares.module#PopularesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
