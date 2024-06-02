import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ThemePage } from './theme.page';
const routes: Routes = [
  {
    path: '',
    component: ThemePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ThemePage]
})
export class ThemePageModule { }
