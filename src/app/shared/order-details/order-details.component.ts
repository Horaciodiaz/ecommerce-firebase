import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Order, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() selectedOrder: Order | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private orderService: OrderService) { }

  ngOnInit(){
    console.log(this.selectedOrder)
  }
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('US$', '$');
  }

  closeTicket(){
    this.selectedOrder = null;
    this.close.emit();
  }
}
