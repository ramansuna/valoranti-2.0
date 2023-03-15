import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PheonixPage } from './pheonix.page';

const routes: Routes = [
  {
    path: '',
    component: PheonixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PheonixPageRoutingModule {}
