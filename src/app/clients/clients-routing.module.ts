import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'props', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'decos', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'fondos', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'contacto', component: ContactComponent },
      { path: 'mi-carrito', component: ShoppingCartComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
