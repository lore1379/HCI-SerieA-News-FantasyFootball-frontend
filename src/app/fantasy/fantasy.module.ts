import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FantasyPageRoutingModule } from './fantasy-routing.module';

import { FantasyPage } from './fantasy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FantasyPageRoutingModule
  ],
  declarations: [FantasyPage]
})
export class FantasyPageModule {}
