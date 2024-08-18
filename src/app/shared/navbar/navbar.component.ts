import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/clients/shopping-cart/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  cart: boolean = this.shoppingCartService.productos.length > 0;

  constructor(private userService: UserService, private shoppingCartService: ShoppingCartService){}

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logOut(){
    this.userService.signOut().then(
      () => this.isLoggedIn = false
    );
    
  }
}
