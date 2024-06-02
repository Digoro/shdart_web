import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '/', children: [{ path: '', loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule) }] },
  { path: 'theme', children: [{ path: '', loadChildren: () => import('./page/theme/theme.module').then(m => m.ThemePageModule) }] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

export class RouterConfiguration implements ExtraOptions {
  scrollPositionRestoration: "enabled" | "disabled" | "top" = "enabled";
  preloadingStrategy: PreloadAllModules;
  relativeLinkResolution: 'legacy';
}

@NgModule({
  imports: [RouterModule.forRoot(routes, new RouterConfiguration())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
