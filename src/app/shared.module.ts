import { CommonModule, registerLocaleData } from '@angular/common';
import localeKo from '@angular/common/locales/ko';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { SkeletonComponent } from './component/skeleton/skeleton.component';
registerLocaleData(localeKo);

@NgModule({
  declarations: [
    HeaderComponent,
    SkeletonComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatBottomSheetModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    MatBottomSheetModule,
    SkeletonComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ko' }
  ],
})
export class SharedModule { }
