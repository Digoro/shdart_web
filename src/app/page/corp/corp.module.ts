import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { CorpPage } from './corp.page';
const routes: Routes = [
  {
    path: '',
    component: CorpPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CorpPage]
})
export class CorpPageModule { }
