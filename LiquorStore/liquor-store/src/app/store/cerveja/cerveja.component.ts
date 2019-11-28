import { Component, OnInit } from '@angular/core';

import { Product } from 'src/model/product';
import { ProductService } from 'src/service/product.service';
import { LoginService } from 'src/service/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cerveja',
  templateUrl: './cerveja.component.html',
  styleUrls: ['./cerveja.component.css']
})
export class CervejaComponent implements OnInit {
  p: number = 1;
  cervejaList: Product[];
  preco: number[];

  constructor(private productApi: ProductService,
    private login: LoginService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.productApi.getAllProducts().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[i].prod_imagem);
      }
      this.cervejaList = res;
      let precoParcelado: number[] = new Array(this.cervejaList.length);
      for (let i = 0; i < this.cervejaList.length; i++) {
        precoParcelado[i] = this.cervejaList[i].prod_preco / 3;
      }
      this.preco = precoParcelado;
    }, err => {
      console.log(err);
    });
  }
}