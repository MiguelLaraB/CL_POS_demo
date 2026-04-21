import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-overlay.component.html',
  styleUrls: ['./mobile-overlay.component.css']
})
export class MobileOverlayComponent {
  @Output() dismiss = new EventEmitter<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }
}
