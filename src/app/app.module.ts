import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeKo from '@angular/common/locales/ko';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule, RouterConfiguration } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './page/home/home.module';
import { SharedModule } from './shared.module';
registerLocaleData(localeKo);
const config: SocketIoConfig = { url: `/shWebsocket`, options: {} };

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SocketIoModule.forRoot(config),
        SharedModule,
        AppRoutingModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        LoadingBarModule,
        HomePageModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ko' },
        RouterConfiguration,
        { provide: ROUTER_CONFIGURATION, useExisting: RouterConfiguration },
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
