import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';

import { Product } from 'src/model/product';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css'],
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
export class StorePageComponent implements OnInit {
  p: number = 1;
  productList: Product[];
  precoParcelado: number[] = [];
  currentState: string = 'initial';
  category: string;
  categoryTitle: string;

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getProducts();

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getProducts();
    })
  }

  getProducts() {
    this.category = this.activatedRoute.snapshot.params['categoria'];

    this.productService.getProductsByCategory(this.category).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[i].prod_imagem);
      }

      this.productList = res;
      this.categoryTitle = res[0].prod_categoria;

      for (let i = 0; i < this.productList.length; i++) {
        this.precoParcelado.push(this.productList[i].prod_preco / 3);
      }

      if (this.currentState = "initial") {
        setTimeout(() => {
          this.currentState = 'final';
        }, 500);
      }
    }, err => {
      console.log(err);
    });
  }
}
