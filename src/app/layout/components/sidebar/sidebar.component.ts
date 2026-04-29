import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  logoHorizontalPath = 'assets/logo_cl.png';

  //Rutas de los iconos de cada sección

  menuItems = [
    { text: 'Menú', icon: 'assets/menu.svg', route: '/sales' },
    { text: 'Historial', icon: 'assets/history.svg', route: '/record' },
    { text: 'Reportes', icon: 'assets/factura.svg', route: '/reports' },
    { text: 'Inventario', icon: 'assets/inventory.svg', route: '/inventory' },
    { text: 'Devoluciones', icon: 'assets/refounds.svg', route: '/refounds' },
    { text: 'Clientes', icon: 'assets/profile.svg', route: '/clients' },
  ];

}
