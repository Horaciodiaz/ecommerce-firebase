import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderProduct, OrderService, PaymentDetails, ShippingDetails } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-check-out',
  templateUrl: './order-check-out.component.html',
  styleUrls: ['./order-check-out.component.css']
})
export class OrderCheckOutComponent {
  @Input() cartProducts: any[] = []; // Recibe los productos del carrito como entrada
  @Input() total!: number; // Recibe los productos del carrito como entrada
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private auth: Auth,
    private router: Router,
    private userService: UserService
  ) {
    this.checkoutForm = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cartProducts = this.cartProducts.map(product => {
      product.imagenes = product.imagenes.map(
        (imagen: string) => this.getFileNameFromUrl(imagen)
      );
      return product;
    });
  }

  getFileNameFromUrl(url: string): string {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split('/');
    const fileNameWithToken = parts.pop() || '';
    const fileName = fileNameWithToken.split('?')[0];
    return fileName;
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.valid) {
      const shippingDetails: ShippingDetails = {
        address: this.checkoutForm.get('address')?.value,
        city: this.checkoutForm.get('city')?.value,
        postalCode: this.checkoutForm.get('postalCode')?.value,
        country: this.checkoutForm.get('country')?.value,
        phoneNumber: this.checkoutForm.get('phoneNumber')?.value
      };
  
      const paymentDetails: PaymentDetails = {
        method: this.checkoutForm.get('paymentMethod')?.value,
        status: 'pending'
      };
  
      const currentUser = this.auth.currentUser;
  
      try {
        const userData = await this.userService.getUser(currentUser!.uid);
        const userName = `${userData.nombre} ${userData.apellido}` || '';
  
        const newOrder: Order = {
          orderId: '', // Se generará automáticamente
          userId: currentUser?.uid || '', // ID del usuario actual
          userName: userName, // Nombre del usuario obtenido de Firestore
          userEmail: currentUser?.email || '', // Correo electrónico del usuario
          products: this.cartProducts,
          shippingDetails,
          paymentDetails,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        };
  
        await this.orderService.createOrder(newOrder);
        console.log('Pedido creado exitosamente');
        this.router.navigate(['/order-confirmation']);
      } catch (error) {
        console.error('Error al crear el pedido:', error);
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
