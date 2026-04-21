import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Imports para hardcodeado de record
import { SalesRecordService } from '@app/features/record/services/sales-record.service';
import { SaleRecord } from '@app/features/record/models/sale-record.model';



@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  //Añadido de harcodeado de record
  constructor(private salesRecordService: SalesRecordService) { }


  //Resto del código  
  cashIconPath = 'assets/cash.svg';
  cardIconPath = 'assets/card.svg';

  categorias = [
    'Frenos',
    'Suspensión',
    'Motor',
    'Aceites',
    'Filtros',
    'Llantas',
    'Herramientas',
    'Accesorios'
  ];

  //Productos hardcodeados acá
  productos = [
    {
      id: 'p1',
      nombre: 'Filtro de aceite',
      descripcion: 'Filtro 1234 • 2.5L',
      precio: 120,
      stock: 15,
      imagen: 'assets/aceite.png',
    },
    {
      id: 'p2',
      nombre: 'Bujía NGK',
      descripcion: 'Modelo BPR6E • 4 piezas',
      precio: 240,
      stock: 32,
      imagen: 'assets/bujia.jpg',
    },
    {
      id: 'p3',
      nombre: 'Líquido de frenos DOT4',
      descripcion: '1 L • Uso universal',
      precio: 95,
      stock: 20,
      imagen: 'assets/liquido_frenos.webp',
    },
    {
      id: 'p4',
      nombre: 'Amortiguador delantero',
      descripcion: 'Nissan Versa 2017',
      precio: 860,
      stock: 8,
      imagen: 'assets/amortiguador.jpg',
    },
  ];

  // Carrito simulado

  cart: Array<{ productId: string; nombre: string; precio: number; imagen: string; qty: number }> = [

    {
      productId: 'p1',
      nombre: 'Filtro de aceite',
      precio: 120,
      imagen: 'assets/images/filtro.jpg',
      qty: 1,
    },
  ];

  //Descuentos e IVA

  descuento = 0;
  ivaRate = 0.16;

  //Método de pago

  selectedPayment: 'efectivo' | 'tarjeta' | null = null;

  //Añadir produto

  addToCart(product: any) {
    const existing = this.cart.find((c) => c.productId === product.id);
    if (existing) {
      // incrementa hasta 999 (3 dígitos)
      existing.qty = Math.min(999, existing.qty + 1);
    } else {
      this.cart.push({
        productId: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        qty: 1,
      });
    }
  }

  increaseQty(item: any) {
    item.qty = Math.min(999, item.qty + 1);
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty = item.qty - 1;
    }
  }

  removeItem(item: any) {
    this.cart = this.cart.filter((c) => c.productId !== item.productId);
  }

  //Calculo de subtotal y total

  get subtotal() {
    return this.cart.reduce((sum, it) => sum + it.precio * it.qty, 0);
  }

  get iva() {
    // IVA calculado sobre subtotal - descuento
    const base = Math.max(0, this.subtotal - this.descuento);
    return +(base * this.ivaRate).toFixed(2);
  }

  get total() {
    const base = Math.max(0, this.subtotal - this.descuento);
    return +(base + this.iva).toFixed(2);
  }

  //Cambio visual al seleccionar método de pago

  selectPayment(method: 'efectivo' | 'tarjeta') {
    this.selectedPayment = method;
  }

  //Proceso de transacción:

  processTransaction() {
    /*
    // Por ahora solo muestra info en consola
    console.log('Procesando transacción...');
    console.log('Carrito:', this.cart);
    console.log('Subtotal:', this.subtotal);
    console.log('Descuento:', this.descuento);
    console.log('IVA:', this.iva);
    console.log('Total:', this.total);
    console.log('Método de pago:', this.selectedPayment); */

    //Añadido de hardcodeado de record
    if (this.cart.length === 0 || !this.selectedPayment) {
      return;
    }

    const sale: SaleRecord = {
      id: `VTA-${Date.now()}`,
      fecha: new Date().toISOString().split('T')[0],
      items: this.cart.map(item => ({
        productId: item.productId,
        nombre: item.nombre,
        precio: item.precio,
        qty: item.qty
      })),
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      metodoPago: this.selectedPayment
    };

    this.salesRecordService.addSale(sale);

    // Limpieza visual
    this.cart = [];
    this.selectedPayment = null;
    console.log('Venta guardada en historial:', sale);
  }
}
