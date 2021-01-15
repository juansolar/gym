import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './components/cliente/agregar/agregar.component';
import { ListadoClientesComponent } from './components/cliente/listado-clientes/listado-clientes.component';

const routes: Routes = [
  {
    path: 'listadoClientes', component: ListadoClientesComponent
  },
  {
    path: 'agregarCliente', component: AgregarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
