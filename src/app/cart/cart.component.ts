import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cart',
  imports: [  CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    RouterModule],
  providers: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  // In a real-world app, the cart would be managed in a shared service.
  // For simplicity, we are using a static array.
  cartItems: any[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    // Load cart items if stored
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  placeOrder(): void {
    const orderData = {
      items: this.cartItems.map(item => ({ menuItem: item._id, quantity: 1 })), // adjust according to your schema
      totalPrice: this.getTotal()
    };
    this.orderService.placeOrder(orderData).subscribe(
      res => {
        // Clear the cart on success
        localStorage.removeItem('cartItems');
        this.router.navigate(['/']);
      },
      err => console.error(err)
    );
  }


  suggestedItems = [
    { title: 'Cheesy Burger', price: 8.99, imageUrl: 'assets/images/burger.jpg', _id: '1' },
    { title: 'Spicy Ramen', price: 10.5, imageUrl: 'assets/images/ramen.jpg', _id: '2' },
    { title: 'Grilled Pizza', price: 12.0, imageUrl: 'assets/images/pizza.jpg', _id: '3' }
  ];
  
  addToCart(item: any): void {
    this.cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  
}
