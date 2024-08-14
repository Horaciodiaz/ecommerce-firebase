import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { UserService } from './user.service';

// Modelo para los productos dentro de un pedido
export interface OrderProduct {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }

  // Modelo para los datos de envío
  export interface ShippingDetails {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
  }

  // Modelo para los datos de pago
  export interface PaymentDetails {
    method: string;
    transactionId?: string; // Puede ser opcional si lo generas después
    status: 'pending' | 'completed' | 'failed';
  }

  // Modelo para el pedido
  export interface Order {
    orderId: string;
    userId: string; // ID del usuario que realiza el pedido
    userName: string;
    userEmail: string;
    userDni: string; // Nuevo campo para DNI del usuario
    userPhoneNumber: string; // Nuevo campo para teléfono del usuario
    products: any[];
    shippingDetails: ShippingDetails;
    paymentDetails: PaymentDetails;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
    total: number;
    comprobante? : string
  }


@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private firestore: Firestore, private auth: Auth, private userService: UserService) {}

    async createOrder(order: Order): Promise<void> {
      const orderCollection = collection(this.firestore, 'orders');
      const newOrderRef = doc(orderCollection);

      const newOrder: Order = {
        ...order,
        orderId: newOrderRef.id,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await setDoc(newOrderRef, newOrder); // Usa setDoc para establecer el nuevo documento
        this.auth.currentUser?.uid ? this.userService.updateUserOrders(newOrder.orderId, this.auth.currentUser?.uid) : console.log("fallo el pedido ")
      } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
      }
    }

    // Obtener un pedido por ID
    async getOrderById(orderId: string): Promise<Order | null> {
      const orderDocRef = doc(this.firestore, `orders/${orderId}`);
      try {
        const orderDoc = await getDoc(orderDocRef);
        if (orderDoc.exists()) {
          const orderData = orderDoc.data() as Order;
          return { ...orderData, orderId }; // Incluye el orderId en el objeto retornado
        } else {
          console.warn(`Order with ID ${orderId} not found`);
          return null;
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Failed to fetch order');
      }
    }


    // Actualizar el estado del pedido
    async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
      try {
        // Crea la referencia al documento con la colección y el ID del documento
        const orderDocRef = doc(this.firestore, `orders/${orderId}`);

        // Realiza la actualización del documento
        await updateDoc(orderDocRef, {
          status: status,
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error updating order status:', error);
        throw new Error('Failed to update order status');
      }
    }

    // Obtener todos los pedidos para admin
    async getAllOrders(): Promise<Order[]> {
      try {
        const orderCollection = collection(this.firestore, 'orders');
        const orderDocs = await getDocs(orderCollection);
        return orderDocs.docs.map(doc => {
          const orderData = doc.data() as Order;
          return { ...orderData, orderId: doc.id }; // Incluye el orderId en cada pedido
        });
      } catch (error) {
        console.error('Error fetching all orders:', error);
        throw new Error('Failed to fetch all orders');
      }
    }

    async updatePaymentStatus(orderId: string, status: string): Promise<void> {
      try {
        // Crea la referencia al documento con la colección y el ID del documento
        const orderDocRef = doc(this.firestore, `orders/${orderId}`);

        // Realiza la actualización del documento
        await updateDoc(orderDocRef, {
          'paymentDetails.status': status,
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error updating payment status:', error);
        throw new Error('Failed to update payment status');
      }
    }

    // async getOrdersByUserId(userId: string): Promise<Order[]> {
    //   try {
    //     const ordersQuery = query(
    //       collection(this.firestore, 'orders'),
    //       where('userId', '==', userId)
    //     );
    //     const orderDocs = await getDocs(ordersQuery);
    //     return orderDocs.docs.map(doc => {
    //       const orderData = doc.data() as Order;
    //       return { ...orderData, orderId: doc.id }; // Incluye el orderId en cada pedido
    //     });
    //   } catch (error) {
    //     console.error('Error fetching orders by user ID:', error);
    //     throw new Error('Failed to fetch orders by user ID');
    //   }
    // }

    calculateOrderTotal(order: Order): number {
      return order.products.reduce((total, product) => {
        return total + (product.precio);
      }, 0);
    }
}
