import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FantasyPage } from './fantasy.page';

const routes: Routes = [
  {
    path: '',
    component: FantasyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyPageRoutingModule {}
