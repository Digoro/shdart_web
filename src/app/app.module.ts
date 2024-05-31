import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeKo from '@angular/common/locales/ko';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
registerLocaleData(localeKo);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ko' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
