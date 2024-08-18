import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderProduct, OrderService, PaymentDetails, ShippingDetails } from 'src/app/services/order.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-order-check-out',
  templateUrl: './order-check-out.component.html',
  styleUrls: ['./order-check-out.component.css']
})
export class OrderCheckOutComponent {
  cartProducts: any[] = [];
  checkoutForm: FormGroup;
  step: number = 1; // Inicializa el paso en 1 (contactDetails)
  fileUrl: string | null = null;
  fileName: string | null = null;
  file!: File;
  total!: number;


  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private auth: Auth,
    private router: Router,
    private fileService: FileUploadService,
    private shoppingCart: ShoppingCartService
  ) {
    this.checkoutForm = this.fb.group({
      contactDetails: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dni: ['', [Validators.required]],
        phoneArea: ['', [Validators.required]],  // Agregado
        phoneNumber: ['', [Validators.required]],  // Agregado
      }),
      shippingDetails: this.fb.group({
        address: ['', [Validators.required]],
        streetNumber: ['', [Validators.required]],
        floor: [''],
        apartment: [''],
        city: ['', [Validators.required]],
        province: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      }),
      paymentDetails: this.fb.group({
        paymentMethod: ['', [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    this.cartProducts = this.shoppingCart.productos;
  }



  getTotal(): number {
    if(this.paymentMethod?.value == 'transfer') {
      return this.cartProducts
      .map((product: any) => product.precio)
      .reduce((accumulator: number, price: number) => accumulator + price, 0)
      * 0.9;
    }
    return this.cartProducts
      .map((product: any) => product.precio)
      .reduce((accumulator: number, price: number) => accumulator + price, 0);
  }

  getTotalsinDesc(){
    return this.cartProducts
    .map((product: any) => product.precio)
    .reduce((accumulator: number, price: number) => accumulator + price, 0);
  }

  nextStep(): void {
    if (this.step === 1 && this.checkoutForm.get('contactDetails')?.valid) {
      this.step = 2;
    } else if (this.step === 2 && this.checkoutForm.get('shippingDetails')?.valid) {
      this.step = 3;
    }
  }

  previousStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  get paymentMethod() {
    return this.checkoutForm.get('paymentDetails.paymentMethod');
  }

  onPaymentMethodChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    // No es necesario hacer nada aquí a menos que quieras hacer algo cuando se seleccione 'transferencia'
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0]
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) this.fileName = file?.name;
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.valid) {
      const contactData = this.checkoutForm.get('contactDetails')?.value;
      const shippingDetails: ShippingDetails = this.checkoutForm.get('shippingDetails')?.value;
      const paymentDetails: PaymentDetails = {
        method: this.checkoutForm.get(['paymentDetails', 'paymentMethod'])?.value,
        status: 'pending'
      };

      const currentUser = this.auth.currentUser;
      const phoneNumber = `${contactData.phoneArea}${contactData.phoneNumber}`;

      try {
        this.total = paymentDetails.method == 'transfer' ? this.total * .9 : this.getTotal();

        const newOrder: Order = {
          orderId: '',
          userId: currentUser?.uid || '',
          userName: `${contactData.firstName} ${contactData.lastName}`,
          userEmail: contactData.email || currentUser?.email || '',
          userDni: contactData.dni,
          userPhoneNumber: phoneNumber,
          products: this.cartProducts,
          shippingDetails,
          paymentDetails,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          total: this.total,
          comprobante: this.file ? `comprobantes/${contactData.dni}/${this.fileName}` : ''
        };

        await this.orderService.createOrder(newOrder);
        Swal.fire({
          title: "Confirmar Pedido",
          text: "Una vez aceptado el pedido no se podrá modificar.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, confirmo!"
        }).then((result) => {
          if (result.isConfirmed) {
            if (newOrder.comprobante) this.fileService.uploadFile(this.file, newOrder.comprobante);
            this.shoppingCart.vaciarCarrito();
            Swal.fire({
              title: "Pedido Realizado 😎",
              text: "En breve nos estaremos comunicando con usted para coordinar",
              icon: "success"
            }).then(() => this.router.navigate(['/']))
          }
        });
      } catch (error) {
        console.error('Error al crear el pedido:', error);
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    return '$' + formattedPrice.replace('US$', '');
  }
}
