import { RouterModule, Routes } from '@angular/router';
import { DefaultViewComponent } from './layout/default-view/default-view.component';
import { HomeComponent } from './views/home/home.component';
import { CleanViewComponent } from './layout/clean-view/clean-view.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { VerUsuariosComponent } from './views/ver-usuarios/ver-usuarios.component';
import { CrearModificarUsuarioComponent } from './components/crear-modificar-usuario/crear-modificar-usuario.component';
import { CrearUsuarioComponent } from './views/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './views/modificar-usuario/modificar-usuario.component';

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
        path: 'crear-usuario', component: CrearUsuarioComponent
      },
      {
        path: 'modificar-usuario/:id', component: ModificarUsuarioComponent
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
