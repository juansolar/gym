import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';

const routes: Routes = [
  {
    path: 'listadoClientes', component: ListadoClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
