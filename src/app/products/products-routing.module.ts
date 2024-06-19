import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent,
    children: [
      { path: 'props', component: ProductListComponent },
      { path: 'fondos', component: ProductListComponent },
      { path: 'decos', component: ProductListComponent },
      { path: ':id', component: ProductComponent },
      { path: '**', redirectTo: 'props' }
    ]
   },
  { path: '**', redirectTo: 'props' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
