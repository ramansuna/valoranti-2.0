import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedPage } from './shared.page';

const routes: Routes = [
  {
    path: '',
    component: SharedPage
  },
  {
    path: 'guard',
    loadChildren: () => import('./guard/guard.module').then( m => m.GuardPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedPageRoutingModule {}
