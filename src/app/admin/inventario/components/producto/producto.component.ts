import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  private productoService = inject(ProductoService)
  loading: boolean = false;
  totalRecords!: number;
  buscador: string = ''

  categorias: any = [
    { name: 'Ropa Dama', code: 'RD' },
    { name: 'Ropa Caballero', code: 'RC' },
    { name: 'Herramientas', code: 'He' },
    { name: 'Tecnología', code: 'Tec' },
    { name: 'Hogar', code: 'Hgr' }];
  products: any[] = [
  ];
  cols: any[] = [];

  constructor() {
    this.productoService.funListar().subscribe(
      (res: any) => {
        this.products = res.data
      }
    )
  }

  loadProductos(event: any) {
    //this.loading = true
    let page = (event.first / event.rows)
    this.listar(page, event.rows)
    console.log(event)
  }

  listar(page = 1, limit = 10) {
    this.productoService.funListar(page, limit, this.buscador).subscribe(
      (res: any) => {
        this.products = res.data;
        this.totalRecords = res.total;
        this.loading = false;
      }
    )
  }

  buscar(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.listar()
    } else if (this.buscador == "")
      this.listar()
  }
  openNew() {

  }

  editProduct(prod: any) {

  }

  deleteProduct(prod: any) {

  }
}
