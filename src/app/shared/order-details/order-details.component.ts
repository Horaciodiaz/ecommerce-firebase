import { Component, Input } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Order, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() selectedOrder: Order | null = null;

  constructor(private orderService: OrderService, private fileService: FileUploadService) {}

  getOrderTotal(): number {
    if (this.selectedOrder) {
      return this.orderService.calculateOrderTotal(this.selectedOrder);
    }
    return 0;
  }

  getDate(order: any): string {
    return order.createdAt.toDate(); // Ajusta el formato de la fecha según sea necesario
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price).replace('US$', '$');
  }

  closeTicket(){
    this.selectedOrder = null;
  }
}
