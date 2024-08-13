import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logOut(){
    this.userService.signOut();
    this.isLoggedIn = false;
  }
}
