import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroComponent } from './pages/libro/libro.component';
import { ListaComponent } from './pages/lista/lista.component';

const routes: Routes = [
  { path:'lists', component: ListaComponent },
  { path:'lists/:id', component: LibroComponent },
  { path:'', redirectTo:'/lists', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
