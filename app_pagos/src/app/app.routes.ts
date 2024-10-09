import { RouterModule, Routes } from '@angular/router';
import { DefaultViewComponent } from './views/default-view/default-view.component';
import { HomeComponent } from './views/home/home.component';
import { CleanViewComponent } from './views/clean-view/clean-view.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { VerUsuariosComponent } from './views/ver-usuarios/ver-usuarios.component';
import { CrearModificarUsuarioComponent } from './views/crear-modificar-usuario/crear-modificar-usuario.component';

export const routes: Routes = [
  {
    //Rutas para el DefaultView
    path: '',
    component: DefaultViewComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'ver-usuarios', component: VerUsuariosComponent
      },
      {
        path: 'crear-usuario', component: CrearModificarUsuarioComponent
      },
      {
        path: 'modificar-usuario/:id', component: CrearModificarUsuarioComponent
      }
    ]
  },
  {
    //Rutas para el CleanView
    path: '',
    component: CleanViewComponent,
    children: [
      {
        path: 'signup', component: SignupComponent
      }
    ]
  }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule { }
