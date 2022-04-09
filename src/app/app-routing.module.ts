import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {ProductosComponent} from "./pages/productos/productos.component";
import {PerfilComponent} from "./pages/perfil/perfil.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EgresosComponent} from "./pages/egresos/egresos.component";
import {IngresosComponent} from "./pages/ingresos/ingresos.component";

const routes: Routes = [{
  path: ""
  ,
  component: LoginComponent
},{
  path:"home",
  component:HomeComponent,
  children:[{
    path:"productos",
    component:ProductosComponent
  },{
    path:"perfil",
    component:PerfilComponent
  }/*,{

    path:"dashboard",
    component:DashboardComponent
  }*//*,
    {
      path:"egresos",
      component:EgresosComponent
    },{
    path:"ingresos",
      component:IngresosComponent
    }*/
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
