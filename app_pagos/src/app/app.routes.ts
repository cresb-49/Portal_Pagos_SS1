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
import { RegistroUsuarioComponent } from './views/registro-usuario/registro-usuario.component';
import { RegistroEmpresaComponent } from './views/registro-empresa/registro-empresa.component';
import { PaymentDashboardComponent } from './views/payment-dashboard/payment-dashboard.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { ClearViewContentComponent } from './views/clear-view-content/clear-view-content.component';
import { InfoServiciosComponent } from './views/info-servicios/info-servicios.component';
import { RetirosComponent } from './views/retiros/retiros.component';
import { MyAccountComponent } from './views/my-account/my-account.component';

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
        path: 'home', component: PaymentDashboardComponent
      },
      {
        path: 'ver-usuarios', component: VerUsuariosComponent
      },
      {
        path: 'crear-usuario', component: CrearUsuarioComponent
      },
      {
        path: 'modificar-usuario/:id', component: ModificarUsuarioComponent
      },
      {
        path: 'info-servicio', component: InfoServiciosComponent
      },
      {
        path: 'retiros', component: RetirosComponent
      },
      {
        path: 'mi-perfil', component: MyAccountComponent
      }
    ]
  },
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'dashboard', component: ClearViewContentComponent
      }
    ]
  },
  {
    //Rutas para el CleanView
    path: '',
    component: CleanViewComponent,
    children: [
      {
        path: 'signup', component: RegistroUsuarioComponent
      },
      {
        path: 'signup/empresa', component: RegistroEmpresaComponent
      }
    ]
  }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule { }
