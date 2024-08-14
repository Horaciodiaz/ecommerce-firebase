import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { UserGuard } from './user-guard.service';
import { OrderCheckOutComponent } from './components/order-check-out/order-check-out.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'productos', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      // { path: 'contacto', component: ContactComponent },
      { path: 'mi-carrito', component: ShoppingCartComponent },
      { path: 'mis-pedidos', component: MyOrdersComponent, canActivate: [UserGuard] },
      { path: 'confirmar-pedido', component: OrderCheckOutComponent, canActivate: [UserGuard] },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
