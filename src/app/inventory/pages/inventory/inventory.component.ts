import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  mostrarModal = false;
  tipoModal: 'add' | 'edit' | 'delete' | null = null;

  // form usado para add/edit/delete
  form: {
    id?: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    imagen?: string;
  } = {};

  // hardcode inicial de productos
  productos: Array<{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen?: string;
  }> = [
      { id: 1, nombre: 'Aceite Castrol', descripcion: 'Aceite 10W-40 1L', precio: 180, stock: 25, imagen: 'assets/aceite_c.jpg' },
      { id: 2, nombre: 'Filtro Bosch', descripcion: 'Filtro de aceite universal', precio: 90, stock: 40, imagen: 'assets/filtro_b.jpg' },
      { id: 3, nombre: 'Bujía NGK', descripcion: 'Bujía iridium', precio: 120, stock: 12, imagen: 'assets/bujia.jpg' }
    ];

  // abre modal: tipo 'add' | 'edit' | 'delete'. Para edit recibe el producto a editar.
  abrirModal(tipo: 'add' | 'edit' | 'delete', producto?: any) {
    this.tipoModal = tipo;
    this.mostrarModal = true;

    if (tipo === 'edit' && producto) {
      // clonar para editar sin mutar directo hasta guardar
      this.form = { ...producto };
    } else {
      // limpiar form para add o delete (delete sólo usa nombre)
      this.form = {};
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.tipoModal = null;
    this.form = {};
  }

  // guarda cambios: añade o actualiza según tipoModal
  guardarCambios() {
    if (!this.tipoModal) return;

    // validaciones básicas
    const nombre = (this.form.nombre || '').toString().trim();
    const descripcion = (this.form.descripcion || '').toString().trim();
    const precio = Number(this.form.precio);
    const stock = Number(this.form.stock);

    if (!nombre) {
      alert('El nombre del producto es obligatorio.');
      return;
    }

    if (this.tipoModal === 'add') {
      if (isNaN(precio) || precio < 0) {
        alert('Ingresa un precio válido.');
        return;
      }
      if (isNaN(stock) || stock < 0) {
        alert('Ingresa una cantidad en stock válida.');
        return;
      }

      // generar id nuevo (max + 1)
      const maxId = this.productos.reduce((max, p) => Math.max(max, p.id), 0);
      const nuevo = {
        id: maxId + 1,
        nombre,
        descripcion,
        precio,
        stock,
        imagen: this.form.imagen || 'assets/placeholder.png'
      };

      this.productos = [nuevo, ...this.productos]; // insertar al inicio
      alert(`Producto "${nombre}" añadido correctamente (hardcode).`);
      this.cerrarModal();
      return;
    }

    if (this.tipoModal === 'edit') {
      if (typeof this.form.id === 'undefined') {
        alert('Producto no identificado para edición.');
        return;
      }
      if (isNaN(precio) || precio < 0) {
        alert('Ingresa un precio válido.');
        return;
      }
      if (isNaN(stock) || stock < 0) {
        alert('Ingresa una cantidad en stock válida.');
        return;
      }

      const idx = this.productos.findIndex(p => p.id === this.form.id);
      if (idx === -1) {
        alert('No se encontró el producto a editar.');
        return;
      }

      // actualizar el producto (hardcode)
      const actualizado = {
        ...this.productos[idx],
        nombre,
        descripcion,
        precio,
        stock,
        imagen: this.form.imagen || this.productos[idx].imagen
      };

      // reemplazar
      this.productos = [
        ...this.productos.slice(0, idx),
        actualizado,
        ...this.productos.slice(idx + 1)
      ];

      alert(`Producto "${nombre}" editado correctamente (hardcode).`);
      this.cerrarModal();
      return;
    }
  }

  // Eliminar producto: se compara el nombre ingresado con los productos (case-insensitive).
  eliminarProducto() {
    if (!this.tipoModal || this.tipoModal !== 'delete') return;

    const nombreAEliminar = (this.form.nombre || '').toString().trim();
    if (!nombreAEliminar) {
      alert('Escribe el nombre del producto a eliminar.');
      return;
    }

    // buscar coincidencia exacta (ignorando mayúsculas)
    const idx = this.productos.findIndex(p => p.nombre.toLowerCase() === nombreAEliminar.toLowerCase());

    if (idx === -1) {
      // intentar búsqueda parcial si no hay coincidencia exacta
      const parcialIdx = this.productos.findIndex(p => p.nombre.toLowerCase().includes(nombreAEliminar.toLowerCase()));
      if (parcialIdx === -1) {
        alert(`No se encontró ningún producto con el nombre "${nombreAEliminar}".`);
        return;
      } else {
        // confirmar eliminación parcial
        const confirmado = confirm(`Se encontró "${this.productos[parcialIdx].nombre}". ¿Eliminarlo?`);
        if (!confirmado) return;
        const eliminado = this.productos[parcialIdx];
        this.productos = this.productos.filter((_, i) => i !== parcialIdx);
        alert(`Producto "${eliminado.nombre}" eliminado (hardcode).`);
        this.cerrarModal();
        return;
      }
    }

    // confirmación final
    const confirmado = confirm(`¿Seguro que quieres eliminar "${this.productos[idx].nombre}"?`);
    if (!confirmado) return;

    const eliminado = this.productos[idx];
    this.productos = this.productos.filter((_, i) => i !== idx);
    alert(`Producto "${eliminado.nombre}" eliminado correctamente (hardcode).`);
    this.cerrarModal();
  }
}