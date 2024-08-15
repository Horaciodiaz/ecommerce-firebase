import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

//   constructor(private renderer: Renderer2) {}

//   ngOnInit(): void {
//     this.loadMercadoPagoSDK().then(() => {
//       this.renderPaymentBrick();
//     });
//   }

//   loadMercadoPagoSDK(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const script = this.renderer.createElement('script');
//       script.src = 'https://sdk.mercadopago.com/js/v2';
//       script.onload = () => {
//         resolve();
//       };
//       script.onerror = () => {
//         reject();
//       };
//       this.renderer.appendChild(document.body, script);
//     });
//   }

//   async renderPaymentBrick() {
//     const mp = new MercadoPago('YOUR_PUBLIC_KEY');
// const bricksBuilder = mp.bricks();
//     const bricksBuilder = new window.MercadoPago('YOUR_PUBLIC_KEY'); // Reemplaza 'YOUR_PUBLIC_KEY' con tu clave pública

//     const settings = {
//       initialization: {
//         amount: 100,
//         preferenceId: '<PREFERENCE_ID>', // Reemplaza '<PREFERENCE_ID>' con tu ID de preferencia
//       },
//       customization: {
//         paymentMethods: {
//           ticket: 'all',
//           creditCard: 'all',
//           debitCard: 'all',
//           mercadoPago: 'all',
//         },
//       },
//       callbacks: {
//         onReady: () => {
//           console.log('Payment Brick is ready');
//         },
//         onSubmit: ({ selectedPaymentMethod, formData }) => {
//           return new Promise((resolve, reject) => {
//             fetch('/process_payment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(formData),
//             })
//               .then((response) => response.json())
//               .then((response) => {
//                 resolve( response );
//               })
//               .catch((error) => {
//                 reject();
//               });
//           });
//         },
//         onError: (error) => {
//           console.error('Payment Brick error:', error);
//         },
//       },
//     };

//     window.paymentBrickController = await bricksBuilder.create(
//       'payment',
//       'paymentBrick_container', // Debe coincidir con el ID del contenedor en el HTML
//       settings
//     );
//   }
}