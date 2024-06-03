import { CommonModule, registerLocaleData } from '@angular/common';
import localeKo from '@angular/common/locales/ko';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from './component/header/header.component';
registerLocaleData(localeKo);

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CommonModule,
    HeaderComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ko' }
  ],
})
export class SharedModule { }
