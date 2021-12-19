import { NgModule } from '@angular/core';
import { AuthInterceptorSercvice } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import {HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http'
import { LoadingSpinnerComponent } from 'src/loading-spinner/loading-spinner.component';
import { AppRoutingModule } from 'src/app.routes';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profilecomponent';
import { EditComponent } from './home/edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    HomeComponent,
    ProfileComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorSercvice,
      multi: true,
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
