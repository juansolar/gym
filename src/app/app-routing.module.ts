import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './components/cliente/agregar/agregar.component';
import { ListadoClientesComponent } from './components/cliente/listado-clientes/listado-clientes.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListadoInscripcionesComponent } from './components/listado-inscripciones/listado-inscripciones.component';
import { PrecioComponent } from './components/precio/precio.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'inscripcion', pathMatch: 'full'
  },
  {
    path: 'inscripcion', component: InscripcionComponent
  },
  {
    path: 'listadoClientes', component: ListadoClientesComponent
  },
  {
    path: 'agregarCliente', component: AgregarComponent
  },
  {
    path: 'agregarCliente/:clienteId', component: AgregarComponent
  },
  {
    path: 'precios', component: PrecioComponent
  },
  {
    path: 'listadoInscripciones', component: ListadoInscripcionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
