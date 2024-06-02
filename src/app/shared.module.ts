import { CommonModule, registerLocaleData } from '@angular/common';
import localeKo from '@angular/common/locales/ko';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
registerLocaleData(localeKo);

@NgModule({
  declarations: [
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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ko' }
  ],
})
export class SharedModule { }
