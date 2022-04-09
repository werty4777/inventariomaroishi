import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Testmodel} from "../../models/testmodel";
import {Table} from "primeng/table";
import {ProductosService} from "../../core/services/productos/productos.service";
import {ProductoModel} from "../../models/productoModel";
import {IngresoModel} from "../../models/ingresoModel";

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
    }
  `],
  providers: [MessageService, ConfirmationService]
})
export class IngresosComponent implements OnInit {


  @ViewChild("dt")// @ts-ignore
  dt: Table;

  productDialog: any;

  ingresoModels: IngresoModel[] = [];

  product: any;

  selectedProducts: any;

  submitted: any;


  statuses: any;
  dialogNewProduct: any;
  productoLista: ProductoModel[] = [];
  productoSeleccionado: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private productService: ProductosService) {
  }

  cargarProductos(){
    this.productService.cargarProductos().subscribe(value => {


      this.productoLista = value;

    })

  }

  cargarIngresos(){

    this.productService.cargarIngresos().subscribe(value => {

      this.ingresoModels = value;
    })
  }

  ngOnInit() {

  this.cargarProductos();
  this.cargarIngresos();


  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.dialogNewProduct = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ingresoModels = this.ingresoModels.filter((val: any) => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(product: any) {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el ingreso de  ' + product.producto + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        this.productService.eliminarIngreso(product.idIngreso).subscribe(value => {




        },error => {

          console.log(error)

        });

        this.ingresoModels = this.ingresoModels.filter((val: any) => val.id !== product.id);
        this.product = {};
        this.messageService.add({severity: 'success', summary: 'Todo correcto y yo que me alegro', detail: 'Borrado', life: 3000});
      }
    });

    this.cargarProductos();
    this.cargarIngresos();

  }

  ocultarNuevo() {
    this.dialogNewProduct = false;
    this.submitted = false;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  guardarProducto() {

  }

  saveProduct(cantidad: string, rut: string) {
    this.submitted = true;

    this.productService.guardarIngreso({

      detalles: {
        idProducto: this.productoSeleccionado,
        cantidad,


      }, rut


    }).subscribe(value => {
      console.log(value)
      alert("ingreso guardado con exito")
      this.ocultarNuevo();
      this.cargarProductos();
      this.cargarIngresos();

    }, error => {
      console.log(error)
    })
  }



  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  filterGlobal($event: any, contains: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}


