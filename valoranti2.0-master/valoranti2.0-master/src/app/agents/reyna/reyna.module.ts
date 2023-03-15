import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReynaPageRoutingModule } from './reyna-routing.module';

import { ReynaPage } from './reyna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReynaPageRoutingModule
  ],
  declarations: [ReynaPage]
})
export class ReynaPageModule {}
