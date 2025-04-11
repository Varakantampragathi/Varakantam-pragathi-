import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [ 
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    RouterModule],
  providers: [CurrencyPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  cart: any[] = [];

  constructor(
    private menuService: MenuService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe(
      data => this.menuItems = data,
      err => console.error(err)
    );
  }
  addToCart(item: any): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.cart.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cart));  // 🧠 Save it
    this.router.navigate(['/cart']);  // 🚀 Redirect to cart
  }
  
}
