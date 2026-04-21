import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username = 'Luis Martínez';
  currentDate = new Date().toLocaleDateString('es-MX',

    {
      year: 'numeric', month: 'long', day: 'numeric'
    });

}
