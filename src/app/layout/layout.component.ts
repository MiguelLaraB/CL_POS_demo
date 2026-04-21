import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MobileOverlayComponent } from './components/mobile-overlay/mobile-overlay.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, MobileOverlayComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  showMobileOverlay = false;

  ngOnInit(): void {
    this.checkDevice();
  }

  checkDevice(): void {
    // Detección por ancho de pantalla o User Agent
    const isMobileWidth = window.innerWidth < 1024;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Solo mostrar si es móvil y no ha sido descartado en esta sesión
    const hasDismissed = sessionStorage.getItem('mobileOverlayDismissed') === 'true';

    if ((isMobileWidth || isMobileUA) && !hasDismissed) {
      this.showMobileOverlay = true;
    }
  }

  onDismissMobileOverlay(): void {
    this.showMobileOverlay = false;
    // Guardar en sesión para que no se repita al navegar dentro de la misma visita
    sessionStorage.setItem('mobileOverlayDismissed', 'true');
  }
}