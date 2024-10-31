import { RouterModule, Routes } from '@angular/router';
import { DefaultViewComponent } from './layout/default-view/default-view.component';
import { HomeComponent } from './views/home/home.component';
import { CleanViewComponent } from './layout/clean-view/clean-view.component';
import { NgModule } from '@angular/core';
import { RegistroUsuarioComponent } from './views/registro-usuario/registro-usuario.component';
import { RegistroEmpresaComponent } from './views/registro-empresa/registro-empresa.component';
import { PaymentDashboardComponent } from './views/payment-dashboard/payment-dashboard.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { ClearViewContentComponent } from './views/clear-view-content/clear-view-content.component';
import { InfoServiciosComponent } from './views/info-servicios/info-servicios.component';
import { RetirosComponent } from './views/retiros/retiros.component';
import { MyAccountComponent } from './views/my-account/my-account.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { EmpresaComponent } from './views/empresa/empresa.component';
import { AdministradorComponent } from './views/administrador/administrador.component';
import { ReporteComponent } from './views/reporte/reporte.component';
import { CompraComponent } from './views/compra/compra.component';

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
        path: 'info-servicio', component: InfoServiciosComponent
      },
      {
        path: 'retiros', component: RetirosComponent
      },
      {
        path: 'compras', component: CompraComponent
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
      },
      {
        path: 'dashboard/usuarios', component: UsuarioComponent
      },
      {
        path: 'dashboard/empresas', component: EmpresaComponent
      },
      {
        path: 'dashboard/admins', component: AdministradorComponent
      },
      {
        path: 'dashboard/reportes', component: ReporteComponent
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
