import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './shared/pages/auth/auth.component';
import { CreateComponent } from './shared/pages/create/create.component';
import { DetailComponent } from './shared/pages/detail/detail.component';
import { LinksComponent } from './shared/pages/links/links.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { TokenInterceptor } from "./shared/classes/token.interceptor";
import { LoaderComponent } from './shared/component/loader/loader.component';
import { MainComponent } from './shared/component/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateComponent,
    DetailComponent,
    LinksComponent,
    NavbarComponent,
    LoaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
