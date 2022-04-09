import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductosService} from "../../core/services/productos/productos.service";
import {ProductoModel} from "../../models/productoModel";
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {Testmodel} from "../../models/testmodel";
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService,ConfirmationService]
})
export class ProductosComponent implements OnInit {

  @ViewChild("dt")// @ts-ignore
  dt: Table;

  productDialog: any;

  dialogNewProduct:any;

  products: any;

  product: any;

  selectedProducts: any;

  submitted: any;


  statuses: any;

  constructor( private messageService: MessageService, private confirmationService: ConfirmationService,private productoService:ProductosService) { }

  ngOnInit() {


    this.productoService.cargarProductos().subscribe(value => {

      this.products=value;
      this.selectedSubCategory=this.categoriasSub[0];
      this.selectedCategory=this.productList[0];
    })



    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
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
        this.products = this.products.filter((val:any) => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(product: any) {
    console.log(product)
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: any) {


    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el egreso de  ' + product.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.productoService.borrarProducto(product.id).subscribe(value => {



          this.productoService.cargarProductos().subscribe(value => {

            this.products=value;
          })

          this.product = {};
          this.messageService.add({severity: 'success', summary: 'Todo correcto y yo que me alegro', detail: 'Borrado', life: 3000});

        },error => {

          console.log(error)

        });




      }
    });





  }

  ocultarDialog(){
    this.dialogNewProduct=false;
    this.submitted = false;
  }

  ocultarNuevo(){
    this.dialogNewProduct = false;
    this.submitted = false;
  }

  guardarProducto(nombre:any, precio:any, contenido:any,id:any){

    this.productoService.actualizarProducto({
nombre,
      precio,contenido
    },id).subscribe(value => {
      console.log(value)
      this.productoService.cargarProductos().subscribe(value2 => {

        this.products=value2;
      })
    },error => {
      console.log(error)
    });

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  update(id:string,foto:string,desc:string,name:string,cantidad:string,precio:number,categoria:string,sub:string) {


    let params = {
      id,
      foto,
      desc,
      name,
      cantidad,
      precio,
      categoria,
      sub
    };

    console.log(params);

    this.productoService.updateProduct(params).subscribe(value => {

      this.productoService.cargarProductos().subscribe(value2 => {

        this.products=value2;
        this.productDialog=false;
      })

      this.product = {};
      this.messageService.add({severity: 'success', summary: 'Producto Actualizado Con Exito', detail: 'Actualizado', life: 3000});

    },error => {
      console.log(error)
    });

  }

  saveProduct(foto:string,desc:string,name:string,cantidad:string,precio:number,categoria:string,sub:string) {


    let params = {
      foto,
      desc,
      name,
      cantidad,
      precio,
      categoria,
      sub
    };

    console.log(params);

    this.productoService.guardarProducto(params).subscribe(value => {

      this.productoService.cargarProductos().subscribe(value2 => {

        this.products=value2;
      })

      this.product = {};
      this.messageService.add({severity: 'success', summary: 'Producto Guardado Con Exito', detail: 'Guardado', life: 3000});

    },error => {
      console.log(error)
    });

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  filterGlobal($event: any, contains: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  generarPdf(){
    let data = document.getElementById('tablafin');

    // @ts-ignore
    html2canvas(data).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');
    });
  }

  onUpload(event:any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }
  uploadedFiles: any[] = [];
  selectedSubCategory: any;
  categoriasSub: any[]=[
    {
      "name": "pvc"
    },
    {
      "name": "Plasticos y mallas"
    },
    {
      "name": "Chapa de puerta"
    },
    {
      "name": "Articulos de Ducha"
    },
    {
      "name": "Canos de jardin"
    },
    {
      "name": "Siliconas"
    },
    {
      "name": "Pegamentos"
    },
    {
      "name": "Pegamentos Oatey"
    },
    {
      "name": "Teflones"
    },
    {
      "name": "Tuberias PVC"
    },
    {
      "name": "Caja de Luz"
    },
    {
      "name": "Luces de emergencia"
    },
    {
      "name": "Tomacorriente"
    },
    {
      "name": "Llaves Termicas"
    },
    {
      "name": "Tuberias y conexiones SAP"
    },
    {
      "name": "Tuberias y conexiones SEL"
    },
    {
      "name": "Anillos de cera"
    },
    {
      "name": "Llaves de paso"
    },
    {
      "name": "Teflones"
    },
    {
      "name": "Llaves con Universal"
    },
    {
      "name": "Conexiones de agua galvanizado"
    },
    {
      "name": "Conexiones de Agua PVC"
    }
  ];

  productList:any[]=[
    {
      name:"Agua"
      ,id:1
    },
    {
      name:"Desague",id:2
    },
    {
      name:"Herramientas",id:3
    },
    {
      name:"Griferia",id:4
    },
    {
      name:"Agua Caliente",id:5
    },
    {
      name:"Luz",id:6
    },
    {
      name:"Pegamentos",id:7    }
  ]
  selectedCategory: any;


  onFileChange($event: any) {
    let reader = new FileReader();
    let file = $event.target['files'][0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result;
      //convert reader.result to base64 string
      //this.imageSrc = this.imageSrc.split(',')[1];






    };
  }
  imageSrc: any;
}

