import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/service/product.service';
import { Product } from 'src/model/product';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css'],
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
export class BuyPageComponent implements OnInit {
  cerveja: Product;
  precoParcelado: number;
  productId: number = this.activatedRoute.snapshot.params['id'];
  currentState: string = 'initial';

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(res => {
      res[0].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[0].prod_imagem);
      this.cerveja = res;
      this.precoParcelado = this.cerveja[0].prod_preco / 3;

      if (this.currentState = "initial") {
        setTimeout(() => {
          this.currentState = 'final';
        }, 500);
      }
    }, err => {
      console.log(err);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.productId);
  }
}
