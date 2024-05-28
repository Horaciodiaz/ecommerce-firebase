import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'productos', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'contacto', component: ContactComponent },
      { path: 'sobre-nosotros', component: AboutComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
