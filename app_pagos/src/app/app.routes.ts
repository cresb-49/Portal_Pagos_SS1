import { Routes } from '@angular/router';
import { DefaultViewComponent } from './views/default-view/default-view.component';

export const routes: Routes = [
  {
    //Rutas para el DefaultView
    path: '',
    component: DefaultViewComponent,
    children: [
      {
        path: '',
      }
    ]
  },
];
