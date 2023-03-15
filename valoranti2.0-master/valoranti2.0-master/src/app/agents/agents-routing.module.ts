import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsPage } from './agents.page';

const routes: Routes = [
  {
    path: '',
    component: AgentsPage
  },
  {
    path: 'reyna',
    loadChildren: () => import('./reyna/reyna.module').then( m => m.ReynaPageModule)
  },
  {
    path: 'pheonix',
    loadChildren: () => import('./pheonix/pheonix.module').then( m => m.PheonixPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsPageRoutingModule {}
