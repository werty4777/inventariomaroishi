import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Testmodel} from "../../models/testmodel";
import {ProductosService} from "../../core/services/productos/productos.service";

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.scss'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
    }
  `],
  providers: [MessageService, ConfirmationService]
})
export class EgresosComponent implements OnInit {

  @ViewChild("dt")// @ts-ignore
  dt: Table;

  productDialog: any;

  egresosModels: any;

  product: any;

  selectedProducts: any;

  submitted: any;



  dialogNewEgreso: any;
  productoLista: any;
  productoSeleccionado: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private productService: ProductosService) {
  }

  cargarEgresos(){
    this.productService.cargarEgreso().subscribe(value => {
      this.egresosModels = value;

    });
  }
  cargarListaProductos(){
    this.productService.cargarProductos().subscribe(value => {

      this.productoLista = value;

    })
  }

  ngOnInit() {

  this.cargarEgresos();
  this.cargarListaProductos();




  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.dialogNewEgreso = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.egresosModels = this.egresosModels.filter((val: any) => !this.selectedProducts.includes(val));
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
      message: 'Esta seguro de eliminar el egreso de  ' + product.producto + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        this.productService.eliminarEgreso(product.idSalida).subscribe(value => {



        },error => {

          console.log(error)

        });

        this.egresosModels = this.egresosModels.filter((val: any) => val.id !== product.id);
        this.product = {};
        this.messageService.add({severity: 'success', summary: 'Todo correcto y yo que me alegro', detail: 'Borrado', life: 3000});
      }
    });

    this.cargarEgresos();
    this.cargarListaProductos();

  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(cantidad: any, rut: any, motivo: any) {
    this.submitted = true;


    this.productService.guardarSalida({

      rut,
      motivoSalida: motivo,
      detalles: {
        idProducto: this.productoSeleccionado,
        cantidad
      }


    }).subscribe(value => {

      console.log(value)
      alert("salida guardada correctamente")
      this.ocultarNuevo();
      this.cargarEgresos();
      this.cargarListaProductos();
    },error => {

      console.log(error)

    })


  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.egresosModels.length; i++) {
      if (this.egresosModels[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
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

  ocultarNuevo() {
    this.dialogNewEgreso = false;
    this.submitted = false;
  }
}
