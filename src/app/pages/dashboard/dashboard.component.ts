import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../core/services/productos/productos.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  data:any;
  constructor(private productoService:ProductosService) { }

  ngOnInit(): void {
    this.productoService.cargarDashboard().subscribe(value => {
      this.data=value;
    })
  }

}
