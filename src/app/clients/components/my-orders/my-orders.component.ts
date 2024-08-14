import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Order, OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  loading = true;

  constructor(private orderService: OrderService, private auth: Auth, private userService: UserService) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  async loadOrders(): Promise<void> {
    this.loading = true;
    const userId = this.auth.currentUser?.uid;
    
    if (userId) {
      try {
        // Obtiene los datos del usuario desde el servicio
        const userData = await this.userService.getUser(userId);
        
        if (userData?.orders && Array.isArray(userData.orders)) {
          // Inicializa el array de órdenes
          this.orders = [];
          
          // Itera sobre el array de órdenes del usuario
          for (const orderId of userData.orders) {
            try {
              // Obtiene cada orden por su ID y la agrega al array
              const order = await this.orderService.getOrderById(orderId);
              if (order) {
                this.orders.push(order);
              }
            } catch (orderError) {
              console.error(`Error loading order with ID ${orderId}:`, orderError);
            }
          }
          this.loading = false;
        } else {
          console.warn('No orders found for user');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    } else {
      console.warn('User not authenticated');
    }
  }

  viewDetails(orderId: string): void {
    this.orderService.getOrderById(orderId)
      .then(order => {
        if (order) {
          this.selectedOrder = order;
        }
      })
      .catch(error => {
        console.error('Error loading order details:', error);
      });
  }

  getOrderTotal(order: Order): number {
    return this.orderService.calculateOrderTotal(order);
  }

  getDate(order: any): string {
    return order.createdAt.toDate(); // Ajusta el formato de la fecha según sea necesario
  }
}
