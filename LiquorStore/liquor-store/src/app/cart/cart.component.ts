import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Product } from 'src/model/product';
import { CartService } from 'src/service/cart.service';
import { LoginService } from 'src/service/login.service';
import { $ } from 'protractor';
import { ProductService } from 'src/service/product.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('animate', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('500ms ease-in')),
    ]),
  ]
})
export class CartComponent implements OnInit {
  currentState = 'initial';
  productList: Product[];
  total: number = 0.0;
  error: boolean = false;
  productError: string;
  productQuantity: number;

  constructor(private cartService: CartService,
    private loginService: LoginService,
    private productService: ProductService,
    private userService: UserService) { }

  ngOnInit() {
    if (this.loginService.isLogged) {
      this.productList = this.cartService.cart;

      if (this.currentState = "initial") {
        setTimeout(() => {
          this.currentState = 'final';
          this.load();
        }, 500);
      }
    } else {
      this.loginService.redirect();
    }
  }

  load() {
    this.productList.forEach(product => {
      this.total += product.prod_preco * product.prod_carrinho;
    });
  }

  increase(i: number) {
    this.productList[i].prod_carrinho++;
    this.total += this.productList[i].prod_preco;
  }

  decrease(i: number) {
    this.productList[i].prod_carrinho--;
    this.total -= this.productList[i].prod_preco;
  }

  buy() {
    this.productList.forEach(product => {
      if (product.prod_carrinho > product.prod_quantidade) {
        this.productError = product.prod_nome;
        this.productQuantity = product.prod_quantidade;
        this.error = true;
        return;
      } else {
        this.error = false;
        product.prod_quantidade -= product.prod_carrinho;

        this.productService.updateProduct(product.prod_id, product).subscribe(() => {
          this.loginService.redirect();
          this.cartService.reset();
        }, err => {
          console.log(err);
        });

        this.userService.createPurchase(product.prod_id, this.loginService.user[0].usu_id).subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });
      }

    });
  }
}
