import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPage } from './general.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: GeneralPage,
    children: [
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () => import('../news/news.module').then((m) => m.NewsPageModule),
          },
        ],
      },
      {
        path: 'ranking',
        children: [
          {
            path: '',
            loadChildren: () => import('../ranking/ranking.module').then((m) => m.RankingPageModule),
          },
        ],
      },
      {
        path: 'fantasy',
        children: [
          {
            path: '',
            loadChildren: () => import('../fantasy/fantasy.module').then((m) => m.FantasyPageModule),
          },
        ],
      },
      {
        path: 'live',
        children: [
          {
            path: '',
            loadChildren: () => import('../live/live.module').then((m) => m.LivePageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'tabs/news',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/news',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
