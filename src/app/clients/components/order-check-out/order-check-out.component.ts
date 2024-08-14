import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderProduct, OrderService, PaymentDetails, ShippingDetails } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-check-out',
  templateUrl: './order-check-out.component.html',
  styleUrls: ['./order-check-out.component.css']
})
export class OrderCheckOutComponent {
  // cartProducts: any[] = []; // Recibe los productos del carrito como entrada
  // private _total!: number; // Recibe los productos del carrito como entrada
  // checkoutForm: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private orderService: OrderService,
  //   private auth: Auth,
  //   private router: Router,
  //   private userService: UserService,
  //   private shoppingCart: ShoppingCartService
  // ) {
  //   this.checkoutForm = this.fb.group({
  //     address: ['', [Validators.required]],
  //     city: ['', [Validators.required]],
  //     postalCode: ['', [Validators.required]],
  //     country: ['', [Validators.required]],
  //     phoneNumber: ['', [Validators.required]],
  //     paymentMethod: ['', [Validators.required]]
  //   });
  // }

  // ngOnInit(): void {
  //   this.cartProducts = this.shoppingCart.productos
  // }

  // get total(): number {
  //   return this.cartProducts
  //     .map((product: any) => product.precio)
  //     .reduce((accumulator: number, price: number) => accumulator + price, 0);
  // }

  // getFileNameFromUrl(url: string): string {
  //   const decodedUrl = decodeURIComponent(url);
  //   const parts = decodedUrl.split('/');
  //   const fileNameWithToken = parts.pop() || '';
  //   const fileName = fileNameWithToken.split('?')[0];
  //   return fileName;
  // }

  // async onSubmit(): Promise<void> {
  //   if (this.checkoutForm.valid) {
  //     const shippingDetails: ShippingDetails = {
  //       address: this.checkoutForm.get('address')?.value,
  //       city: this.checkoutForm.get('city')?.value,
  //       postalCode: this.checkoutForm.get('postalCode')?.value,
  //       country: this.checkoutForm.get('country')?.value,
  //       phoneNumber: this.checkoutForm.get('phoneNumber')?.value
  //     };
  
  //     const paymentDetails: PaymentDetails = {
  //       method: this.checkoutForm.get('paymentMethod')?.value,
  //       status: 'pending'
  //     };
  
  //     const currentUser = this.auth.currentUser;
  
  //     try {
  //       const userData = await this.userService.getUser(currentUser!.uid);
  //       const userName = `${userData.nombre} ${userData.apellido}` || '';
  
  //       const newOrder: Order = {
  //         orderId: '', // Se generará automáticamente
  //         userId: currentUser?.uid || '', // ID del usuario actual
  //         userName: userName, // Nombre del usuario obtenido de Firestore
  //         userEmail: currentUser?.email || '', // Correo electrónico del usuario
  //         products: this.cartProducts,
  //         shippingDetails,
  //         paymentDetails,
  //         status: 'pending',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       };
  
  //       await this.orderService.createOrder(newOrder);
  //       console.log('Pedido creado exitosamente');
  //       Swal.fire({
  //         title: "Confirmar Pedido",
  //         text: "Una vez aceptado el pedido no se podra modificar.",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Si, confirmo!"
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.shoppingCart.vaciarCarrito();
  //           this.router.navigate(['/']);
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error al crear el pedido:', error);
  //     }
  //   } else {
  //     console.error('Formulario inválido');
  //   }
  // }

  cartProducts: any[] = [];
  checkoutForm: FormGroup;
  step: number = 1; // Inicializa el paso en 1 (contactDetails)

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private auth: Auth,
    private router: Router,
    private userService: UserService,
    private shoppingCart: ShoppingCartService
  ) {
    this.checkoutForm = this.fb.group({
      contactDetails: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dni: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
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

  get total(): number {
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

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.valid) {
      const contactData = this.checkoutForm.get('contactDetails')?.value;
      const shippingDetails: ShippingDetails = this.checkoutForm.get('shippingDetails')?.value;
      const paymentDetails: PaymentDetails = {
        method: this.checkoutForm.get(['paymentDetails', 'paymentMethod'])?.value,
        status: 'pending'
      };

      const currentUser = this.auth.currentUser;

      try {
        console.log(contactData)
        const userData = await this.userService.getUser(currentUser!.uid);
        const userName = `${contactData.firstName} ${contactData.lastName}` || '';

        const newOrder: Order = {
          orderId: '',
          userId: currentUser?.uid || '',
          userName: `${contactData.firstName} ${contactData.lastName}`,
          userEmail: contactData.email || currentUser?.email || '',
          userDni: contactData.dni,
          userPhoneNumber: contactData.phoneNumber,
          products: this.cartProducts,
          shippingDetails,
          paymentDetails,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
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
            this.shoppingCart.vaciarCarrito();
            this.router.navigate(['/']);
          }
        });
      } catch (error) {
        console.error('Error al crear el pedido:', error);
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
