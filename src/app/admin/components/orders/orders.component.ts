import { Component } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: any | null = null;
  filterStatus: string | null= ''; // Para filtrar por estado
  sortField: string = ''; // Para ordenar por campo (fecha, usuario, etc.)
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación

  constructor(private orderService: OrderService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  closeTicket(): void {
    this.selectedOrder = null; // O cualquier lógica que necesites para ocultar el ticket
  }

  async loadOrders(): Promise<void> {
    try {
      const orders = await this.orderService.getAllOrders();
      this.orders = orders;
      this.applyFilters(); // Aplica los filtros y ordenamiento después de cargar los pedidos
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  applyFilters(): void {
    let filtered = [...this.orders];

    // Filtrar por estado
    if (this.filterStatus) {
      filtered = filtered.filter(order => order.status === this.filterStatus);
    }

    // Ordenar por el campo seleccionado
    if (this.sortField) {
      filtered.sort((a, b) => {
        let valueA = this.getFieldValue(a, this.sortField);
        let valueB = this.getFieldValue(b, this.sortField);

        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    this.filteredOrders = filtered;
  }

  getFieldValue(order: any, field: string): any {
    switch (field) {
      case 'date':
        return order.createdAt.toDate();
      case 'status':
        return order.status;
      case 'user':
        return order.userName || order.userEmail;
      default:
        return '';
    }
  }

  onFilterStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Asegurar que es un HTMLSelectElement
    const status = target.value || null; // Asignar `null` si el valor es una cadena vacía
  
    this.setFilterStatus(status);
  }
  
  setFilterStatus(status: string | null): void {
    if (status === null || status === '') {
      // Resetear o mostrar todos los estados
      this.filterStatus = null;
    } else {
      this.filterStatus = status;
    }
    this.applyFilters(); // Aplicar los filtros según el estado seleccionado
  }
  
  onSortFieldChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Asegurarse de que es un HTMLSelectElement
    const field = target.value || null; // Asignar `null` si el valor es una cadena vacía
  
    this.setSortField(field);
  }
  
  setSortField(field: string | null): void {
    if (field === null || field === '') {
      this.sortField = ''; // Resetear el campo si es necesario
      this.sortDirection = 'asc'; // Resetear la dirección si es necesario
    } else {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
    }
    this.applyFilters();
  }
  

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      await this.orderService.updateOrderStatus(orderId, status);
      console.log(`Order ${orderId} status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
  }

  formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    return '$' + formattedPrice.replace('US$', '');
  }

  async getUser(id: string, option: boolean): Promise<string | null> {
    try {
      const user = await this.userService.getUser(id);

      if (option) {
        return user.nombre;
      } else {
        return user.correo;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  getDate(order: any){
    return order.createdAt.toDate();
  }

  async updatePaymentStatus(orderId: string, paymentStatus: string): Promise<void> {
    try {
      await this.orderService.updatePaymentStatus(orderId, paymentStatus);
      console.log(`Payment status for order ${orderId} updated to ${paymentStatus}`);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  }
}
