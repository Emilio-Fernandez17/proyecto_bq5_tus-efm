import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Busqueda } from './pages/busqueda/busqueda';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'buscar', component: Busqueda},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }