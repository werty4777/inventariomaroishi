import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urlApi} from '../url/url';
import {ProductoModel} from "../../../models/productoModel";
import {ProductoGuardarModel} from "../../../models/productoGuardarModel";
import {IngresoModel} from "../../../models/ingresoModel";



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {
  }

  cargarProductos(): Observable<ProductoModel[]> {


    return this.http.get<ProductoModel[]>(urlApi + "produtos/api/product/listatodo")
  };

  borrarProducto(id: any) {

    return this.http.delete(urlApi + "produtos/api/product/" + id);
  }

  guardarProducto(producto: any) {

    return this.http.post(urlApi + "produtos/api/product", producto);

  }
  updateProduct(producto: any) {

    return this.http.put(urlApi + "produtos/api/product", producto);

  }


  cargarIngresos(): Observable<IngresoModel[]> {
    return this.http.get<IngresoModel[]>(urlApi + "api/ingreso");
  }


  guardarIngreso(param: { rut: string; detalles: { idProducto: any; cantidad: string } }): Observable<any> {


    return this.http.post(urlApi + "api/ingreso", param);
  }

  cargarEgreso() {

    return this.http.get(urlApi + "api/egreso");
  }

  guardarSalida(param: { rut: any; motivoSalida: any; detalles: { idProducto: any; cantidad: any } }):Observable<any> {

    return this.http.post(urlApi + "api/egreso", param);

  }


  cargarDashboard():Observable<any>{


    return this.http.get(urlApi+"api/dashboard");
  }

  eliminarIngreso(idIngreso: number) :Observable<any>{

    return this.http.delete(urlApi+"api/ingreso/"+idIngreso);

  }
  eliminarEgreso(id:any):Observable<any>{

    return this.http.delete(urlApi+"api/egreso/"+id);
  }

  actualizarProducto(param: { precio: any; contenido: any; nombre: any }, id:any) :Observable<any>{

    return this.http.put(urlApi+"api/inventario/"+id,param);

  }

}


