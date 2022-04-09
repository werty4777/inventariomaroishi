import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./core/services/auth/auth.service";
import {AuthInterceptor} from "./core/interceptor/AuthInterceptor";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EgresosComponent } from './pages/egresos/egresos.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {DialogModule} from "primeng/dialog";
import {RatingModule} from "primeng/rating";
import {FileUploadModule} from "primeng/fileupload";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductosService} from "./core/services/productos/productos.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    ProductosComponent,
    NavbarComponent,
    DashboardComponent,
    EgresosComponent,
    IngresosComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule, HttpClientModule, BrowserAnimationsModule, CommonModule
        , ToastModule, TableModule, ConfirmDialogModule, InputNumberModule, DropdownModule, RadioButtonModule, DialogModule, RatingModule, FileUploadModule, ToolbarModule, PaginatorModule, RippleModule, InputTextModule, InputTextareaModule, ReactiveFormsModule


    ],
  providers: [AuthService,{

    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true

  },ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
